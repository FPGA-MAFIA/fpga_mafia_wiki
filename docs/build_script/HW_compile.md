# HW Compilation
Hardware compilation is a process where we compile HDL files (In our case, we're working with System Verilog files) of our unit (In our case, we're working with mini_core). During this process, we also load a file called 'inst_mem.sv' that was created from 'basics.c' into the instruction memory of the mini_core. 

- Please type the following command in the terminal to compile the hardware part of the project:

```
./build.py -dut mini_core -test basic -hw
```
If you receive the message 'Test passed,' it means everything is okay. 

### Background of HW Compilation command
In this section, we will outline the commands that run in the background when you use the
 `./build.py -dut mini_core -test basics -hw` command.   

```
cd ./target/mini_core/modelsim/

vlog.exe -lint -f ../../.././verif/mini_core/tb//mini_core_list.f

cd C:/workspace/fpga_mafia
```

Please open the `mini_core_list.f` file and try to understand what it does.


