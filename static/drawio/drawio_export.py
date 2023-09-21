#!/usr/bin/env python3
import xml.etree.ElementTree as ET
import os
import subprocess

# Path to the .drawio file and the draw.io executable
INPUT_FILE = "cache.drawio"
DRAWIO_EXEC = "draw.io.exe"  # adjust this if draw.io.exe is not in your PATH

def sanitize_filename(filename):
    """Sanitize the filename to remove any unwanted characters."""
    return ''.join(c for c in filename if c.isalnum() or c in ['_', '-']).rstrip()

def main():
    # Parse the .drawio XML
    tree = ET.parse(INPUT_FILE)
    root = tree.getroot()

    # Iterate over all diagrams (pages/tabs) in the .drawio file
    for index, diagram in enumerate(root.findall(".//diagram")):
        page_name = diagram.attrib.get('name', f'page_{index}')
        safe_page_name = sanitize_filename(page_name)
        output_filename = f"{safe_page_name}.jpg"

        print(f"Exporting page '{page_name}' to {output_filename}")

        # Run the draw.io.exe export command
        cmd = [DRAWIO_EXEC, "-x", "-f", "jpg", "-o", output_filename, "--page-index", str(index), INPUT_FILE]
        subprocess.run(cmd)

if __name__ == "__main__":
    main()
