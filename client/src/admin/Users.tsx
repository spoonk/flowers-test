import axios from "axios";
import { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import SelectUser from "./SelectUser";
import CreateUser from "./CreateUser";
import { User } from "../types";
import { useAppDispatch, useAppSelector } from "../slices/hooks";
import { setUsers } from "../slices/userSlice";

const Users: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(
    (state) => state.userReducer.currentUserID,
  );

  // todo: move this into a thunk so it can be called as a side-effect
  const fetchUsers = async () => {
    // @todo: make server api client
    try {
      const users = await axios.get<{ users: User[] }>(
        `http://localhost:8080/users`,
      );
      dispatch(setUsers(users.data.users));
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
        <SelectUser />
        <CreateUser refreshUsers={fetchUsers} />
      </Card>
    </div>
  );
};

export default Users;
