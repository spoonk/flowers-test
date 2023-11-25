import axios from "axios";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { completeHabit } from "../api/habits.api";
import { Habit } from "../types";
import { useAppSelector } from "../slices/hooks";

interface HabitBoxProps {
  habitId: string;
  habit: Habit;
  fetchGarden: () => void;
}

const HabitBox: FC<HabitBoxProps> = ({ habitId, habit, fetchGarden }) => {
  const currentUserId = useAppSelector(
    (state) => state.userReducer.currentUserID,
  );
  const completeThisHabit = async () => {
    if (!currentUserId) return;
    await completeHabit({ userId: currentUserId, habitId });
    fetchGarden();
  };

  return (
    <div className="habit-box">
      <h4>{habit.name}</h4>
      <Button onClick={completeThisHabit}>complete</Button>
    </div>
  );
};

export default HabitBox;
