import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

let _db;

const connection = async () => {
  //console.log(process.env.MONGO_URI);
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  _db = client.db("DB_Sena");
  console.log("Connected to MongoDB!".bgCyan.black.bold);
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database not initialized");
  }
  return _db;
};

export { connection, getDb };
