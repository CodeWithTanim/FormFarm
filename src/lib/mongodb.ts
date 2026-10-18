import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_ATLAS_DRIVER_CONNECTION || '';
const dbName = process.env.MONGODB_DB_NAME || 'FormFarmDB';

if (!uri) {
  console.warn('Warning: MONGODB_ATLAS_DRIVER_CONNECTION is not set in environment.');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export default clientPromise;
