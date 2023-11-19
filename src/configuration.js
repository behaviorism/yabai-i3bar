// eslint-disable-next-line import/no-unresolved
import { run } from "uebersicht";
import { YABAI_PATH, WIDGET, WIDGET_ID } from "./constants";

// Default configuration
export let configuration = { "tabs-bar-padding": 19 };

// Set padding and get configuration
export const initializeConfiguration = async () => {
  const rawConfiguration = await run(
    `sh ${WIDGET}/scripts/init.sh ${YABAI_PATH}`
  );
  let parsedConfiguration = {};

  try {
    parsedConfiguration = JSON.parse(rawConfiguration);
  } catch (error) {}

  configuration = { ...configuration, ...parsedConfiguration };

  run(
    `osascript -e 'tell application id "tracesOf.Uebersicht" to refresh widget id "${WIDGET_ID}"'`
  );
};
