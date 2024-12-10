import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI) {
  throw new Error("Veuillez définir la variable d'environnement MONGO_URI.");
}

if (process.env.NODE_ENV === "development") {
  // Pendant le développement, utilisez une instance globale
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En production, créez une nouvelle instance
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
