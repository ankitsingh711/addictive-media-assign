import mongoose from "mongoose";

interface IUser extends Document {
  first_name: string,
  last_name: string,
  email: string;
  password: string,
  num: number
}

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number: { type: Number, require: true }
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export { UserModel, IUser };