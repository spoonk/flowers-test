import axios from "axios";
import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { addUser } from "../api/users.api";

interface createUserParams {
  refreshUsers: () => void;
}

const CreateUser: FC<createUserParams> = ({ refreshUsers }) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const createUser = async () => {
    if (!username || !email || !password) {
      toast.error("fill out fields man");
      return;
    }

    const newUserId = await addUser({ username, password, email });
    if (newUserId) refreshUsers();
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
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
