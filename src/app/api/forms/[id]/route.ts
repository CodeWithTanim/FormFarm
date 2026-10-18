import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getFormById, deleteForm } from '@/lib/db';

export async function DELETE(
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

    await deleteForm(id, session.userId);
    return NextResponse.json({ success: true, message: 'Node terminated successfully' });
  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json({ error: 'Failed to delete form' }, { status: 500 });
  }
}
