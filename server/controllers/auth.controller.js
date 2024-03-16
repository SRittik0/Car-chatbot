import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    //something is created (201)
    return res.status(201).json("User created successfully");
  } catch (error) {
    next(error); //500 error
  }
};

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json("Please pass the password and the email");
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json("User doesn't exist");
//     }
//     const is_PasswordMatch = await bcryptjs.compareSync(
//       password,
//       user.password
//     );

//     if (!is_PasswordMatch) {
//       return res.status(400).json("Invalid credilist");
//     }

//     //something is created (201)
//     return res.status(200).json({ username: user.username, email: user.email });
//   } catch (error) {
//     console.log(error);
//     next(error); //500 error
//   }
// };

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credential!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
