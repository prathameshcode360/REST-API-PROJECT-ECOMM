import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

export function connectToMongoDB() {
  MongoClient.connect(url)
    .then((client) => {
      console.log("Mongo db connectd sucessfully");
    })
    .catch((err) => {
      console.error(err);
    });
}
