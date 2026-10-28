import { MongoClient, type Db } from "mongodb";

// Un solo cliente por proceso: en desarrollo sobrevive al hot reload y en
// Vercel se reutiliza entre invocaciones de la misma función.
const globalForMongo = globalThis as unknown as { _nuMongo?: Promise<MongoClient> };

export function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Falta MONGODB_URI");

  globalForMongo._nuMongo ??= new MongoClient(uri, { serverSelectionTimeoutMS: 8_000 })
    .connect()
    .catch((err) => {
      // Si la conexión falla, el siguiente intento vuelve a probar.
      globalForMongo._nuMongo = undefined;
      throw err;
    });

  // Usa la base que viene en la URI (…mongodb.net/nutriorden).
  return globalForMongo._nuMongo.then((client) => client.db());
}
