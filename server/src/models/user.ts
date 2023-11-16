import { model, Schema } from "mongoose";

interface IUser {
  username: string;
  email: string;
  coins: number;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  coins: { type: Number, required: true },
});

const User = model<IUser>("User", userSchema);
export default User;
