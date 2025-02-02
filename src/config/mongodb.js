import { MongoClient } from "mongodb";

let client;
console.log(process.env.DB_URL);
export function connectToMongoDB() {
  MongoClient.connect(process.env.DB_URL)
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
