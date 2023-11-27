// eslint-disable-next-line import/no-unresolved
import { run } from "uebersicht";
import { configuration } from "../configuration.js";
import { ItemLevel } from "../hooks/useTray.jsx";

const getDisk = async () => {
  return {
    level: ItemLevel.Normal,
    text: await run(
      `df -h ${configuration.tray.disk.path} | awk 'NR==2{print $4}'`
    ),
  };
};

export default getDisk;
