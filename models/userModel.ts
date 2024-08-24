import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  num: number;
  bio: string;
  dp: string
}

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  num: { type: Number, required: true },
  bio: { type: String, maxlength: 500 },
  dp: { type: String }
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export { UserModel, IUser };