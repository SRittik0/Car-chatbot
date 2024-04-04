import Car from "../models/car.model.js";

export const createCar = async (req, res, next) => {
  const { model, price, description, make, imageUrls } = req.body;

  if (!model || !make || !price || !description || !imageUrls) {
    console.log(req.body);
    return res.status(400).json("Something is missing ");
  }

  // Check is not empty
  // console.log(req.user);
  const userId = req.user.id;

  // create the car
  const car = await Car.create({
    model: model,

    price: price,
    make: make,
    description: description,
    userRef: userId,
    imageUrls: imageUrls,
  });

  return res.status(201).json(car);
};

export const getAllCars = async (req, res, next) => {
  const allcars = await Car.find({});
  return res.status(201).json(allcars);
};
