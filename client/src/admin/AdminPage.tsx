import { FC, useEffect } from "react";
import Users from "./Users";
import Habits from "./Habits";
import { useAppDispatch, useAppSelector } from "../slices/hooks";
import { setGarden } from "../slices/gardenSlice";
import { getGarden } from "../api/garden.api";
const AdminPage: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(
    (state) => state.userReducer.currentUserID,
  );

  useEffect(() => {
    if (currentUserId) fetchGarden();
  }, [currentUserId]);

  const fetchGarden = async () => {
    if (!currentUserId) return;

    const garden = await getGarden({ userId: currentUserId });
    if (garden) dispatch(setGarden(garden));
  };

  return (
    <div className="admin-page">
      <Users />
      <Habits fetchGarden={fetchGarden} />
    </div>
  );
};

export default AdminPage;
