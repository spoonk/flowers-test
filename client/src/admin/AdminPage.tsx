import { FC, useEffect, useState } from "react";
import Users from "./Users";
import Habits from "./Habits";
import DummyGarden from "./DummyGarden";
import axios from "axios";
import { Garden } from "../types";
import { toast } from "react-toastify";

const AdminPage: FC<{}> = () => {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(
    undefined,
  );

  // @todo: aaa need redux
  const [garden, setGarden] = useState<Garden | undefined>(undefined);

  useEffect(() => {
    fetchGarden();
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
      <Users setUserCB={setCurrentUserId} currentUserId={currentUserId} />
      <Habits userId={currentUserId} fetchGarden={fetchGarden} />
      {currentUserId && (
        <DummyGarden garden={garden} fetchGarden={() => fetchGarden} />
      )}
    </div>
  );
};

export default AdminPage;
