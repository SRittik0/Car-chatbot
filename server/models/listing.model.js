import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  },
  { timestamps: true }
); //time of creation of user, and update

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
