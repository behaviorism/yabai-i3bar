// eslint-disable-next-line import/no-unresolved
import { React } from "uebersicht";
import { configuration } from "../configuration.js";
import getBattery from "../modules/battery.js";
import getDisk from "../modules/disk.js";

export const ItemLevel = {
  Normal: 0,
  Good: 1,
  Bad: 2,
};

const modulesToFunctions = Object.entries({
  battery: getBattery,
  disk: getDisk,
});

const useTray = () => {
  const [tray, setTray] = React.useState([]);

  const handleItems = () => {
    const newTray = [];

    for (let [module, fn] of modulesToFunctions) {
      if (configuration.tray[module].enabled) {
        newTray.unshift(fn());
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
