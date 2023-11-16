//@todo: figure out how to make models a package (@ syntax)
import User from "../../../models/user";
import moment from "moment";

interface addUserParams {
  username: string;
  email: string;
  password: string;
}

const validateAddUserParams = ({
  username,
  email,
  password,
}: addUserParams | any): addUserParams | undefined => {
  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return undefined;
  }
  return { username, email, password };
};

const addUser = async (
  params: addUserParams | any,
): Promise<{ newUserId: string | undefined }> => {
  const validatedParams = validateAddUserParams(params);
  if (!validatedParams) return { newUserId: undefined };
  const { username, email, password } = validatedParams;

  const time = moment().toString();

  const newUser = new User({
    username,
    email,
    password,
    lastLoginTime: time,
    timeZone: "udt",
  });

  await newUser.save();
  return { newUserId: newUser.id };
};

const getUsers = async () => {
  const users = await User.find();
  return { users };
};

export { addUser, getUsers };
