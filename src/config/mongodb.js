import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";
let client;
export function connectToMongoDB() {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Mongo db connectd sucessfully");
      createIndexes(client.db());
      console.log("Indexes Crated sucessfully");
    })
    .catch((err) => {
      console.error(err);
    });
}

export function getDb() {
  return client.db();
}
async function createIndexes(db) {
  try {
    await db.collection("products").createIndex({ price: 1 }); //single index
    await db.collection("products").createIndex({ name: 1, category: -1 }); //compound index
    await db.collection("products").createIndex({ desc: "text" }); //Text index
  } catch (err) {
    console.log("Something went wrong while creating the indexes", err);
  }
}
