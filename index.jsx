// eslint-disable-next-line import/no-unresolved
import { css, run } from "uebersicht";

const APP_ID = "i3-tabs-index-jsx";
const YABAI_PATH = "/usr/local/bin/yabai";

export const command = `sh i3-tabs/command.sh ${APP_ID} ${YABAI_PATH}`;
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
  const { windows, spaces } = JSON.parse(output);

  return (
    <div className={statusBar}>
      {spaces.map((space, index) => {
        const currentWindow = windows.find(
          (window) => window.space === space.index
        );

        return (
          <div
            onClick={() => {
              run(`${YABAI_PATH} -m space --focus ${index + 1}`);
            }}
            key={index}
            className={space["has-focus"] ? focusedTab : unfocusedTab}
          >
            {currentWindow?.title}
          </div>
        );
      })}
    </div>
  );
};
