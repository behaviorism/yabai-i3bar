// eslint-disable-next-line import/no-unresolved
import { run } from "uebersicht";
import { tabsBar, focusedTab, unfocusedTab } from "../styles.js";
import { YABAI_PATH } from "../constants.js";

const TabsBar = ({ windows, space }) => {
  // Even though were supposed to cover the tabs bar when layout isn't stacked,
  // we still keep it rendererd so that when switching spaces the bar space isn't empty
  // while it re-renders
  if (space.type !== "stack") {
    return (
      <div className={tabsBar}>
        <div className={unfocusedTab}>
          <div style={{ visibility: "hidden" }}>placeholder</div>
        </div>
      </div>
    );
  }

  const sortedWindows = windows
    .filter((window) => !window["is-minimized"] && !window["is-hidden"])
    .sort((a, b) => a["stack-index"] - b["stack-index"]);

  return (
    <div className={tabsBar}>
      {sortedWindows.map((window, index) => {
        return (
          <div
            onClick={() => {
              run(`${YABAI_PATH} -m window --focus ${window.id}`);
            }}
            key={index}
            className={window["has-focus"] ? focusedTab : unfocusedTab}
          >
            {window.title}
          </div>
        );
      })}
    </div>
  );
};

export default TabsBar;
