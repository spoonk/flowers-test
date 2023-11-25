import axios from "axios";
import { User } from "../types";

const getUsers = async () => {
  try {
    const users = await axios.get<{ users: User[] }>(
      `http://localhost:8080/users`,
    );
    return users.data.users;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const addUser = async ({
  username,
  password,
  email,
}: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const data = await axios.post<{ newUserId: string }>(
      `http://localhost:8080/addUser`,
      {
        username,
        password,
        email,
      },
    );
    return data.data.newUserId;
  } catch (error) {
    return undefined;
  }
};

export { addUser, getUsers };
