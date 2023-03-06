import mongodb from "mongodb";
import { getDb } from "../db.js";

const ObjectId = mongodb.ObjectId;

let cars;

export default class CarDAO {
  static async injectDB() {
    if (!cars) {
      try {
        const db = getDb();
        cars = await db.collection("parque");
        console.log(`Connected to collection: ${cars.collectionName}`);
      } catch (e) {
        console.error(
          `Unable to establish a collection handle in carDAO: ${e}`
        );
      }
    }
  }

  static async getCollection() {
    if (!cars) {
      await CarDAO.injectDB();
    }
    return cars;
  }

  static async getCars({ filters = {}, page = 0, carsPerPage = 20 } = {}) {
    const cars = await CarDAO.getCollection();
    const cursor = cars
      .find(filters)
      .skip(page * carsPerPage)
      .limit(carsPerPage);
    const carsList = await cursor.toArray();
    const totalNumCars = await cars.countDocuments(filters);
    return { carsList, totalNumCars };
  }

  static async getCarById(id) {
    const cars = await CarDAO.getCollection();
    return await cars.findOne({ _id: ObjectId(id) });
  }

  static async addCar(
    placa,
    numero_serie,
    carModelo,
    carState,
    marca,
    kilometraje,
    tipo
  ) {
    console.log("addCar");
    const cars = await CarDAO.getCollection();
    const car = {
      placa: placa,
      numero_serie: numero_serie,
      modelo: carModelo,
      state: carState,
      marca: marca,
      kilometraje: kilometraje,
      tipo: tipo,
    };
    console.log(car);
    return await cars.insertOne(car);
  }

  static async updateCar(
    id,
    placa,
    numero_serie,
    carModelo,
    carState,
    marca,
    kilometraje,
    tipo
  ) {
    const cars = await CarDAO.getCollection();
    const car = {
      placa: placa,
      numero_serie: numero_serie,
      modelo: carModelo,
      state: carState,
      marca: marca,
      kilometraje: kilometraje,
      tipo: tipo,
    };
    return await cars.updateOne({ _id: new ObjectId(id) }, { $set: car });
  }

  static async deleteCar(id) {
    const cars = await CarDAO.getCollection();
    return await cars.deleteOne({ _id: new ObjectId(id) });
  }
}
