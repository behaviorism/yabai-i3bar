// eslint-disable-next-line import/no-unresolved
import { css } from "uebersicht";

export const tabsBar = css({
  userSelect: "none",
  position: "fixed",
  display: "flex",
  width: "100%",
  fontFamily: "Iosevka",
  fontSize: "10px",
});

export const unfocusedTab = css({
  border: "solid 1px #333333",
  background: "#222222",
  color: "#888888",
  width: "100%",
  padding: "2px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const focusedTab = css({
  border: "solid 1px #4c7899",
  background: "#285577",
  color: "#ffffff",
  width: "100%",
  padding: "2px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const statusBar = css({
  userSelect: "none",
  position: "fixed",
  display: "flex",
  bottom: "0",
  justifyContent: "space-between",
  width: "100%",
  fontFamily: "Iosevka",
  fontSize: "10px",
  background: "#000000",
  padding: "2px 0",
});

export const workspaces = css({
  display: "flex",
  marginLeft: "4px",
});

export const inactiveWorkspace = css({
  border: "solid 1px #333333",
  background: "#222222",
  color: "#888888",
  marginRight: "1px",
  padding: "3px 4px",
});

export const activeWorkspace = css({
  border: "solid 1px #4c7899",
  background: "#285577",
  color: "#ffffff",
  marginRight: "1px",
  padding: "3px 4px",
});
