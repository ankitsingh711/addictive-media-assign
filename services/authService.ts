import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import logger from "../logger";
import { sendMail } from '../services/email';

dotenv.config();

const generatePassword = (first_name: string, last_name: string, num: number): string => {
  const firstPart = first_name.slice(0, 3); 
  const lastPart = last_name.slice(-3); 
  const numPart = num.toString().slice(0, 3); 

  const combined = firstPart + lastPart + numPart;
  return combined
    .split('')
    .sort(() => Math.random() - 0.5) 
    .join('');
};

export const registerUser = async (
  first_name: string,
  last_name: string,
  email: string,
  num: number
) => {
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      logger.info(`User registration failed: User already exists - ${email}`);
      return email;
    }
    const generatedPassword = generatePassword(first_name, last_name, num);

    const user = new UserModel({
      first_name,
      last_name,
      email,
      password: generatedPassword,
      num,
    });

    await user.save();
    logger.info(`User Registered Successfully - ${email}`);
    sendMail(first_name+last_name, [email], generatedPassword);
    return;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const loginUser = async (first_name: string, password: string) => {
  const user = await UserModel.findOne({ first_name });
  if (!user) {
    logger.info(`User Login Failed: Invalid Credentials - ${first_name}`);
    return { message: "Invalid credentials" };
  }

  const isMatch = user?.password === password;
  if (!isMatch) {
    logger.info(`User Login Failed: Invalid Credentials - ${first_name}`);
    return { message: "Invalid credentials" };
  }

  const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', {
    expiresIn: "1h",
  });

  logger.info(`User logged in successfully - ${first_name}`);
  return {
    token,
    user: { id: user._id, email: user.email },
  };
};
