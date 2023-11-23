import { FC, useEffect, useState } from "react";
import Users from "./Users";
import Habits from "./Habits";
import DummyGarden from "./DummyGarden";
import axios from "axios";
import { Garden } from "../types";
import { toast } from "react-toastify";
import { useAppSelector } from "../slices/hooks";

const AdminPage: FC<{}> = () => {
  const [garden, setGarden] = useState<Garden | undefined>(undefined);
  const currentUserId = useAppSelector(
    (state) => state.userReducer.currentUserID,
  );

  useEffect(() => {
    if (currentUserId) {
      fetchGarden();
    }
  }, [currentUserId]);

  const fetchGarden = async () => {
    try {
      const garden = await axios.get<{ garden: Garden }>(
        "http://localhost:8080/garden",
        {
          params: { userId: currentUserId },
        },
      );
      console.log(garden);
      toast.success("fetched garden");
      setGarden(garden.data.garden);
    } catch (error) {
      console.log(error);
      toast.error("failed to load garden");
    }
  };

  return (
    <div className="admin-page">
      <Users />
      <Habits fetchGarden={fetchGarden} />
      {currentUserId && (
        <DummyGarden garden={garden} fetchGarden={() => fetchGarden} />
      )}
    </div>
  );
};

export default AdminPage;
