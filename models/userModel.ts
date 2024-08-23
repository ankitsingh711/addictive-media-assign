import mongoose from "mongoose";

interface IUser extends Document {
  _id: string,
  first_name: string,
  last_name: string,
  email: string;
  password: string,
  num: number,
  bio: string
}

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number: { type: Number, require: true },
  bio: { type: String, maxlength: 500 }
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export { UserModel, IUser };