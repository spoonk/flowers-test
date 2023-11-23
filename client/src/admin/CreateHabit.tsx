import axios from "axios";
import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAppSelector } from "../slices/hooks";

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
          userId: currentUserId,
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
