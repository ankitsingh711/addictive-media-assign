import { Request, Response } from "express";
import logger from "../logger";
import { uploadBioService } from "../services/uploadService";
import { IUser } from "../models/userModel";

interface CustomRequest extends Request {
  user?: IUser;
}

export const uploadBio = async (req: CustomRequest, res: Response) => {
  try {
    const { bio } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is missing from the request" });
    }
    const updatedUser = await uploadBioService(userId, bio);
    logger.info(`Bio added successfully for user ${userId}`);
    res
      .status(200)
      .json({ message: "Bio added successfully!", user: updatedUser });
  } catch (error) {
    logger.error(`Upload Bio Error: ${error}`);
    res.status(500).json({ message: error });
  }
};
