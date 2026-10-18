import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getFormById, getSubmissionsByFormId } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const form = await getFormById(id);

    if (!form || form.userId.toString() !== session.userId) {
      return NextResponse.json({ error: 'Form not found or unauthorized' }, { status: 404 });
    }

    const submissions = await getSubmissionsByFormId(id);

    return NextResponse.json({
      form: {
        id: form._id?.toString(),
        form_name: form.form_name,
        form_key: form.form_key,
        created_at: form.createdAt,
      },
      submissions: submissions.map((s) => ({
        id: s._id?.toString(),
        data: s.data,
        metadata: s.metadata,
        created_at: s.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
