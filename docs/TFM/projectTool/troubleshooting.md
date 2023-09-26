### Troubleshooting 
 
1. Make sure you've installed the version that matches your computer's operating system. This means you should download and install the correct version designed for your Windows, macOS, or Linux computer. Installing the right version ensures that the software works smoothly on your specific type of computer.

2. If you get a message like "command not found," it means you should include the software execution file in the PATH. Think of PATH as a list of directories that are vital for your system. When you type a program's name, your operating system knows where to find it. In our case, we need to inform GitBash about the location of the specific software execution file. 
  
Lets assume we installed Python (it can be any other software)
- open `/.bashrc` at your default editor. You can type `code ~/.bashrc` or go to you home directory and find it there
- add `export PATH=$PATH:<path to directory of python.exe file>` and save. To find the PATH type `which python`. [^1]
- go to terminal and type `source ~/.bashrc`
- type in terminal `python --version`, now you will get the version 

note : It's important to know that the way you write the PATH in Windows is different from how you do it in a Linux environment.
For example' PATH in windows that looks like that `c:\folder1\folder2` will be written in `~/.bashrc` as `/c/folder1/folder2`

[^1] To create `.bashrc` please [read here](/TFM/projectTool/bashrc.md)

