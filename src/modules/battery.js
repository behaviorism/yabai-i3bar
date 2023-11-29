// eslint-disable-next-line import/no-unresolved
import { run } from "uebersicht";
import { configuration } from "../configuration.js";
import { ItemLevel } from "../hooks/useTray.jsx";

const BatterySource = {
  Charger: "AC Power",
  Battery: "Battery Power",
};

const getBattery = async () => {
  const [percentage, source] = (
    await run(
      `battery=$(pmset -g batt); percentage=$(echo "$battery" | grep -Eo "\\d+%" | cut -d% -f1); source=$(echo "$battery" | head -n 1 | cut -c19- | rev | cut -c 2- | rev); echo "$percentage\n$source"`
    )
  ).split("\n");

  let sourceLabel;

  switch (source) {
    case BatterySource.Charger:
      sourceLabel = "CHR ";
      break;
    case BatterySource.Battery:
      sourceLabel = "BAT ";
      break;
    default:
      sourceLabel = "? ";
      break;
  }

  let level = ItemLevel.Good;

  if (parseInt(percentage) <= configuration.tray.battery.min_threshold) {
    level = ItemLevel.Bad;
  }

  return { level, text: `${sourceLabel}${percentage}%` };
};

export default getBattery;
