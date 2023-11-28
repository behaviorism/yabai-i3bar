// eslint-disable-next-line import/no-unresolved
import { React } from "uebersicht";
import { configuration } from "../configuration.js";
import getBattery from "../modules/battery.js";
import getDisk from "../modules/disk.js";
import getCpuUsage from "../modules/cpu_usage.js";
import getTime from "../modules/time.js";

export const ItemLevel = {
  Normal: 0,
  Good: 1,
  Bad: 2,
};

const modulesToFunctions = {
  battery: getBattery,
  disk: getDisk,
  cpu_usage: getCpuUsage,
  time: getTime,
};

const useTray = () => {
  const [tray, setTray] = React.useState([]);

  const handleItems = () => {
    const newTray = [];

    for (let module of Object.keys(configuration.tray)) {
      let fn = modulesToFunctions[module];

      if (fn && configuration.tray[module].enabled) {
        newTray.push(fn());
      }
    }

    Promise.all(newTray).then(setTray);
  };

  React.useEffect(() => {
    handleItems();
    const interval = setInterval(handleItems, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  return tray;
};

export default useTray;
