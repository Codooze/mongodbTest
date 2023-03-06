// async function run() {
//   try {
//     // Get the MongoDB client
//     const client = await connection();

//     // Connect to the MongoDB cluster y get the collection
//     const db = getDb();
//     // Create a collection
//     const collection = db.collection('parque');

//     // Insert 5 documents
//     const data = [
//       { placa: 'ABC123', numero_serie: '1', modelo: 'Ford', marca: 'Fiesta', kilometraje: 1000, tipo: 'Sedán' },
//       { placa: 'DEF456', numero_serie: '2', modelo: 'Toyota', marca: 'Corolla', kilometraje: 2000, tipo: 'Sedán' },
//       { placa: 'GHI789', numero_serie: '3', modelo: 'Honda', marca: 'Civic', kilometraje: 3000, tipo: 'Sedán' },
//       { placa: 'JKL012', numero_serie: '4', modelo: 'Mazda', marca: 'CX-5', kilometraje: 4000, tipo: 'SUV' },
//       { placa: 'MNO345', numero_serie: '5', modelo: 'Nissan', marca: 'Sentra', kilometraje: 5000, tipo: 'Sedán' }
//     ];
//     await collection.insertMany(data);
//     console.log("Inserted 5 documents into the collection");

//     // Update first and last documents
//     await collection.updateOne({ placa: 'ABC123' }, { $set: { modelo: 'F-150' } });
//     console.log("Updated first document");

//     await collection.updateOne({ placa: 'MNO345' }, { $set: { marca: 'Versa' } });
//     console.log("Updated last document");

//     // Find all documents in the collection
//     const cursor = await collection.find({});
//     await cursor.forEach(console.dir);

//     // Delete third document
//     await collection.deleteOne({ placa: 'GHI789' });
//     console.log("Deleted third document");

//     // Find document by placa number
//     const result = await collection.findOne({ placa: 'DEF456' });
//     console.log("Found document by placa number:", result);

//   } finally {
//     // Close the client connection
//     await client.close();
//     console.log("Closed connection to server");
//   }
// }
