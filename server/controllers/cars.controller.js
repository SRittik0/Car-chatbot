import mongoose from "mongoose";
import Car from "../models/car.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createCar = async (req, res, next) => {
  const {
    model,
    price,
    description,
    make,
    imageUrls,
    year,
    fuelType,
    transmission,
  } = req.body;

  if (
    !model ||
    !make ||
    !price ||
    !description ||
    !imageUrls ||
    !year ||
    !fuelType ||
    !transmission
  ) {
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
    year: year,
    fuelType: fuelType,
    transmission: transmission,
  });

  return res.status(201).json(car);
};

export const getAllCars = async (req, res, next) => {
  const allcars = await Car.find({});
  return res.status(201).json(allcars);
};

export const deleteListing = async (req, res, next) => {
  const listing = await Car.findById(req.params.id);
  console.log(req.user.id);
  console.log(listing.userRef);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef.toString()) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Car.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef.toString()) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Car.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let fuelType = req.query.fuelType;

    if (fuelType === undefined || fuelType === "all") {
      fuelType = { $in: ["Petrol", "Diesel", "Electric"] };
    }

    let transmission = req.query.transmission;

    if (transmission === undefined || transmission === "all") {
      transmission = { $in: ["Automatic", "Manual"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Car.find({
      name: { $regex: searchTerm, $options: "i" },
      fuelType,
      transmission,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
