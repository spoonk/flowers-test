import { FC } from "react";
import { Garden } from "../types";

// @todo: refresh garden upon habit completion, for now do it w a button
const DummyGarden: FC<{
  garden: Garden | undefined;
}> = ({ garden }) => {
  return (
    <div className="dummy-garden">
      {garden?.flowers.map((flower) => {
        return (
          <img
            className="dummy-flower"
            src="https://cdn2.vectorstock.com/i/1000x1000/16/71/pixel-flowers-art-cartoon-retro-game-style-vector-19131671.jpg"
          />
        );
      })}
    </div>
  );
};

export default DummyGarden;
