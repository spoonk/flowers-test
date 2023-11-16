import { model, ObjectId, Schema, Types } from "mongoose";

// enum HabitType {
//   daily,
// }

// enum Difficulty {
//   easy,
//   medium,
//   hard,
// }

// type healthStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IHabit {
  userId: ObjectId;
  name: string;
  description: string;
  type: string;
  reward: ObjectId; // id of flower
  difficulty: string;
  completedToday: boolean;
  streak: number;
  daysCompleted: string[];
  health: number;
}

const habitSchema = new Schema<IHabit>({
  userId: { type: Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, default: "easy" },
  reward: { type: Types.ObjectId, required: true },
  difficulty: { type: String, required: true },
  completedToday: { type: Boolean, default: false },
  streak: { type: Number, default: 0 },
  daysCompleted: { type: [Date], default: [] },
  health: { type: Number, default: 5 },
});

const Habit = model<IHabit>("Habit", habitSchema);
export default Habit;
