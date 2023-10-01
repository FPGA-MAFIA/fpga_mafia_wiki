# Build GUI

In general we recommend working directly from the command line without gui.
But, to learn and ease the process of the writing and running commands, we have created a GUI.

This will allow to use drop down menus, and see what are the available options, flags, arguments, tests and more.

To run the build gui:  
```./gui_build.py ```
This will open an interactive GUI that will allow you to build and run commands.
![gui_build1.png](/snapshots/gui_build1.png)

## Working with the GUI
The best way to learn how to use the GUI is to play with it by yourself, but we still want to give show you some examples.
Lets assume we want to run the following command:   
`./build.py -dut mini_core -test basics -app -hw -sim`   
 all you need to do is to select the relevant options as shown in the figure and click on the `Run Command` button.   

![gui_build2.png](/snapshots/gui_build2.png)

If you wish to see the commands that runs on the terminal, you can choose the `-cmd` box and than `Run Command`.


