import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./userModel";

export interface IVideo extends Document {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  user: IUser;
}

const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  videoUrl: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
  timestamps: true
});

const VideoModel = mongoose.model<IVideo>("Video", videoSchema);

export { VideoModel };
