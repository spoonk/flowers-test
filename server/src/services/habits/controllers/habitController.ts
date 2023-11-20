//@todo: figure out how to make models a package (@ syntax)
import Habit from "../../../models/habit";
import { ObjectId } from "mongoose";
import User from "../../../models/user";
import { addFlowerToGarden } from "../../garden/controllers/gardenController";

interface addHabitParams {
  userId: string;
  name: string;
  description: string;
}

const validateAddHabitParams = ({
  userId,
  name,
  description,
}: addHabitParams | any): addHabitParams | undefined => {
  if (
    typeof userId !== "string" ||
    typeof name !== "string" ||
    typeof description !== "string"
  ) {
    return undefined;
  }
  return { userId, name, description };
};

const determineReward = (userId: string) => {
  return 1;
};

const addHabit = async (params: addHabitParams | any) => {
  const validatedParams = validateAddHabitParams(params);
  if (!validatedParams) return { newUserId: undefined };
  const { userId, name, description } = validatedParams;

  const newHabit = new Habit({
    userId,
    description,
    name,
    difficulty: "easy",
    type: "daily",
  });

  await newHabit.save();
  await addHabitToUser({ userId, habitId: newHabit.id });

  // update user
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

  // getting ugly :)
  user.habits.push(habitId);
  await user.save();
};

const getHabits = async (userId: any) => {
  if (typeof userId !== "string") return [];
  const habits = await Habit.find({ userId });
  return habits;
};

interface completeHabitParams {
  userId: string;
  habitId: string;
}

const validateCompleteHabitParams = ({
  userId,
  habitId,
}: completeHabitParams | any): completeHabitParams | undefined => {
  if (typeof userId !== "string" || typeof habitId !== "string") {
    return undefined;
  }
  return { userId, habitId };
};

const completeHabit = async (params: completeHabitParams | any) => {
  const validatedParams = validateCompleteHabitParams(params);
  if (!validatedParams) return { success: false };
  const { userId, habitId } = validatedParams;
  // @todo: refactor to pass habit around
  const habit = await Habit.findById(habitId);
  if ((habit && habit.completedToday) || !habit) return;
  const flowerId = await resolveFlowerForHabit(habitId);

  // @todo: weird cast here!
  const gardenId = await addFlowerToGarden(flowerId as ObjectId, userId);
  return gardenId;
  // @todo: update habit statistics
};

const resolveFlowerForHabit = async (habitId: string) => {
  const habit = await Habit.findById(habitId);
  return habit?.reward || "655b8adb253442a30c20cc8f"; // @todo: bad
};

export { addHabit, completeHabit, getHabits };
