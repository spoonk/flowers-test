import { FC } from "react";
import { Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../slices/hooks";
import { setCurrentUserID } from "../slices/userSlice";
import { setGarden } from "../slices/gardenSlice";

const SelectUser: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userReducer.users);
  const onItemClicked = (userId: string) => {
    dispatch(setCurrentUserID(userId));
    dispatch(setGarden(undefined));
  };

  return (
    <div className="admin-page">
      <Dropdown>
        <Dropdown.Toggle variant="success">users</Dropdown.Toggle>
        <Dropdown.Menu>
          {users.map((user) => {
            return (
              <Dropdown.Item onClick={() => onItemClicked(user._id)}>
                {user.username}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectUser;
