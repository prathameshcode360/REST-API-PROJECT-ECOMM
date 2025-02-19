import { MongoClient } from "mongodb";

let client;
const url = "mongodb://localhost:27017/ecomdb";
export function connectToMongoDB() {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Mongo db connectd sucessfully");
    })
    .catch((err) => {
      console.error(err);
    });
}

export function getDb() {
  return client.db();
}
