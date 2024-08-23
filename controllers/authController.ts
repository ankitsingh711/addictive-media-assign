import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import logger from "../logger";

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, num } = req.body;

  try {
    const user = await registerUser(first_name, last_name, email, num);
    logger.info(`User Registered Successfully - ${email}`);
    res.status(201).json({ message: `User registered successfully`, user });
  } catch (error) {
    logger.error(`User Registration Error: ${error}`);
    res.status(400).json({ error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { first_name, password } = req.body;

  try {
    const result = await loginUser(first_name, password);

    if ('message' in result) {
      return res.status(400).json({ error: result.message });
    }

    res.status(200).json({ token: result.token, message: `User logged in successfully!` });
  } catch (error) {
    res.status(500).json({ error: error || "An error occurred" });
  }
};
