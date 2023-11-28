// eslint-disable-next-line import/no-unresolved
import { run } from "uebersicht";
import { configuration } from "../configuration.js";
import { ItemLevel } from "../hooks/useTray.jsx";

const getCpuUsage = async () => {
  const [user, system] = (
    await run(
      'info=$(top -l 1 -s 0 | grep -E "^CPU"); user=$(echo $info | cut -c12- | cut -d% -f1); system=$(echo $info | cut -c12- | cut -d% -f2 | cut -c8- ); echo "$user\n$system"'
    )
  )
    .split("\n")
    .map(parseFloat);

  const usage = user + system;

  let level = ItemLevel.Normal;

  if (usage >= configuration.tray.cpu_usage.max_threshold) {
    level = ItemLevel.Bad;
  }

  return { level, text: `CPU: ${usage.toFixed(2)}%` };
};

export default getCpuUsage;
