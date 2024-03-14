import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true, //no number , symbols etc
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
); //time of creation of user, and update

const Car = mongoose.model("Car", carSchema);

export default Car;
