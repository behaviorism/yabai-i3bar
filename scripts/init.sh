# Set padding for all workspaces on startup
# Return settings that will be set in the widget context

yabai_path=$1
default_config=$2

if ! pgrep -x yabai > /dev/null; then
	echo "$yabai_path isn't running"
	exit 0
fi

file_config="$(cat ~/.yabai-i3barrc)"

merged_config=$(jq -n --argjson var1 "$default_config" --argjson var2 "$file_config" '$var1 + ($var2 // {})')

paddings=($(echo "$merged_config" | jq -r '[."tabs-bar-padding", ."status-bar-padding"] | @sh'))

$yabai_path -m config top_padding ${paddings[0]}
$yabai_path -m config bottom_padding ${paddings[1]}

for space in $($yabai_path -m query --spaces | jq 'map(.index) | .[]')
do
	$yabai_path -m config --space $space top_padding ${paddings[0]}
	$yabai_path -m config --space $space bottom_padding ${paddings[1]}
done

echo $merged_config
