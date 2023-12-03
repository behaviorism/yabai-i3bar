app_id=$1
yabai_path=$2
padding=$3

if ! pgrep -x yabai > /dev/null; then
	echo "$yabai_path isn't running"
	exit 0
fi

windows=$($yabai_path -m query --windows --space | sed 's/\\.//g; s/\n//g')
spaces=$($yabai_path -m query --spaces)

action='space=(`yabai -m query --spaces --space | jq -r "pick(.type, .index) | .[] | @sh" | tr -d '\\\''`); yabai -m config --space ${space[1]} top_padding $([ ${space[0]} == "stack" ] && '
action+="echo $padding || echo 0)"

# Add tabs bar padding while in stack mode, otherwise remove it
$yabai_path -m signal --add event=window_resized action="$action" label="Change ${app_id} padding on layout change"

echo $(cat <<-EOF
{
	"windows": $windows,
	"spaces": $spaces
}
EOF
)
