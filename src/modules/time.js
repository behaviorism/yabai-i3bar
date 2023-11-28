import { ItemLevel } from "../hooks/useTray.jsx";

const getTime = () => {
  return {
    level: ItemLevel.Normal,
    text: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
};

export default getTime;
