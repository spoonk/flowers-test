import { FC, useEffect, useState } from "react";
import Users from "./Users";
import Habits from "./Habits";
import DummyGarden from "./DummyGarden";
import axios from "axios";
import { Garden } from "../types";
import { toast } from "react-toastify";
import { useAppSelector } from "../slices/hooks";
import { getGarden } from "../api/garden.api";

const AdminPage: FC<{}> = () => {
  const [garden, setGarden] = useState<Garden | undefined>(undefined);
  const currentUserId = useAppSelector(
    (state) => state.userReducer.currentUserID,
  );

  useEffect(() => {
    if (currentUserId) fetchGarden();
  }, [currentUserId]);

  const fetchGarden = async () => {
    if (!currentUserId) return;

    const garden = await getGarden({ userId: currentUserId });
    if (garden) setGarden(garden);
  };

  return (
    <div className="admin-page">
      <Users />
      <Habits fetchGarden={fetchGarden} />
      {currentUserId && (
        <DummyGarden garden={garden} fetchGarden={() => fetchGarden()} />
      )}
    </div>
  );
};

export default AdminPage;
