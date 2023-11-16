import { model, ObjectId, Schema, Types } from "mongoose";

export interface IGarden {
  user: ObjectId;
  flowers: [
    {
      flowerId: ObjectId;
      position: {
        x: number;
        y: number;
        z: number;
      };
    },
  ];
}

const gardenSchema = new Schema<IGarden>({
  user: { type: Types.ObjectId, required: true },
  flowers: [
    {
      flowerId: { type: Types.ObjectId, required: true },
      position: {
        x: { type: Number, default: 0.0 },
        y: { type: Number, default: 0.0 },
        z: { type: Number, default: 0.0 },
      },
    },
  ],
});

const Garden = model<IGarden>("Garden", gardenSchema);
export default Garden;
