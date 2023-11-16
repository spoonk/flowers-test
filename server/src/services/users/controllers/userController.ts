//@todo: figure out how to make models a package (@ syntax)
import User from "../../../models/user";

interface addUserParams {
  username: string;
  email: string;
  coins: number;
}

const addUser = async ({ username, email, coins }: addUserParams) => {
  const newUser = new User({ username, email, coins });
  await newUser.save();
  return { newUserId: newUser.id };
};

const getUsers = async () => {
  const users = await User.find();
  return { users };
};

// not used to this syntax :/
export { addUser, getUsers };
