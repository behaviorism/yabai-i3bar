// eslint-disable-next-line import/no-unresolved
import { run } from "uebersicht";
import { YABAI_PATH, WIDGET, WIDGET_ID } from "./constants";

export let configuration = {};

// Default configuration
const DEFAULT_CONFIGURATION = {
  "tabs-bar-padding": 17,
  "status-bar-padding": 23,
};

// Set padding and get configuration
export const initializeConfiguration = async () => {
  const rawConfiguration = await run(
    `sh ${WIDGET}/scripts/init.sh ${YABAI_PATH} '${JSON.stringify(
      DEFAULT_CONFIGURATION
    )}'`
  );

  configuration = JSON.parse(rawConfiguration);

  console.log(configuration);

  run(
    `osascript -e 'tell application id "tracesOf.Uebersicht" to refresh widget id "${WIDGET_ID}"'`
  );
};
