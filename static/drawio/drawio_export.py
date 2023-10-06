#!/usr/bin/env python3
import xml.etree.ElementTree as ET
import os
import subprocess
import argparse

# Path to the draw.io executable
DRAWIO_EXEC = "draw.io.exe"  # adjust this if draw.io.exe is not in your PATH

def sanitize_filename(filename):
    """Sanitize the filename to remove any unwanted characters."""
    return ''.join(c for c in filename if c.isalnum() or c in ['_', '-']).rstrip()

def main():
    # Setup argparse
    parser = argparse.ArgumentParser(description='Export drawio pages to jpg.')
    parser.add_argument('-f', '--file', required=True, help='Filename without .drawio suffix')
    args = parser.parse_args()
    
    input_file = f"{args.file}.drawio"
    
    # Check if file exists
    if not os.path.exists(input_file):
        print(f"The file {input_file} does not exist.")
        return

    # Parse the .drawio XML
    tree = ET.parse(input_file)
    root = tree.getroot()

    # Iterate over all diagrams (pages/tabs) in the .drawio file
    for index, diagram in enumerate(root.findall(".//diagram")):
        page_name = diagram.attrib.get('name', f'page_{index}')
        safe_page_name = sanitize_filename(page_name)
        output_filename = f"{safe_page_name}.jpg"

        print(f"Exporting page '{page_name}' to {output_filename}")

        # Run the draw.io.exe export command
        cmd = [DRAWIO_EXEC, "-x", "-f", "jpg", "-o", output_filename, "--page-index", str(index), input_file]
        subprocess.run(cmd)

if __name__ == "__main__":
    main()