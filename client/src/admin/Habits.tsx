import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";

interface Habit {
  userId: string;
  name: string;
  description: string;
  type: string;
  reward: string; // id of flower
  difficulty: string;
  completedToday: boolean;
  streak: number;
  daysCompleted: string[];
  health: number;
}

interface HabitProps {
  userId: string | undefined;
}

const Habits: FC<HabitProps> = ({ userId }) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const fetchHabits = async () => {
    // @todo: make server api client
    // @todo: dotenv for server route
    try {
      const habits = await axios.get<{ habits: Habit[] }>(
        `http://localhost:8080/habits`,
        {
          params: { userId },
        },
      );
      setHabits(habits.data.habits);
      toast.success("fetched habits");
    } catch (error) {}
  };

  useEffect(() => {
    if (userId) {
      fetchHabits();
    }
  }, [userId]);

  return (
    <div className="habits-scripts">
      <Card>
        <Card.Title>Habits</Card.Title>
        {userId ? (
          <div>
            {habits.map((habit) => {
              return <h5>{habit.name}</h5>;
            })}
          </div>
        ) : (
          <h4>please select at user</h4>
        )}
      </Card>
    </div>
  );
};

export default Habits;
