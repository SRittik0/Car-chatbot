import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, //no number , symbols etc
      unique: true, //different username , need to be different
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); //time of creation of user, and update

const User = mongoose.model("User", userSchema);

export default User;
