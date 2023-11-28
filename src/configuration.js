// eslint-disable-next-line import/no-unresolved
import { run } from "uebersicht";
import { YABAI_PATH, WIDGET, WIDGET_ID } from "./constants";

export let configuration = {};

// Default configuration
export const DEFAULT_CONFIGURATION = {
  "tabs-bar-padding": 17,
  "status-bar-padding": 23,
  tray: {
    disk: {
      enabled: false,
      path: "/",
    },
    battery: {
      enabled: false,
      min_threshold: 10,
    },
    cpu_usage: {
      enabled: false,
      max_threshold: 75,
    },
    time: {
      enabled: true,
    },
  },
};

// Set padding and get configuration
export const initializeConfiguration = async () => {
  const rawConfiguration = await run(
    `sh ${WIDGET}/scripts/init.sh ${YABAI_PATH} '${JSON.stringify(
      DEFAULT_CONFIGURATION
    )}'`
  );

  configuration = mergeDeep(
    DEFAULT_CONFIGURATION,
    JSON.parse(rawConfiguration)
  );

  run(
    `osascript -e 'tell application id "tracesOf.Uebersicht" to refresh widget id "${WIDGET_ID}"'`
  );

  return configuration;
};

const isObject = (item) => {
  return item && typeof item === "object" && !Array.isArray(item);
};

const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, {
            [key]: {},
          });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key],
        });
      }
    }
  }
  return mergeDeep(target, ...sources);
};
