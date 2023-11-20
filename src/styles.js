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
  padding: "1px 0",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const focusedTab = css({
  border: "solid 1px #4c7899",
  background: "#285577",
  color: "#ffffff",
  width: "100%",
  padding: "1px 0",
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
});

export const workspaces = css({
  display: "flex",
});

export const inactiveWorkspace = css({
  border: "solid 1px #333333",
  background: "#222222",
  color: "#888888",
  padding: "3px 4px",
  margin: "1px 1px 1px 0px",
});

export const activeWorkspace = css({
  border: "solid 1px #4c7899",
  background: "#285577",
  color: "#ffffff",
  padding: "3px 4px",
  margin: "1px 1px 1px 0px",
});
