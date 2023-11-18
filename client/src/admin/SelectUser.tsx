import axios from "axios";
import { FC, useEffect, useState } from "react";
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
  // habits: ObjectId[];
  // garden?: ObjectId;
}

interface SelectUserProps {
  setUserCB: (newUserId: string) => void;
}

const SelectUser: FC<SelectUserProps> = ({ setUserCB }) => {
  const [userIds, setUserIds] = useState<User[]>([]);
  const fetchUserIds = async () => {
    // @todo: make server api client
    // @todo: dotenv for server route
    try {
      const users = await axios.get<{ users: User[] }>(
        `http://localhost:8080/users`,
      );
      console.log(users);
      setUserIds(users.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserIds();
  }, []);

  return (
    <div className="admin-page">
      <Dropdown>
        <Dropdown.Toggle variant="success">Dropdown Button</Dropdown.Toggle>
        <Dropdown.Menu>
          {userIds.map((userId) => {
            return <Dropdown.Item>{userId.username}</Dropdown.Item>;
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectUser;
