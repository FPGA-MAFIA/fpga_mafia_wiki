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