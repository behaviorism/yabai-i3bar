app_id=$1
yabai_path=$2

if ! pgrep -x yabai > /dev/null; then
	echo "$yabai_path isn't running"
	exit 0
fi

spaces=$($yabai_path -m query --spaces)
windows=$($yabai_path -m query --windows | sed 's/\\.//g; s/\n//g')

$yabai_path -m signal --add event=window_focused action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"${app_id}\"'" label="Refres i3 bar when focused application changes"
$yabai_path -m signal --add event=window_destroyed action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"${app_id}\"'" label="Refresh i3 bar when an application window is closed"
$yabai_path -m signal --add event=window_created action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"${app_id}\"'" label="Refresh i3 bar when an application window is created"
$yabai_path -m signal --add event=window_title_changed action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"${app_id}\"'" label="Refresh i3 bar when current window title changes"
$yabai_path -m signal --add event=space_changed action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"${app_id}\"'" label="Refresh i3 bar on space change"
$yabai_path -m signal --add event=display_changed action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"${app_id}\"'" label="Refresh i3 bar on display focus change"

echo $(cat <<-EOF
	{
		"spaces": $spaces,
		"windows": $windows
	}
EOF
)
