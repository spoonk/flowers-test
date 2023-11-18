import { FC, useState } from "react";
import Users from "./Users";
import Habits from "./Habits";

const AdminPage: FC<{}> = () => {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(
    undefined,
  );

  return (
    <div className="admin-page">
      <Users setUserCB={setCurrentUserId} currentUserId={currentUserId} />
      <Habits userId={currentUserId} />
    </div>
  );
};

export default AdminPage;
