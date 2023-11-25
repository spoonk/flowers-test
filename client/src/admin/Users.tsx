import { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import SelectUser from "./SelectUser";
import CreateUser from "./CreateUser";
import { useAppDispatch, useAppSelector } from "../slices/hooks";
import { setUsers } from "../slices/userSlice";
import { getUsers } from "../api/users.api";
import { toast } from "react-toastify";

const Users: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(
    (state) => state.userReducer.currentUserID,
  );

  // todo: move this into a thunk so it can be called as a side-effect
  const fetchUsers = async () => {
    const users = await getUsers();
    if (users) {
      dispatch(setUsers(users));
    } else {
      toast.error("fetch users failed");
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
