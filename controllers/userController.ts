import { Request, Response } from "express";
import { VideoModel } from "../models/videoModel";
import { IUser } from "../models/userModel";
import logger from "../logger";

interface CustomRequest extends Request {
  user?: IUser;
}

export const getUserVideos = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing from the request" });
    }

    const videos = await VideoModel.find({ user: userId });

    res.status(200).json({ videos });
  } catch (error) {
    logger.error(`Get User Videos Error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUserVideos = async (req: CustomRequest, res: Response) => {
  try {
      const videos = await VideoModel.find()
          .populate('user', 'first_name dp')
          .exec();
      
      // Group videos by user
      const userVideos = videos.reduce((acc, video) => {
          const userId = video.user._id.toString();
          if (!acc[userId]) {
              acc[userId] = {
                  user: video.user,
                  videos: []
              };
          }
          acc[userId].videos.push(video);
          return acc;
      }, {} as { [key: string]: { user: IUser, videos: any[] } });

      const result = Object.values(userVideos);

      res.status(200).json({ users: result });
  } catch (error) {
      logger.error(`Get All User Videos Error: ${error}`);
      res.status(500).json({ message: "Internal server error" });
  }
};

