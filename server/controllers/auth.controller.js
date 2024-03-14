import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Please pass the password and the email");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User doesn't exist");
    }
    const is_PasswordMatch = await bcryptjs.compareSync(
      password,
      user.password
    );

    if (!is_PasswordMatch) {
      return res.status(400).json("Invalid credilist");
    }

    //something is created (201)
    return res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.log(error);
    next(error); //500 error
  }
};
