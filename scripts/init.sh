# Set padding for all workspaces on startup
# Return settings that will be set in the widget context

yabai_path=$1

if ! pgrep -x yabai > /dev/null; then
	echo "$yabai_path isn't running"
	exit 0
fi

paddings=($(cat ~/.yabai-i3barrc | jq -r '."tabs-bar-padding"=(."tabs-bar-padding" // 19) | ."status-bar-padding"=(."status-bar-padding" // 23)  | [."tabs-bar-padding", ."status-bar-padding"] | @sh'))

$yabai_path -m config top_padding ${paddings[0]}
$yabai_path -m config bottom_padding ${paddings[1]}

for space in $($yabai_path -m query --spaces | jq 'map(.index) | .[]')
do
	$yabai_path -m config --space $space top_padding ${paddings[0]}
	$yabai_path -m config --space $space bottom_padding ${paddings[1]}
done

cat ~/.yabai-i3barrc
