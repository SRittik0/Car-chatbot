import mongoose from "mongoose";
import Car from "../models/car.model.js";
import { errorHandler } from "../utils/error.js";
import generateEmbedding from "../utils/generateEmbeddings.js";
import queryForOpenAI from "../utils/openCompletion.js";
import evaluateIfDatabaseRequired from "../utils/assistantEvaluateVectorSearch.js";

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

  // Data to embedd
  const toEmbed = {
    make: make,
    model: model,
    price: price,
    description: description,
    year: year,
    fuelType: fuelType,
    transmission: transmission,
  };
  //
  const embedding = await generateEmbedding(JSON.stringify(toEmbed));

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
    embedding: embedding,
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

  // Data to embedd
  try {
    const toEmbed = {
      make: listing.make,
      model: listing.model,
      price: listing.price,
      description: listing.description,
      year: listing.year,
      fuelType: listing.fuelType,
      transmission: listing.transmission,
    };
    //
    const embedding = await generateEmbedding(JSON.stringify(toEmbed));
    const updateData = {
      ...req.body, // existing data from request body
      embedding: embedding, // add the embedding to the update data
    };

    const updatedListing = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
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
    } else {
      console.log(fuelType);

      const array_fuel = fuelType.split(",");
      console.log(array_fuel);
      fuelType = { $in: array_fuel };
    }

    let transmission = req.query.type;
    console.log(transmission);

    if (transmission === undefined || transmission === "all") {
      transmission = { $in: ["Automatic", "Manual"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Car.find({
      make: { $regex: searchTerm, $options: "i" },
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

export const searchCar = async (req, res, next) => {
  try {
    const searchQuery = req.body.search;
    const previousMessage = req.body.previous_message;
    console.log(searchQuery);

    const evualuation = await evaluateIfDatabaseRequired(searchQuery);
    console.log(evualuation);
    if (evualuation.content == "false") {
      const prompt = `Consider these previous message as well ${JSON.stringify(
        previousMessage
      )}. \n\n Query: ${searchQuery} \n\n Answer:`;

      const answer = await queryForOpenAI(prompt);
      console.log("answer: ", answer);
      return res.status(200).json({ message: "success", data: answer });
    }
    console.log("Embedding");
    const embedding = await generateEmbedding(searchQuery); // Generate Embedding
    // const gptResponse = (await searchAssistant(searchText)) as IGptResponse;
    // console.log('gptResponse', gptResponse);
    // const matchStage = constructMatch(gptResponse);
    // console.log('matchStage', matchStage);
    const cars = await Car.find({});
    // Query DB

    // Introduce match stage
    const agggregate = [
      {
        $vectorSearch: {
          index: process.env.VECTOR_INDEX_NAME,
          path: "embedding",
          queryVector: embedding,
          numCandidates: 100,
          limit: 2,
        },
      },
      {
        $project: {
          _id: 1,
          make: 1,
          model: 1,
          year: 1,
          transmission: 1,
          fuelType: 1,
          description: 1,
          price: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ];
    const aggCursor = await Car.aggregate(agggregate);

    const cars_object = [];
    for await (const doc of aggCursor) {
      cars_object.push(doc);
    }
    // With previous messages
    const prompt = `Consider these previous message as well ${JSON.stringify(
      previousMessage
    )}. Based on these cars: ${JSON.stringify(
      cars_object
    )} \n\n Query: ${searchQuery} \n\n Answer:`;

    const answer = await queryForOpenAI(prompt);
    console.log("answer: ", answer);
    return res.status(200).json({ message: "success", data: answer });
  } catch (error) {
    next(error);
  }
};

// return res.status(200).json(cars_object);

// return res.status(200).json({ message: "success", data: cars_object });

// context
// const prompt = `Based on these cars: ${JSON.stringify(
//   cars_object
// )} \n\n Query: ${searchQuery} \n\n Answer:`;
