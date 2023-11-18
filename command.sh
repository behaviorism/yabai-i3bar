app_id=$1
yabai_path=$2

if ! pgrep -x yabai > /dev/null; then
	echo "$yabai_path isn't running"
	exit 0
fi

windows=$($yabai_path -m query --windows --space | sed 's/\\.//g; s/\n//g')
space=$($yabai_path -m query --spaces --space)

EVENT_TYPES=(
	application_front_switched
	application_visible
	application_hidden
	window_minimized
	window_deminimized
	window_created
	window_destroyed
	window_focused
	window_title_changed
	space_created
	space_destroyed
	space_changed
	display_added
	display_removed
	display_changed
)

for event in ${EVENT_TYPES[@]}; do
    $yabai_path -m signal --add event=$event action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"${app_id}\"'" label="Refresh ${app_id} on ${event}"
done

echo $(cat <<-EOF
{
	"windows": $windows,
	"space": $space
}
EOF
)
