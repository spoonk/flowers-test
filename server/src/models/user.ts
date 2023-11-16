import { model, ObjectId, Schema, Types } from "mongoose";
import moment = require("moment");

export interface IUser {
  username: string;
  email: string;
  password: string;
  accountCreated: string;
  lastLoginTime: string;
  timeZone: string;
  habits: ObjectId[];
  garden?: ObjectId;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountCreated: { type: String, default: () => moment.now().toString() },
  lastLoginTime: { type: String, required: true },
  timeZone: { type: String, required: true },
  habits: { type: [Types.ObjectId], default: [] },
  garden: { type: Types.ObjectId, required: false },
});

const User = model<IUser>("User", userSchema);
export default User;
