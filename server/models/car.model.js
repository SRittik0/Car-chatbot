import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      trim: true,
      required: true,
    },
    model: {
      type: String,

      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
); //time of creation of user, and update

const Car = mongoose.model("Car", carSchema);

export default Car;
