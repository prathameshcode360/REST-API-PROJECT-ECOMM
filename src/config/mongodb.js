import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";
let client;
export function connectToMongoDB() {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Mongo db connectd sucessfully");
      createCounter(client.db());
    })
    .catch((err) => {
      console.error(err);
    });
}

export function getDb() {
  return client.db();
}

async function createCounter(db) {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "userId" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "userId", value: 0 });
  }
}
