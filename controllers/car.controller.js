import carDAO from "../models/car.dao.js";

export default class carCtrl {
  static async apiGetCars(req, res, next) {
    console.log("apiGetCars");
    const carsPerPage = req.query.carsPerPage
      ? parseInt(req.query.carsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.placa) {
      filters.placa = req.query.placa;
    } else if (req.query.marca) {
      filters.marca = req.query.marca;
    }

    const { carsList, totalNumCars } = await carDAO.getCars({
      filters,
      page,
      carsPerPage,
    });

    let response = {
      cars: carsList,
      page: page,
      filters: filters,
      entries_per_page: carsPerPage,
      total_results: totalNumCars,
    };
    res.json(response);
  }

  static async apiGetCarById(req, res, next) {
    try {
      let id = req.params.id || {};
      let car = await carDAO.getCarById(id);
      if (!car) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(car);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiAddCar(req, res, next) {
    try {
      console.log("apiAddCar");
      const placa = req.body.placa;
      const numero_serie = req.body.serie;
      const carModelo = req.body.modelo;
      const carState = req.body.state;
      const marca = req.body.marca;
      const kilometraje = req.body.kilometraje;
      const tipo = req.body.tipo;

      console.log("apiAddCar received the following data:");
      console.log(req.body);

      const CarResponse = await carDAO.addCar(
        placa,
        numero_serie,
        carModelo,
        carState,
        marca,
        kilometraje,
        tipo
      );
      console.log("apiAddCar successfully added car:");
      console.log(CarResponse);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiUpdateCar(req, res, next) {
    try {
      const id = req.params.id;
      const placa = req.body.placa;
      const numero_serie = req.body.serie;
      const carModelo = req.body.modelo;
      const carState = req.body.state;
      const marca = req.body.marca;
      const kilometraje = req.body.kilometraje;
      const tipo = req.body.tipo;

      console.log("apiUpdateCar received the following data:");
      console.log(req.body);

      const CarResponse = await carDAO.updateCar(
        id,
        placa,
        numero_serie,
        carModelo,
        carState,
        marca,
        kilometraje,
        tipo
      );

      console.log("apiUpdateCar successfully updated car:");
      console.log(CarResponse);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e });
      console.log(e);
    }
  }

  static async apiDeleteCar(req, res, next) {
    try {
      console.log("apiDeleteCar");
      const id = req.params.id;
      const CarResponse = await carDAO.deleteCar(id);
      console.log("apiDeleteCar successfully deleted car:");
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e });
      console.log(e);
    }
  }
}
