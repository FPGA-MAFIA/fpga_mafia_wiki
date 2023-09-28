# HW elaboration and simulation
Elaboration creates a hierarchical representation of the design by connecting modules and resolving dependencies between them.

**Common elaboration errors:**

System Verilog elaboration error involving an undeclared signal while instantiating a module
Suppose you have two System Verilog modules, ModuleA and ModuleB, and you want to instantiate ModuleB within ModuleA. However, you accidentally misspell the module name when instantiating it
and many more...

- Please type the following command in the terminal to elaborate and simulate using the test bench located in `verif/mini_core/tb/mini_core_tb.sv`

```
./build.py -dut mini_core -test basics -sim
```
If you receive the message 'Test passed,' it means everything is okay. 

### Background of elaboration and simulation command

In this section, we will outline the commands that run in the background when you use the   
 `./build.py -dut mini_core -test basics -sim` command.   

```
rm -rf target/mini_core/tests/basics/*.log 

cd ./target/mini_core/modelsim/

vsim.exe work.mini_core_tb -c -do "run -all"   +STRING=basics

cd C:/workspace/fpga_mafia

```




