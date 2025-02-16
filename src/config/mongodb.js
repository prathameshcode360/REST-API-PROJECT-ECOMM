import { MongoClient } from "mongodb";

let client;
console.log(process.env.DB_URL);

export async function connectToMongoDB() {
  try {
    client = new MongoClient(process.env.DB_URL);
    await client.connect();
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

export function getDb() {
  if (!client) {
    throw new Error("Database not connected!");
  }
  return client.db();
}

export function getClient() {
  if (!client) {
    throw new Error("Database client not initialized!");
  }
  return client;
}
