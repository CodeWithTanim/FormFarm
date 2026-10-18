import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSessionUser } from '@/lib/auth';
import { getFormsByUserId, createForm } from '@/lib/db';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const forms = await getFormsByUserId(session.userId);
    return NextResponse.json({
      forms: forms.map((f) => ({
        id: f._id?.toString(),
        form_name: f.form_name,
        form_key: f.form_key,
        created_at: f.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    return NextResponse.json({ error: 'Failed to fetch forms' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Form name is required' }, { status: 400 });
    }

    // Secure random 16-character hex key (matches bin2hex(random_bytes(8)))
    const formKey = crypto.randomBytes(8).toString('hex');

    const form = await createForm(session.userId, name.trim(), formKey);

    return NextResponse.json({
      success: true,
      form: {
        id: form._id?.toString(),
        form_name: form.form_name,
        form_key: form.form_key,
        created_at: form.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating form:', error);
    return NextResponse.json({ error: 'Could not create form' }, { status: 500 });
  }
}
