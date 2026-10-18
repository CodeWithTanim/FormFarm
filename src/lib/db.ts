import { ObjectId } from 'mongodb';
import { getDatabase } from './mongodb';

export interface UserDoc {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface FormDoc {
  _id?: ObjectId;
  userId: ObjectId;
  form_name: string;
  form_key: string;
  createdAt: Date;
}

export interface SubmissionMetadata {
  ip?: string;
  country?: string;
  city?: string;
  userAgent?: string;
}

export interface SubmissionDoc {
  _id?: ObjectId;
  form_id: ObjectId;
  data: Record<string, any>;
  metadata?: SubmissionMetadata;
  createdAt: Date;
}

let indexesInitialized = false;

export async function ensureIndexes() {
  if (indexesInitialized) return;
  try {
    const db = await getDatabase();
    await db.collection<UserDoc>('users').createIndex({ email: 1 }, { unique: true });
    await db.collection<FormDoc>('forms').createIndex({ form_key: 1 }, { unique: true });
    await db.collection<FormDoc>('forms').createIndex({ userId: 1 });
    await db.collection<SubmissionDoc>('submissions').createIndex({ form_id: 1, createdAt: -1 });
    indexesInitialized = true;
  } catch (error) {
    console.error('Error ensuring indexes:', error);
  }
}

// User Helpers
export async function findUserByEmail(email: string): Promise<UserDoc | null> {
  await ensureIndexes();
  const db = await getDatabase();
  return db.collection<UserDoc>('users').findOne({ email: email.toLowerCase().trim() });
}

export async function findUserById(id: string | ObjectId): Promise<UserDoc | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<UserDoc>('users').findOne({ _id: objectId });
}

export async function createUser(userData: Omit<UserDoc, '_id' | 'createdAt'>): Promise<UserDoc> {
  await ensureIndexes();
  const db = await getDatabase();
  const newUser: UserDoc = {
    name: userData.name.trim(),
    email: userData.email.toLowerCase().trim(),
    password: userData.password,
    createdAt: new Date(),
  };
  const result = await db.collection<UserDoc>('users').insertOne(newUser);
  return { ...newUser, _id: result.insertedId };
}

// Form Helpers
export async function createForm(userId: string | ObjectId, formName: string, formKey: string): Promise<FormDoc> {
  await ensureIndexes();
  const db = await getDatabase();
  const userObjectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  const newForm: FormDoc = {
    userId: userObjectId,
    form_name: formName.trim(),
    form_key: formKey,
    createdAt: new Date(),
  };
  const result = await db.collection<FormDoc>('forms').insertOne(newForm);
  return { ...newForm, _id: result.insertedId };
}

export async function getFormsByUserId(userId: string | ObjectId): Promise<FormDoc[]> {
  await ensureIndexes();
  const db = await getDatabase();
  const userObjectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  return db
    .collection<FormDoc>('forms')
    .find({ userId: userObjectId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getFormById(id: string | ObjectId): Promise<FormDoc | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<FormDoc>('forms').findOne({ _id: objectId });
}

export async function getFormByKey(formKey: string): Promise<FormDoc | null> {
  await ensureIndexes();
  const db = await getDatabase();
  return db.collection<FormDoc>('forms').findOne({ form_key: formKey });
}

export async function deleteForm(id: string | ObjectId, userId: string | ObjectId): Promise<boolean> {
  const db = await getDatabase();
  const formObjectId = typeof id === 'string' ? new ObjectId(id) : id;
  const userObjectId = typeof userId === 'string' ? new ObjectId(userId) : userId;

  // First delete all submissions associated with this form
  await db.collection<SubmissionDoc>('submissions').deleteMany({ form_id: formObjectId });

  // Delete the form
  const result = await db.collection<FormDoc>('forms').deleteOne({
    _id: formObjectId,
    userId: userObjectId,
  });

  return result.deletedCount > 0;
}

// Submission Helpers
export async function createSubmission(
  formId: string | ObjectId,
  data: Record<string, any>,
  metadata?: SubmissionMetadata
): Promise<SubmissionDoc> {
  await ensureIndexes();
  const db = await getDatabase();
  const formObjectId = typeof formId === 'string' ? new ObjectId(formId) : formId;
  const newSubmission: SubmissionDoc = {
    form_id: formObjectId,
    data,
    metadata,
    createdAt: new Date(),
  };
  const result = await db.collection<SubmissionDoc>('submissions').insertOne(newSubmission);
  return { ...newSubmission, _id: result.insertedId };
}

export async function getSubmissionsByFormId(formId: string | ObjectId): Promise<SubmissionDoc[]> {
  const db = await getDatabase();
  const formObjectId = typeof formId === 'string' ? new ObjectId(formId) : formId;
  return db
    .collection<SubmissionDoc>('submissions')
    .find({ form_id: formObjectId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function countSubmissionsByFormId(formId: string | ObjectId): Promise<number> {
  const db = await getDatabase();
  const formObjectId = typeof formId === 'string' ? new ObjectId(formId) : formId;
  return db.collection<SubmissionDoc>('submissions').countDocuments({ form_id: formObjectId });
}

export async function deleteSubmissions(ids: (string | ObjectId)[] | string | ObjectId, formId: string | ObjectId): Promise<number> {
  const db = await getDatabase();
  const formObjectId = typeof formId === 'string' ? new ObjectId(formId) : formId;
  const idArray = Array.isArray(ids) ? ids : [ids];
  const objectIds = idArray.map((id) => (typeof id === 'string' ? new ObjectId(id) : id));

  const result = await db.collection<SubmissionDoc>('submissions').deleteMany({
    _id: { $in: objectIds },
    form_id: formObjectId,
  });

  return result.deletedCount;
}
