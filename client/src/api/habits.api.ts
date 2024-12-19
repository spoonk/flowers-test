import axios from "axios";
import { Habit } from "../types";

const getHabits = async ({ currentUserId }: { currentUserId: string }) => {
  try {
    const habits = await axios.get<{ habits: Habit[] }>(
      `http://localhost:8080/habits`,
      {
        params: { userId: currentUserId },
      },
    );
    return habits.data.habits;
  } catch (error) {}
};

const addHabit = async ({
  name,
  description,
  userId,
}: {
  name: string;
  description: string;
  userId: string;
}) => {
  try {
    await axios.post<{ newHabit: any }>(`http://localhost:8080/addHabit`, {
      name,
      description,
      userId,
    });
  } catch (error) {
    console.error(error);
  }
};

const completeHabit = async ({
  userId,
  habitId,
}: {
  userId: string;
  habitId: string;
}) => {
  try {
    await axios.post(`http://localhost:8080/completeHabit`, {
      userId,
      habitId,
    });
  } catch (error) {
    console.error(error);
  }
};

export { addHabit, completeHabit, getHabits };
