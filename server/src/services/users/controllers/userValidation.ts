import { warn } from "console";

export interface addUserParams {
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

export { validateAddUserParams };
