import { FC, useEffect, useState } from "react";
import Users from "./Users";

const AdminPage: FC<{}> = () => {
  return (
    <div className="admin-page">
      <Users />
    </div>
  );
};

export default AdminPage;
