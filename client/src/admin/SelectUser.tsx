import { FC } from "react";
import { Dropdown } from "react-bootstrap";

// todo: make a global types file
interface User {
  username: string;
  email: string;
  password: string;
  accountCreated: string;
  lastLoginTime: string;
  timeZone: string;
  userId: string;
  _id: string;
}

interface SelectUserProps {
  setUserCB: (newUserId: string) => void;
  users: User[];
}

const SelectUser: FC<SelectUserProps> = ({ setUserCB, users }) => {
  const onItemClicked = (userId: string) => {
    setUserCB(userId);
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
