import express from "express";
import carCtrl from "../controllers/car.controller.js";

const router = express.Router();

router.route("/car/:id").get(carCtrl.apiGetCarById);
router.route("/cars").get(carCtrl.apiGetCars);
router.route("/addCar").post(carCtrl.apiAddCar);
router
  .route("/updateCar/:id")
  .put(carCtrl.apiUpdateCar)
  .delete(carCtrl.apiDeleteCar);

export default router;
