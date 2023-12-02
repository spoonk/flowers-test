import { FC } from "react";
import { useAppSelector } from "../../slices/hooks";
import Flower from "../../components/Flower/Flower";

/**
 * responsible for rendering flowers
 * - positioning them
 */
const GardenView: FC<{}> = () => {
  const garden = useAppSelector((state) => state.gardenReducer.garden);

  return (
    <div className="garden-view">
      <div className="flowers-container">
        {/* todo: positioning */}
        {garden &&
          garden.flowers.map((flower) => <Flower flowerId={flower.flowerId} />)}
      </div>
    </div>
  );
};

export default GardenView;
