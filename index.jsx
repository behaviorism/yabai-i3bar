// eslint-disable-next-line import/no-unresolved
import { React } from "uebersicht";
import {
  DEFAULT_CONFIGURATION,
  initializeConfiguration,
} from "./src/configuration";
import { YABAI_PATH, WIDGET, WIDGET_ID } from "./src/constants";
import TabsBar from "./src/components/TabsBar.jsx";
import StatusBar from "./src/components/StatusBar.jsx";

export const refreshFrequency = false;

export var command = `sh ${WIDGET}/scripts/command.sh ${WIDGET_ID} ${YABAI_PATH} ${DEFAULT_CONFIGURATION["tabs-bar-padding"]}`;

export const init = async () => {
  const configuration = await initializeConfiguration();
  command = `sh ${WIDGET}/scripts/command.sh ${WIDGET_ID} ${YABAI_PATH} ${configuration["tabs-bar-padding"]}`;
};

export const render = ({ output }) => {
  const { windows, spaces } = JSON.parse(output);

  const activeSpace = spaces.find((space) => space["has-focus"]);

  return (
    <>
      <TabsBar windows={windows} space={activeSpace} />
      <StatusBar spaces={spaces} />
    </>
  );
};
