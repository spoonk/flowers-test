import { FC } from "react";

function stringToHash(str: string) {
  console.log(str);
  let hash = 0;

  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}

const colors = ["red", "blue", "green", "purple"];

const resolveFlowerModelFromId = (flowerId: string) => {
  return "https://icons.veryicon.com/png/o/business/gmh-icon-library/flower-27.png";
};

const resolveFlowerColorFromId = (flowerId: string) => {
  const hash = stringToHash(flowerId);
  const idx = Math.abs(hash % colors.length);

  console.log(idx, hash);
  return colors[idx];
};

const Flower: FC<{ flowerId: string }> = ({ flowerId }) => {
  return (
    <div className="flower">
      <img
        className={`flower-img ${resolveFlowerColorFromId(flowerId)}`}
        alt="flower"
        src={resolveFlowerModelFromId(flowerId)}
      />
    </div>
  );
};

export default Flower;
