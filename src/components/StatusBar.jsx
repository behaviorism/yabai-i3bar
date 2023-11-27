// eslint-disable-next-line import/no-unresolved
import { React } from "uebersicht";
import {
  statusBar,
  tray,
  separator,
  workspaces,
  activeWorkspace,
  inactiveWorkspace,
  itemLevelClass,
} from "../styles.js";
import useTray from "../hooks/useTray.jsx";

const StatusBar = ({ spaces }) => {
  const trayItems = useTray();

  return (
    <div className={statusBar}>
      <div className={workspaces}>
        {spaces.map((space, i) => (
          <div
            key={i}
            className={space["has-focus"] ? activeWorkspace : inactiveWorkspace}
          >
            {space.index}
          </div>
        ))}
      </div>
      <div className={tray}>
        {trayItems.map(({ level, text }, i) => (
          <React.Fragment key={i}>
            <div className={itemLevelClass(level)}>{text}</div>
            <div className={separator}>
              {trayItems.length - 1 !== i ? " | " : ""}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;
