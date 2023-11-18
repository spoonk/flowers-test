import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

// todo: make a global types file
interface User {
  username: string;
  email: string;
  password: string;
  accountCreated: string;
  lastLoginTime: string;
  timeZone: string;
  // habits: ObjectId[];
  // garden?: ObjectId;
}

// interface SelectUserProps {
//   setUserCB: (newUserId: string) => void;
// }

const CreateUser: FC<{}> = () => {
  const createUser = async () => {
    return;
  };

  // todo: form data for new user
  return (
    <div className="create-user">
      <Button onClick={() => createUser}></Button>
    </div>
  );
};

export default CreateUser;
