if [ $# -eq 0 ]; then
	echo "No Arguments Supplied"
	exit 1
fi
for folder in "$@"; do
	dir_name="ex$folder"
	mkdir -p "$dir_name"
	echo "Created directory: $dir_name"
done

