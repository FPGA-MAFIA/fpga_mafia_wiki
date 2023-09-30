In this section, we'll discuss some helpful VS Code extensions. Keep in mind that these extensions may change over time, so their names and descriptions could be different.   
You're welcome to install different versions of extensions. If you discover a better extension than the ones mentioned here, please let us know. We'd be very grateful for your feedback.

### python
A Visual Studio Code extension with rich support for the Python language (for all actively supported versions of the language: >=3.7), including features such as IntelliSense (Pylance), linting, debugging, code navigation, code formatting, refactoring, variable explorer, test explorer, and more!  

<u> extension id </u>: ms-python.python

### drawio
This extension simply integrates Draw.io into vs code.  
Draw.io, now known as "diagrams.net," is a popular web-based diagramming and charting tool. It allows users to create a wide variety of diagrams, flowcharts, organizational charts, wireframes, and other visual representations of information. Diagrams.net is often used for tasks like illustrating processes, designing software architectures, creating organizational charts, and visualizing data.

Key features of diagrams.net (formerly Draw.io) include a user-friendly interface, real-time collaboration, support for various diagram types, integration with cloud storage services, and the ability to export diagrams in different formats. It's a versatile tool that caters to both personal and professional diagramming needs and is widely used in various industries for visualizing complex ideas and concepts.
[Click here](https://app.diagrams.net/) to visit the official Draw.io (diagrams.net) site.


<u> extension id </u>: hediet.vscode-drawio

### SystemVerilog
This VS Code extension provides features to read, navigate and write SystemVerilog code much faster.

Features:
- Elaborate syntax highlighting
- Go to symbol in document (Ctrl+Shift+O)
- Go to symbol in workspace folder (indexed modules/interfaces/programs/classes/packages) (Ctrl+T)
- Go to definition (works for module/interface/program/class/package names and for ports too!) (Ctrl+LeftClick)
- Find references (works for module/interface/program/class/package names and for ports too!) (Ctrl+LeftClick)
- Quick-start on already indexed workspaces
- Code snippets for many common blocks
- Instantiate module from already indexed module
- Linter capabilites with simulators (more info on the wiki)
- Fast real-time error identification through an integrated SystemVerilog parser and IntelliSense (fully accurate to IEEE Standard 1800-2017)     

<u> extension id </u>: eirikpre.systemverilog

### c/c++
The C/C++ extension adds language support for C/C++ to Visual Studio Code, including editing (IntelliSense) and debugging features.   

<u> extension id </u>: ms-vscode.cpptools

### code spell checker
A basic spell checker that works well with code and documents.
The goal of this spell checker is to help catch common spelling errors while keeping the number of false positives low.

<u> extension id </u>: streetsidesoftware.code-spell-checker

### Diff
Compare documents quick and easily extension   

<u> extension id </u>: fabiospampinato.vscode-diff

### GitHub Copilot
GitHub Copilot is an AI-powered coding assistant developed by GitHub in collaboration with OpenAI. It is designed to help developers write code more efficiently by providing code suggestions, auto-completions, and even generating entire code blocks and functions. GitHub Copilot is tightly integrated with the Visual Studio Code (VS Code) editor and is intended to assist developers across various programming languages and tasks.

<u> extension id </u>: GitHub.copilot

* Please note that this extension is not for free. [Paying policy](https://docs.github.com/en/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot)

### Paste image
The "Paste Image" Visual Studio Code (VSCode) extension is a tool that allows you to easily paste images from your clipboard directly into your code editor. Instead of saving an image to a file and then manually inserting it into your code or documentation, this extension streamlines the process.
 --How to use it--
 1. Copy an image to your clipboard or use a screenshot tool to capture an image(window + shift + s)
 2. Open the command palette (Ctrl+Shift+P) and search for "Paste Image" or use the shortcut (Ctrl+Alt+V)
 and that's it!

 - The image will be pasted into your current file at the cursor position
 - The image will be saved in the same directory as your current file

To set the folder where images are saved, use the "Paste Image: Set Image Path" command. You can also set the default image path in your settings.json file. To do this open the command palette (Ctrl+Shift+P) and search for "Preferences: Open Settings (JSON)" and add the following line to your settings.json file:
```
"pasteImage.path": "${projectRoot}/static/snapshots",
"pasteImage.basePath": "${projectRoot}/static",
"pasteImage.forceUnixStyleSeparator": true,
"pasteImage.prefix": "/",
"pasteImage.insertPattern": "![${imageFileName}](${imageFilePath})",
```

This is how the `settings.json` file might looks like:   
We encourage you to "play" with the "Paste image" settings and find the best configuration for you.

![settings_json.png](/snapshots/settings_json.png)

<u> extension id </u>: mushan.vscode-paste-image 

### Waveform Render
Draw timing diagram waveforms with WaveDrom inside VSCode.
Saved waveforms will be located in `/static/waveforms` folder.

After installation:

- Go to `/static/waveforms` folder and create file with `.json` extension. This file will contain your waveform code.
- Write your waveform code inside the file. (you may use the code below as an example)
- Keep `*.json` opened and press Ctrl+k+d to render the waveform.
- Use Paste Image extension to paste the waveform into your markdown file.

![waveform_extension.png](/snapshots/waveform_extension.png)

This is the code of `*.json` file, feel free to play with it
```
{
  "signal": [
    {"name": "clk", "wave": "p..........."},
    {"name": "core2cache_req.valid", "wave": "0101.....0.."},
    {"name": "core2cache_req.opcode", "wave": "x3x4.....x..", "data": ["read", "write", "write", "write", "write", "write"]},
    {"name": "core2cache_req.address", "wave": "x3x4.....x..", "data": ["0x05", "0x08", "0x08", "0x08", "0x08", "0x08"]},
    {"name": "core2cache_req.data", "wave": "xxx4.....x..", "data": ["0xA8", "0xA8", "0xA8", "0xA8", "0xA8"]},
    {"name": "core2cache_req.reg_id", "wave": "x3xxxxxxx..."},
    {"name": "cache_ready", "wave": "1.0.....1..."}
  ]
}
```
for additional information [click here](https://github.com/wavedrom/wavedrom)

<u> extension id </u>: bmpenuelas.waveform-render 
