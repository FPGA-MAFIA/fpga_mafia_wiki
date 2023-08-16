# Develupment environment
## vscode
VS Code is a versatile and powerful code editor that can help you write and debug code more efficiently. Here are some reasons why VS Code is a good editor for our project:  
- Accessible Command Line: VS Code provides an integrated terminal that allows you to run command-line tools directly from the editor. This includes tools like Git Bash, which can be useful for version control and other tasks.  
- SystemVerilog Extensions: VS Code has extensions that provide syntax highlighting and autocompletion for SystemVerilog, which can make it easier to write and read SystemVerilog code.  
- C Extensions and Other Tools: VS Code also supports C/C++ development and provides a range of tools for debugging, profiling, and testing. This includes features like the C/C++ extension, the Debugger for C/C++, and the C/C++ TestMate extension. It also has tools like the linker to link object files.  
- GitHub Copilot: VS Code now comes with an AI-powered code assistant called GitHub Copilot, which can suggest code snippets and even write code for you. While still in beta, Copilot can be a great productivity booster for repetitive tasks.  
- View Diagrams and Pictures: VS Code has a built-in viewer for diagrams and pictures, which can be useful for viewing block diagrams, waveforms, or other graphical representations of your project.  
- Read PDF: VS Code also has a built-in PDF viewer that allows you to read and annotate PDF files directly in the editor.  
- Git Version Control Extensions: VS Code has many extensions that can help you work with Git and other version control systems. This includes the built-in Git integration as well as popular extensions like GitLens and Git History.  

By using VS Code as your development environment, you can benefit from its many features and extensions, which can make it easier to write, debug, and manage your code.  

## git-bash
Git Bash is a command-line interface (CLI) that provides a Unix-like environment on Windows.  
It includes a variety of Unix command-line tools, including Git, which can be used directly from the Git Bash terminal.  
Git Bash also supports many standard Windows commands and utilities, which means that you can use it to run both Windows and Unix-based scripts and tools.  
This makes it a great option for working with Git on Windows, especially if you're familiar with Unix-based tools and workflows.  
Additionally, Git Bash provides a consistent, lightweight command-line interface that can be used across different Windows versions.  
Git Bash also supports Git GUI commands, including gitk, git-gui, and more, which can be useful for performing Git operations using a graphical interface.   
Furthermore, Git Bash allows you to write shell scripts and interact with other scripts written in Python, making it a powerful tool for automating tasks and building custom workflows.  

***
***
***
# SW
> \<TODO\>
## RISCV GCC
To be able to run programs on our proprietary RISCV CPU implementation, we need to create the executable files such as the `elf` files.
This is done by using the RISCV GCC compiler. The RISC GCC compiler input are the C source files, crt0.s, and linker script. The output is the `elf` file.
The crt0.s file is the C runtime file that is used to initialize the C runtime environment. 
The linker script is used to define the memory layout of the executable file.

## Python
> \<TODO\>

***
***
***
# HW
## ModelSim
ModelSim is a hardware simulation and debug environment that supports VHDL, Verilog, and SystemVerilog design languages.  
It allows users to simulate and verify the functionality and performance of their digital circuits, and is widely used in the design and verification of hardware systems.  
### vlog  
`vlog` is a command-line utility in ModelSim that is used to compile Verilog files into an intermediate form that can be used for simulation.  
This step is necessary before running a simulation in ModelSim.  
  
The basic usage of the vlog command is as follows:   
``` vlog <options> <files> ```   
Here, <options> are various command-line options that can be used to customize the compilation process, and <files> are the Verilog files that you want to compile.    
The vlog command outputs compiled libraries and object files that are used during simulation.   
Example:  
``` <TODO> ```  

### vsim  
`vsim` is a command-line utility in ModelSim that is used to start a simulation. It allows users to load a design, run a simulation, and debug the behavior of the design using various waveforms and probes.   
The basic usage of the vsim command is as follows:  
``` vsim <options> <top_module> ```  
Here, <options> are various command-line options that can be used to customize the simulation, and <top_module> is the top-level module of the design that you want to simulate.   
Example:  
``` <TODO> ```  
Once the simulation is running, you can use various commands and menus to control the simulation, display waveforms, and set breakpoints.  

