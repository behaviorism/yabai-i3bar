import {
  statusBar,
  workspaces,
  activeWorkspace,
  inactiveWorkspace,
} from "../styles";

const StatusBar = ({ spaces }) => {
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
      <div style={{ marginRight: "4px" }}></div>
    </div>
  );
};

export default StatusBar;
