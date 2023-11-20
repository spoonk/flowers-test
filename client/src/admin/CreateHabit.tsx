import axios from "axios";
import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { Habit } from "../types";

interface createHabitParams {
  refreshHabits: () => void;
  userId: string;
}

const CreateHabit: FC<createHabitParams> = ({ refreshHabits, userId }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  const createUser = async () => {
    if (!name || !description) {
      toast.error("fill out fields man");
      return;
    }

    try {
      const data = await axios.post<{ newHabit: any }>(
        `http://localhost:8080/addHabit`,
        {
          name,
          description,
          userId,
        },
      );

      toast.success(data.data.newHabit);
      refreshHabits();
    } catch (error) {
      console.log(error);
      toast.error("create habit failed");
    }
    return;
  };

  return (
    <div className="create-user">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
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
