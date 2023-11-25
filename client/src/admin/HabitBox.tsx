import axios from "axios";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
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
  const completeHabit = async () => {
    try {
      await axios.post(`http://localhost:8080/completeHabit`, {
        userId: currentUserId,
        habitId,
      });
      toast.success(`completed ${habit.name}`);
      fetchGarden();
    } catch (error) {
      console.log(error);
      toast.error("complete habit failed");
    }
  };

  return (
    <div className="habit-box">
      <h4>{habit.name}</h4>
      <Button onClick={completeHabit}>complete</Button>
    </div>
  );
};

export default HabitBox;
