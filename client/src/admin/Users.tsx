import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import SelectUser from "./SelectUser";

const Users: FC<{}> = () => {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(
    undefined,
  );

  return (
    <div className="users">
      <SelectUser setUserCB={setCurrentUserId} />
    </div>
  );
};

export default Users;
