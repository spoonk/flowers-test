//@todo: figure out how to make models a package (@ syntax)
import Habit from "../../../models/habit";
import { ObjectId } from "mongoose";
import User from "../../../models/user";
import { addFlowerToGarden } from "../../garden/controllers/gardenController";
import Flower from "../../../models/flowers";
import {
  addHabitParams,
  completeHabitParams,
  validateAddHabitParams,
  validateCompleteHabitParams,
} from "./habitValidation";
import { randomInt } from "crypto";

const determineReward = async () => {
  const rand = randomInt(100);
  const flower = new Flower({ model: rand });
  await flower.save();
  return flower.id;
};

const addHabit = async (params: addHabitParams | any) => {
  const validatedParams = validateAddHabitParams(params);
  if (!validatedParams) return { newUserId: undefined };
  const { userId, name, description } = validatedParams;

  const newHabit = new Habit({
    userId,
    description,
    name,
    reward: await determineReward(),
    difficulty: "easy",
    type: "daily",
  });

  await newHabit.save();
  await addHabitToUser({ userId, habitId: newHabit.id });

  return { newHabit };
};

const addHabitToUser = async ({
  userId,
  habitId,
}: {
  userId: string;
  habitId: ObjectId;
}) => {
  const user = await User.findById(userId);
  if (!user) return;

  user.habits.push(habitId);
  await user.save();
};

const getHabits = async (userId: any) => {
  if (typeof userId !== "string") return [];
  const habits = await Habit.find({ userId });
  return habits;
};

const completeHabit = async (params: completeHabitParams | any) => {
  const validatedParams = validateCompleteHabitParams(params);
  if (!validatedParams) return { success: false };
  const { userId, habitId } = validatedParams;

  // @todo: refactor to pass habit around
  const habit = await Habit.findById(habitId);
  if ((habit && habit.completedToday) || !habit) return { success: false };
  const flowerId = await resolveFlowerForHabit(habitId);

  // @note: weird cast here!
  const gardenId = await addFlowerToGarden(flowerId as ObjectId, userId);
  return gardenId;
  // @todo: update habit statistics
};

const resolveFlowerForHabit = async (habitId: string) => {
  const habit = await Habit.findById(habitId);
  return habit?.reward || "655b8adb253442a30c20cc8f"; // @todo: bad
};

export { addHabit, completeHabit, getHabits };
