# Set padding for all workspaces on startup
# Return settings that will be set in the widget context

yabai_path=$1

if ! pgrep -x yabai > /dev/null; then
	echo "$yabai_path isn't running"
	exit 0
fi

padding=$(cat ~/.yabai-i3barrc | jq '."tabs-bar-padding" // 19')

$yabai_path -m config top_padding $padding

for space in $($yabai_path -m query --spaces | jq 'map(.index) | .[]')
do
	$yabai_path -m config --space $space top_padding $padding
done

cat ~/.yabai-i3barrc
