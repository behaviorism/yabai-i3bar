// eslint-disable-next-line import/no-unresolved
import { run } from "uebersicht";
import { configuration, initializeConfiguration } from "./src/configuration";
import { tabsBar, unfocusedTab, focusedTab } from "./src/styles";
import { YABAI_PATH, WIDGET, WIDGET_ID } from "./src/constants";

export const refreshFrequency = false;

export const command = `sh ${WIDGET}/scripts/command.sh ${WIDGET_ID} ${YABAI_PATH} ${configuration["tabs-bar-padding"]}`;

export const init = initializeConfiguration;

export const render = ({ output }) => {
  const { windows, space } = JSON.parse(output);

  const isStacked = space.type === "stack";

  // Even though were supposed to cover the tabs bar when layout isn't stacked,
  // we still keep it rendererd so that when switching spaces the bar space isn't empty
  // while it re-renders
  if (!isStacked) {
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
