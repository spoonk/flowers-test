import axios from "axios";
import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAppSelector } from "../slices/hooks";
import { addHabit } from "../api/habits.api";

interface createHabitParams {
  refreshHabits: () => void;
}

const CreateHabit: FC<createHabitParams> = ({ refreshHabits }) => {
  const currentUserId = useAppSelector(
    (state) => state.userReducer.currentUserID,
  );

  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  // would really love for this entire thing to be in a thunk or smth
  // (I don't know what a thunk is)
  const createHabit = async () => {
    if (!name || !description || !currentUserId) {
      toast.error("fill out fields man");
      return;
    }

    await addHabit({ name, description, userId: currentUserId });
    refreshHabits();
  };

  return (
    <div className="create-habit">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          createHabit();
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Habit name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter habit name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Habit description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter habit description"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateHabit;
