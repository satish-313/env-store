import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL as string;

let client;
let clientPromise: Promise<MongoClient>;
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
