import { ObjectId } from "mongoose";
import Garden from "../../../models/garden";
import User from "../../../models/user";

const addFlowerToGarden = async (flowerId: ObjectId, userId: string) => {
  // initialize garden if not exists
  const garden = await getOrCreateGarden(userId);
  garden?.flowers.push({
    flowerId,
    position: {
      x: 0.0,
      y: 0.0,
      z: 0.0,
    },
  });
  await garden?.save();
  return garden?.id;
};

// @todo: should separate into two functions
const getOrCreateGarden = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) return undefined;

  const gardenId = user.garden;
  if (gardenId) return await Garden.findById(gardenId);

  const garden = new Garden({ user: userId });
  await garden.save(); // first save, just for debugging
  user.garden = garden.id;
  await user.save();
  return garden;
};

export { addFlowerToGarden };
