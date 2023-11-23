import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { Habit } from "../types";
import CreateHabit from "./CreateHabit";
import HabitBox from "./HabitBox";
import { useAppSelector } from "../slices/hooks";

interface HabitProps {
  fetchGarden: () => void;
}

const Habits: FC<HabitProps> = ({ fetchGarden }) => {
  const currentUserId = useAppSelector(
    (state) => state.userReducer.currentUserID,
  );
  const [habits, setHabits] = useState<Habit[]>([]);

  const fetchHabits = async () => {
    // @todo: make server api client
    // @todo: dotenv for server route
    try {
      const habits = await axios.get<{ habits: Habit[] }>(
        `http://localhost:8080/habits`,
        {
          params: { userId: currentUserId },
        },
      );
      setHabits(habits.data.habits);
      toast.success("fetched habits");
    } catch (error) {}
  };

  useEffect(() => {
    if (currentUserId) {
      fetchHabits();
    }
  }, [currentUserId]);

  return (
    <div className="habits-scripts">
      <Card>
        <Card.Title>Habits</Card.Title>
        {currentUserId ? (
          <>
            <div>
              {habits.map((habit) => {
                return (
                  <HabitBox
                    fetchGarden={fetchGarden}
                    habitId={habit._id}
                    habit={habit}
                  />
                );
              })}
            </div>
            <CreateHabit refreshHabits={() => fetchHabits()} />
          </>
        ) : (
          <h4>please select at user</h4>
        )}
      </Card>
    </div>
  );
};

export default Habits;
