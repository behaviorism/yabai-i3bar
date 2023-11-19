// eslint-disable-next-line import/no-unresolved
import { css, run, React } from "uebersicht";

const WIDGET = "yabai-i3bar";
const WIDGET_ID = `${WIDGET}-index-jsx`;
const YABAI_PATH = "/usr/local/bin/yabai";

export const refreshFrequency = false;

const statusBar = css({
  userSelect: "none",
  position: "fixed",
  display: "flex",
  width: "100%",
  fontFamily: "Iosevka",
  fontSize: "10px",
});

const unfocusedTab = css({
  border: "solid 1px #333333",
  background: "#222222",
  color: "#888888",
  width: "100%",
  padding: "2px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const focusedTab = css({
  border: "solid 1px #4c7899",
  background: "#285577",
  color: "#ffffff",
  width: "100%",
  padding: "2px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

// Default configuration
let configuration = {
  "tabs-bar-padding": 19,
};

// Set padding and get configuration
export const init = () =>
  run(`sh ${WIDGET}/scripts/init.sh ${YABAI_PATH}`).then((rawConfiguration) => {
    let parsedConfiguration = {};

    try {
      parsedConfiguration = JSON.parse(rawConfiguration);
    } catch (error) {}

    configuration = { ...configuration, ...parsedConfiguration };

    run(
      `osascript -e 'tell application id "tracesOf.Uebersicht" to refresh widget id "${WIDGET_ID}"'`
    );
  });

export const command = `sh ${WIDGET}/scripts/command.sh ${WIDGET_ID} ${YABAI_PATH} ${configuration["tabs-bar-padding"]}`;

export const render = ({ output }) => {
  const { windows, space } = JSON.parse(output);

  const isStacked = space.type === "stack";

  // Even though were supposed to cover the tabs bar when layout isn't stacked,
  // we still keep it rendererd so that when switching spaces the bar space isn't empty
  // while it re-renders
  1199;
  if (!isStacked) {
    return (
      <div className={statusBar}>
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
    <div className={statusBar}>
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
