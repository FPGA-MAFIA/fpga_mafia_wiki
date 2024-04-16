 `~/.bashrc` file is like a user's personal command line settings file in Linux. It's used to:

- Customize the command line environment.  
- Define shortcuts (aliases) for commands.  
- Set up the appearance of the command prompt.  
- Run specific commands when you log in.  
- Adjust how the Bash shell behaves for that user.  
- It's all about making the command line work the way you want it to for your user account.

Because we're using Windows, and the `~/.bashrc` file is meant for Linux, it might seem unnecessary to add it. However, here's why we still install it: We're using GitBash, which acts like a Linux terminal. When we open GitBash, it reads the `~/.bashrc` file, so having it installed helps configure our GitBash environment.

## Seting bashrc
```
touch ~/.bashrc
```
In the first line, we're making a file by using `touch` command. The tilde (~) means it's in the home directory, and the dot (.) before the filename means it's hidden.   
You can find the created file by typing the following cmd in GitBash terminal
```
ls -a
``` 

### lets play with the file (optional)
- open `/.bashrc` at your default editor 
- add `alias my_cmd="pwd"` to the file (do not add any spaces near equal(=) sign)
- go to terminal and type `source ~/.bashrc`
- type in terminal `my_cmd`, Take a look and find out what's going on

This is just one of the many powerful things you can do with that file.   
Now, you can move to the next section, we will comeback to that file in the future.

## This is how a regular bashrc file might look

![bashrc.png](/snapshots/bashrc.png)

You don't need to have all this lines, and in many cases everything will work even if the file is empty.   
Let's look at the different parts of this file:   

**PATH**: In this section, you can find all the important paths your computer needs. 

**ALIASING**: Here, you can find some handy shortcuts called aliases. We'll talk about them later. Just remember, aliases make typing easier, but you can work without them.

**SHELL CUSTUMIZATION**: This is a cool feature that adds 'git bash + your current directory + branch name' to your command prompt. You can copy that line and ask [ChatGPT](https://chat.openai.com/) if you want more details."

Here we supply the content of the given `~/.bashrc` file for your personal use.
```
##################### 
###     PATH      ###
#####################
export PATH=$PATH:/c/Users/roman/AppData/Roaming/xPacks/xpack-riscv-none-embed-gcc/bin/        # riscv gcc
export PATH=$PATH:/c/Users/roman/AppData/Local/Programs/Python/Python311-32                    # python
export PATH=$PATH:/c/Users/roman/AppData/Roaming/npm                                           # npm
export PATH=$PATH:/c/Users/roman/AppData/Roaming/npm/node_modules/docusaurus/node_modules/.bin # docusaurus
export PATH=$PATH:/c/intelFPGA_lite/20.1/quartus/bin64/                                        # quartus prime                        


##################### 
###   ALIASING    ###
#####################
alias gcc="riscv-none-embed-gcc"
alias run_all="./build.py -dut big_core -test alive -app -hw -sim -gui"


############################# 
###  SHELL CUSTUMIZATION  ###
#############################
PS1='\[\033[01;32m\]git_bash @ \[\033[01;31m\]\W\[\033[01;33m\]$(__git_ps1 " (%s)")\[\033[01;32m\]> \[\033[00m\]'

```  