### GUI  
ModelSim also comes with a graphical user interface (GUI) that provides a more interactive way to perform simulation and debug tasks.  
The GUI allows users to load designs, run simulations, and analyze waveforms and data using various windows and tools.  
To start the ModelSim GUI, simply type vsim -gui on the command line. This will launch the ModelSim window, where you can perform all the same tasks as the command-line interface.  
The ModelSim GUI is particularly useful for tasks such as waveform analysis, which can be visualized more easily in the GUI than in the command-line interface.   
The GUI also provides a more intuitive way to navigate and interact with the simulation environment.  

***
***
***

## Quartus 
> \<TODO\>
### DE10-lite FPGA
> \<TODO\>
### Signal Tap
> \<TODO\>

***
***
***

# github actions
## Overview of Actions and Workflows
GitHub Actions is a flexible, powerful platform for automating software development workflows.  
With GitHub Actions, we can define custom workflows that run automated tasks whenever specific events occur in your repository.  
Workflows are defined in a YAML file and can be triggered by a variety of events, such as pushes to a branch, pull requests, or issue comments.

We have set up a custom workflow in our project using GitHub Actions to automate the build and test process.  
Whenever a new Pull request is issued or a Push to the main repository branch. 
The workflow runs a series of steps, which currently simply runs the build per DUT:  
- Compile the C Sofware (GCC, link, generate inst/data sv files)   
- Compile the Verilog code  
- Run the tests, and report the results   
We have configured the workflow to run on a local host to ensure that the environment is consistent and can be easily reproduced.

### The benefits of using GitHub Actions for our project include:
- Automated testing: By automating the build and test process, we can catch issues earlier and reduce the risk of introducing bugs.
- Consistent environment: Running the workflow on a local host ensures that the environment is consistent and can be easily reproduced, making it easier for other contributors to get up and running quickly.
- Customization: GitHub Actions allows us to define customized workflows that meet our specific needs and integrate with other tools and services we use in our project.  
  
In the following sections, we'll provide more details on how we set up and configured the workflow for our project.  

## Setting up Actions and Workflows
To set up the workflow for our Verilog project, we followed these steps:
1. Create a .github/workflows directory in the root of the repository.
1. Create a YAML file in the .github/workflows directory. We named ours build-test.yml, but you can use any name you like, as long as it ends in .yml.
1. Define the events that should trigger the workflow. For our project, we chose to trigger the workflow on push events to the main branch:
1. Define the steps of the workflow. In our case, we have three steps: checkout, build, and test. Here's the complete YAML file:
```yaml
# this is a github action that runs the python build

name: mafia_sanity

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: [self-hosted , windows, x64]
    steps:
      - uses: actions/checkout@v2
      - name: Run build BIG_CORE -all -app -hw -sim
        run: python build.py -proj_name 'big_core' -debug -all -app -hw -sim
      - name: Run build MINI_CORE -all -app -hw -sim
        run: python build.py -proj_name 'mini_core' -debug -all -app -hw -sim
      - name: Run build SC_CORE -all -app -hw -sim 
        run: python build.py -proj_name 'sc_core' -debug -all -app -hw -sim
      - name: Run build CACHE -all -app -hw -sim 
        run: python build.py -proj_name 'cache' -debug -all -hw -sim
```
1. Let's break down the important parts of this YAML file:
- The ```name``` field provides a descriptive name for the workflow. This is displayed in the Actions tab of the repository.
- The ```on``` field defines the events that should trigger the workflow. In our case, we're triggering the workflow on push events to the main branch.
- The ```jobs``` field defines the jobs that make up the workflow. We have one job, called build-test, that runs on an ubuntu-latest virtual environment.
- The ```steps``` field defines the steps that make up the build-test job. We have three steps: checkout, build, and test.
- The ```uses``` field in the checkout step specifies that we're using the actions/checkout action to check out the code from the repository.
- The ```run``` field in the build and test steps specifies the commands that should be run to build and test the code.

## Running the Project Build and Tests
To run the build and tests for your project, trigger the event specified in your workflow YAML file.  
This is done by a Pull-Request or manually on your branch in the action tab.
GitHub Actions will create a virtual environment and run the steps you defined.

Our workflow checks out the code, builds it, and runs the tests.   
If any step fails, the job will fail.  
You can see the build and test results in your repository's "Actions" tab.  

GitHub Actions makes it easy to reproduce the build and tests on different environments, catch issues early, and get feedback on the results directly in the GitHub UI.  
***
