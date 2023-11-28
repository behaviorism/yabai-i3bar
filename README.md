# Yabai i3bar

[Übersicht](https://github.com/felixhageloh/uebersicht) widget of [i3bar](https://i3wm.org/i3bar/manpage.html) (i3 status bar and tabs bar) for [yabai](https://github.com/koekeishiya/yabai).

## Installation

Clone to widgets repository.

```bash
git clone https://github.com/behaviorism/yabai-i3bar $HOME/Library/Application\ Support/Übersicht/widgets/yabai-i3bar
```

## Usage

### Send Widget to Background

`Press on the Übersicht icon > yabai-i3bar-index-jsx > Send to background`

This will prevent the tabs bar from covering windows. The tabs bar is still visibile even when not not in stacked mode in order to not leave an empty space when re-rendering the widget after switching to a stacked workspace.

## Configuration

### Edit Configuration

To edit the settings create the file `~/.yabai-i3barrc`. The default settings are:

```json
{
  "tabs-bar-padding": 17,
  "status-bar-padding": 23,
  "tray": {
    "disk": {
      "enabled": false,
      "path": "/"
    },
    "battery": {
      "enabled": false,
      "min_threshold": 10
    },
    "cpu_usage": {
      "enabled": false,
      "max_threshold": 75
    },
    "time": {
      "enabled": true
    }
  }
}
```

**You don't NEED to create the configuration file. Default settings are applied in case of the configuration file or properties missing**.

### Tray Modules

All desired modules have to be included in the configuration file and enabled. **By default, only time is enabled.** The order order in which they will be shown on the tray will be based on the order they are placed in the configuration file.

<hr>

**Settings are loaded on start-up. To refresh the settings** `Press on the Übersicht icon > Refresh All Widgets`
