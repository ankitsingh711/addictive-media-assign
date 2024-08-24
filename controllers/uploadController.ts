import { Request, Response } from "express";
import logger from "../logger";
import { uploadBioService } from "../services/uploadService";
import { IUser } from "../models/userModel";
import { VideoModel } from "../models/videoModel";
import sharp from "sharp";
import { UserModel } from '../models/userModel';
import path from "path";
import fs from 'fs';


interface CustomRequest extends Request {
  user?: IUser;
}

export const uploadBio = async (req: CustomRequest, res: Response) => {
  try {
    const { bio } = req.body;
    const userId = req.user?.id; 

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is missing from the request" });
    }

    const updatedUser = await uploadBioService(userId, bio);
    logger.info(`Bio added successfully for user ${userId}`);
    res.status(200).json({ message: "Bio added successfully!", user: updatedUser });
  } catch (error) {
    logger.error(`Upload Bio Error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadVideo = async (req: CustomRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    const video = new VideoModel({
      title,
      description,
      thumbnail: "default-thumbnail.jpg",
      videoUrl: file.path,
      user: req.user?.id,
    });

    await video.save();
    logger.info(`Video uploaded successfully: ${video._id}`);
    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    logger.error(`Video Upload Error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadDp = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const resizedImage = await sharp(req.file.buffer)
      .resize(500, 500, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat("jpeg")
      .toBuffer();

    const fileName = `dp-${req.user?.id}.jpeg`;
    const directoryPath = path.join(__dirname, "..", "uploads", "dps");
    const filePath = path.join(directoryPath, fileName);

    // Ensure the directory exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    await sharp(resizedImage).toFile(filePath);

    await UserModel.findByIdAndUpdate(req.user?.id, { dp: filePath });

    res.status(200).json({ message: "Display picture uploaded successfully", filePath });
  } catch (error) {
    logger.error(`Upload DP Error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};


