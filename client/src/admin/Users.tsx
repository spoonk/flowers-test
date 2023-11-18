import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import SelectUser from "./SelectUser";
import CreateUser from "./CreateUser";

interface User {
  username: string;
  email: string;
  password: string;
  accountCreated: string;
  lastLoginTime: string;
  timeZone: string;
  userId: string;
  _id: string;
  // habits: ObjectId[];
  // garden?: ObjectId;
}

interface UsersProps {
  setUserCB: (userId: string) => void;
  currentUserId: string | undefined;
}

const Users: FC<UsersProps> = ({ setUserCB, currentUserId }) => {
  // @todo: probably just do the full user here, not just id
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    // @todo: make server api client
    // @todo: dotenv for server route
    try {
      const users = await axios.get<{ users: User[] }>(
        `http://localhost:8080/users`,
      );
      console.log(users);
      setUsers(users.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users">
      <Card>
        <Card.Title>Users</Card.Title>
        <h4>Selected user: {currentUserId || "no user selected"}</h4>
        <SelectUser setUserCB={setUserCB} users={users} />
        <CreateUser refreshUsers={fetchUsers} />
      </Card>
    </div>
  );
};

export default Users;
