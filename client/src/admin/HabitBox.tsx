import axios from "axios";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Habit } from "../types";

interface HabitBoxProps {
  userId: string;
  habitId: string;
  habit: Habit;
  fetchGarden: () => void;
}

const HabitBox: FC<HabitBoxProps> = ({
  userId,
  habitId,
  habit,
  fetchGarden,
}) => {
  const completeHabit = async () => {
    try {
      await axios.post(`http://localhost:8080/completeHabit`, {
        userId,
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
