import { model, Schema } from "mongoose";
export interface IFlower {
  model: string;
}

const flowerSchema = new Schema<IFlower>({
  model: { type: String, required: true },
});

const Flower = model<IFlower>("Flower", flowerSchema);
export default Flower;
