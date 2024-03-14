import Car from "../models/car.model.js";

export const createCar = async (req, res, next) => {
  const { model, brand, price } = req.body;

  if (!model || !brand || !price) {
    res.status(400).json("Something is missing ");
  }

  // Check is not empty

  // create the car
  const car = await Car.create({
    model: model,
    brand: brand,
    price: price,
  });

  return res.status(201).json("Car successful  ");
};

export const getAllCars = async (req, res, next) => {
  const allcars = await Car.find({});
  return res.status(201).json(allcars);
};
