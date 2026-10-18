import { NextResponse } from 'next/server';
import { getFormByKey, createSubmission, findUserById, SubmissionMetadata } from '@/lib/db';
import { sendSubmissionNotification } from '@/lib/mail';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
  };
}

async function resolveGeoLocation(ip: string): Promise<{ country: string; city: string }> {
  const isPrivateOrLocal =
    !ip ||
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.') ||
    ip === 'localhost';

  if (isPrivateOrLocal) {
    return { country: 'Localhost / Dev', city: 'Internal Network' };
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1800);
    const res = await fetch(`https://ipwho.is/${ip}`, { signal: controller.signal });
    clearTimeout(timer);

    if (res.ok) {
      const json = await res.json();
      if (json && json.success) {
        return {
          country: json.country || 'Unknown Country',
          city: json.city || '',
        };
      }
    }
  } catch {
    // Timeout or network error fallback
  }

  return { country: 'Unknown Country', city: '' };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ form_key: string }> }
) {
  const { form_key } = await params;
  const form = await getFormByKey(form_key);

  if (!form) {
    return new NextResponse('Form not found.', { status: 404, headers: corsHeaders() });
  }

  // Redirect to endpoint_active notice page
  const url = new URL('/endpoint_active', request.url);
  return NextResponse.redirect(url, { headers: corsHeaders() });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ form_key: string }> }
) {
  try {
    const { form_key } = await params;
    const form = await getFormByKey(form_key);

    if (!form || !form._id) {
      return new NextResponse('Form not found.', { status: 404, headers: corsHeaders() });
    }

    const contentType = request.headers.get('content-type') || '';
    const acceptHeader = request.headers.get('accept') || '';
    const isJsonRequest = contentType.includes('application/json') || acceptHeader.includes('application/json');

    const data: Record<string, any> = {};

    if (contentType.includes('application/json')) {
      const json = await request.json().catch(() => ({}));
      Object.assign(data, json);
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        if (typeof value === 'string') {
          data[key] = value;
        } else if (value instanceof File) {
          data[key] = value.name;
        }
      });
    } else {
      const text = await request.text();
      try {
        const json = JSON.parse(text);
        Object.assign(data, json);
      } catch {
        const searchParams = new URLSearchParams(text);
        searchParams.forEach((val, key) => {
          data[key] = val;
        });
      }
    }

    // Extract Client Telemetry: IP & Headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfIp = request.headers.get('cf-connecting-ip');
    const rawIp = (forwarded ? forwarded.split(',')[0].trim() : '') || realIp || cfIp || '127.0.0.1';
    // Clean up IPv6 mapped IPv4 like ::ffff:127.0.0.1
    const clientIp = rawIp.replace(/^::ffff:/, '');

    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const cfCountry = request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country');

    let country = cfCountry || '';
    let city = '';

    if (!country) {
      const geo = await resolveGeoLocation(clientIp);
      country = geo.country;
      city = geo.city;
    }

    const metadata: SubmissionMetadata = {
      ip: clientIp,
      country,
      city,
      userAgent,
    };

    // Save submission to MongoDB FormFarmDB with metadata
    await createSubmission(form._id, data, metadata);

    // Send email notification to owner with telemetry
    const owner = await findUserById(form.userId);
    if (owner && owner.email) {
      sendSubmissionNotification(owner.email, form.form_name, data, metadata).catch((err) =>
        console.error('Mail notification error:', err)
      );
    }

    if (isJsonRequest) {
      return NextResponse.json(
        {
          success: true,
          message: 'Submission successful',
          form_name: form.form_name,
        },
        { status: 200, headers: corsHeaders() }
      );
    }

    // Standard HTML form submission: redirect to /thanks
    const thanksUrl = new URL('/thanks', request.url);
    return NextResponse.redirect(thanksUrl, { status: 303, headers: corsHeaders() });
  } catch (error) {
    console.error('Submission handling error:', error);
    return new NextResponse('Failed to save submission.', { status: 500, headers: corsHeaders() });
  }
}
