// eslint-disable-next-line import/no-unresolved
import { run } from "uebersicht";
import { YABAI_PATH, JQ_PATH, WIDGET, WIDGET_ID } from "./constants";

// Default configuration
export const DEFAULT_CONFIGURATION = {
  "tabs-bar-padding": 17,
  "status-bar-padding": 23,
  tray: {
    disk: {
      enabled: false,
      path: "/",
    },
    cpu_usage: {
      enabled: false,
      max_threshold: 75,
    },
    battery: {
      enabled: false,
      min_threshold: 10,
    },
    time: {
      enabled: true,
    },
  },
};

export let configuration = DEFAULT_CONFIGURATION;

// Set padding and get configuration
export const initializeConfiguration = async () => {
  const rawConfiguration = await run(
    `sh ${WIDGET}/scripts/init.sh ${YABAI_PATH} ${JQ_PATH} '${JSON.stringify(
      DEFAULT_CONFIGURATION
    )}'`
  );

  configuration = mergeDeep(
    DEFAULT_CONFIGURATION,
    JSON.parse(rawConfiguration)
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
