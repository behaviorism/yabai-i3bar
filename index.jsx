// eslint-disable-next-line import/no-unresolved
import { css, run } from "uebersicht";

const WIDGET_ID = "yabai-i3bar-index-jsx";
const YABAI_PATH = "/usr/local/bin/yabai";

export const command = `sh ${WIDGET_ID.replace(
  "-index-jsx",
  ""
)}/command.sh ${WIDGET_ID} ${YABAI_PATH}`;
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

export const render = ({ output }) => {
  const { windows, space } = JSON.parse(output);

  const isStacked = space.type === "stack";

  // Even though were supposed to cover the tabs bar when layout isn't stacked,
  // we still keep it rendererd so that when switching spaces the bar space isn't empty
  // while it re-renders

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
