app_id=$1
yabai_path=$2
port=$3

EVENT_TYPES=(
	application_front_switched
	application_visible
	application_hidden
	window_minimized
	window_deminimized
	window_created
	window_destroyed
	window_focused
	window_resized
	window_title_changed
	space_created
	space_destroyed
	space_changed
	display_added
	display_removed
	display_changed
)

for event in ${EVENT_TYPES[@]}; do
    $yabai_path -m signal --add event=$event action="curl -d 'refresh' http://localhost:${port}" label="Refresh ${app_id} on ${event}"
done

