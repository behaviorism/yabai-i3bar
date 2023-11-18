// eslint-disable-next-line import/no-unresolved
import { css, run } from "uebersicht";

const WIDGET_ID = "yabai-i3-tabbed-mode-index-jsx";
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

  const activeWindows = windows.filter(
    (window) => !window["is-minimized"] && !window["is-hidden"]
  );

  const isStacked = space.type === "stack";

  if (!isStacked) {
    return (
      <div className={statusBar}>
        <div className={focusedTab}>{activeWindows[0]?.title}</div>
      </div>
    );
  }

  const sortedWindows = activeWindows.sort(
    (a, b) => a["stack-index"] - b["stack-index"]
  );

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
