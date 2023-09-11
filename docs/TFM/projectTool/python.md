Go ahead and get Python installed. We'll use Python scripts to handle stuff related to the mafia, which will make our lives a lot easier :smile: 
## Instalation
- https://www.python.org/downloads/
## Verification 
- To confirm the installation, please type the following cmd at the gitBash terminal. If you got the version than you python is in the PATH and you can skip *Troubleshooting* 
```
python --version
```

### Troubleshooting 
If you get a message like "command not found," it means you should include the Python execution file in the PATH. Think of PATH as a list of directories that are vital for your system. When you type a program's name, your operating system knows where to find it. In our case, we need to inform GitBash about the location of the Python execution file.

- open `/.bashrc` at your default editor 
- add `export PATH=$PATH:<path to directory of python.exe file>` and save
- go to terminal and type `source ~/.bashrc`
- type in terminal `python --version`, now you will get the version 


