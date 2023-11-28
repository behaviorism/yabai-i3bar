# Set padding for all workspaces on startup
# Return settings that will be set in the widget context

yabai_path=$1
default_config=$2

if ! pgrep -x yabai > /dev/null; then
	echo "$yabai_path isn't running"
	exit 0
fi

file_config=$(cat ~/.yabai-i3barrc) || "{}"

merged_config=$(jq -n --argjson var1 "$default_config" --argjson var2 "$file_config" '$var1 + $var2')

paddings=($(echo "$merged_config" | jq -r '[."tabs-bar-padding", ."status-bar-padding"] | @sh'))

spaces=($($yabai_path -m query --spaces | jq -r 'map(.index, .type) | .[] | @sh' | tr -d \'))

for ((i=0; i < ${#spaces[@]}; i+=2)); do
	$yabai_path -m config --space ${spaces[i]} top_padding $([ "${spaces[i+1]}" == "stack" ] && echo ${paddings[0]} || echo 0)
	$yabai_path -m config --space ${spaces[i]} bottom_padding ${paddings[1]}
done

echo $file_config
