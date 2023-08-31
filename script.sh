#!/bin/bash

# List of files
files=(
docs/rvc/big_core/big_core.md
docs/rvc/big_core/big_core_top.md
docs/rvc/big_core/intro.md
docs/rvc/big_core/mem_wrap.md
docs/rvc/common/ctrl.md
docs/rvc/common/decode.md
docs/rvc/common/exe.md
docs/rvc/common/if.md
docs/rvc/common/intro.md
docs/rvc/common/mem_acs.md
docs/rvc/common/rf.md
docs/rvc/common/wb.md
docs/rvc/intro.md
docs/rvc/mini_core/intro.md
docs/rvc/mini_core/mini_core.md
docs/rvc/mini_core/mini_core_mem_wrap.md
docs/rvc/mini_core/mini_core_top.md
)

# Iterate over each file
for file in "${files[@]}"; do
    # Get the base name of the file
    base_name=$(basename "$file")
    
    # Check if file is empty or not
    if [[ ! -s $file ]]; then
        echo "$base_name" > "$file"
    else
        # Use sed to insert the file name at the beginning of the file
        sed -i "1i$base_name" "$file"
    fi
done
