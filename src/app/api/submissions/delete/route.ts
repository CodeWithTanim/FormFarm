import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getFormById, deleteSubmissions } from '@/lib/db';

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { form_id, ids } = body;

    if (!form_id || !ids) {
      return NextResponse.json({ error: 'form_id and ids are required' }, { status: 400 });
    }

    const form = await getFormById(form_id);
    if (!form || form.userId.toString() !== session.userId) {
      return NextResponse.json({ error: 'Form not found or unauthorized' }, { status: 404 });
    }

    const deletedCount = await deleteSubmissions(ids, form_id);

    return NextResponse.json({
      success: true,
      message: 'Submissions deleted successfully',
      deletedCount,
    });
  } catch (error) {
    console.error('Error deleting submissions:', error);
    return NextResponse.json({ error: 'Failed to delete submissions' }, { status: 500 });
  }
}
