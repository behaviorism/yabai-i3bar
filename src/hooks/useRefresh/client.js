// eslint-disable-next-line import/no-unresolved
import { run } from "uebersicht";
import { NODE_PATH, WIDGET, PORT } from "../../constants";

var refreshHandler = () => {};

export const setRefresherHandler = (_refreshHandler) => {
  refreshHandler = _refreshHandler;
};

var ws;

export const init = async () => {
  if (ws) {
    return;
  }

  try {
    console.log(
      await run(`${NODE_PATH} ${WIDGET}/src/hooks/useRefresh/server.js &`)
    );
  } catch (error) {
    console.log(error);
  }

  ws = new WebSocket(`ws://localhost:${PORT}`);

  ws.onmessage = (event) => {
    if (event.data === "refresh") {
      refreshHandler();
    }
  };
};
