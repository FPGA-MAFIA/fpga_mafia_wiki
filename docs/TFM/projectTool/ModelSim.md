## ModelSim
ModelSim is a hardware simulation and debug environment that supports VHDL, Verilog, and SystemVerilog design languages.  
It allows users to simulate and verify the functionality and performance of their digital circuits, and is widely used in the design and verification of hardware systems.  
### vlog  
`vlog` is a command-line utility in ModelSim that is used to compile Verilog files into an intermediate form that can be used for simulation.  
This step is necessary before running a simulation in ModelSim.  
  
The basic usage of the vlog command is as follows:   
> vlog \<options\> \<files\> 

Here, \<options\> are various command-line options that can be used to customize the compilation process, and \<files\> are the Verilog files that you want to compile.    
The vlog command outputs compiled libraries and object files that are used during simulation.    
<!-- Example:   
TODO    -->

### vsim  
`vsim` is a command-line utility in ModelSim that is used to start a simulation. It allows users to load a design, run a simulation, and debug the behavior of the design using various waveforms and probes.   
The basic usage of the vsim command is as follows:  
``` vsim \<options\> \<top_module\> ```  
Here, \<options\> are various command-line options that can be used to customize the simulation, and \<top_module\> is the top-level module of the design that you want to simulate.   
<!-- Example:  
TODO   -->
Once the simulation is running, you can use various commands and menus to control the simulation, display waveforms, and set breakpoints.  

### GUI  
ModelSim also comes with a graphical user interface (GUI) that provides a more interactive way to perform simulation and debug tasks.  
The GUI allows users to load designs, run simulations, and analyze waveforms and data using various windows and tools.  
To start the ModelSim GUI, simply type vsim -gui on the command line. This will launch the ModelSim window, where you can perform all the same tasks as the command-line interface.  
The ModelSim GUI is particularly useful for tasks such as waveform analysis, which can be visualized more easily in the GUI than in the command-line interface.   
The GUI also provides a more intuitive way to navigate and interact with the simulation environment.  

