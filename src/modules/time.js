import { ItemLevel } from "../hooks/useTray.jsx";

const getTime = () => {
  const date = new Date();

  return {
    level: ItemLevel.Normal,
    text: new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
  };
};

export default getTime;
