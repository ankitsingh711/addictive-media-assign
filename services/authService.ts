import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import logger from "../logger";

dotenv.config();

export const registerUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  num: number
) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    logger.info(`User registration failed : User already exist - ${email}`);
    return email;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    num,
  });
  await user.save();
  return;
};

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    logger.info(`User Login Failed: Invalid Credentials - ${email}`);
    return { message: "Invalid credentials" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    logger.info(`User Login Failed: Invalid Credentials - ${email}`);
    return { message: "Invalid credentials" };
  }

  const token = jwt.sign({}, "your_jwt_secret", {
    expiresIn: "1h",
  });

  logger.info(`User logged in successfully - ${email}`);
  return {
    token,
    user: { id: user._id, email: user.email },
  };
};
