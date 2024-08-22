import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import logger from "../logger";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/userModel";

interface CustomRequest extends Request {
  user?: { role: string } | JwtPayload | string;
}

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, role } = req.body;

  try {
    const user = await registerUser(first_name, last_name, email, password, role);
    logger.info(`User Registered Successfully - ${email}`);
    res.status(201).json({ message: `User registered successfully`, user });
  } catch (error) {
    logger.error(`User Registration Error: ${error}`);
    res.status(400).json({ error: error });
  }
};

export const login = async (req: CustomRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);

    res.status(200).json({ token, message: `User logged in successfully!` });
  } catch (error) {
    res.status(400).json({ error: error || "An error occurred" });
  }
};