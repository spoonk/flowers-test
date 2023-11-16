import { model, Schema } from "mongoose";

interface IHabit {
  name: string;
  description: string;
}

const habitSchema = new Schema<IHabit>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Habit = model<IHabit>("Habit", habitSchema);
export default Habit;
