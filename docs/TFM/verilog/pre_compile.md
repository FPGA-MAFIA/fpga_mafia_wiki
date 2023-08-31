# pre-compiler include , define & macros

### `include
`include is used to include a file in the current file.
The pre-compiler will replace the `include with the content of the file.
The file can be a SystemVerilog file or a text file.
To allow the pre-compiler to find the file, the file must be in the same directory as the current file, or in a directory that is specified in the +incdir+ compiler option.
```systemverilog
`include "my_file.sv"
```
### `ifdef, `ifndef, else, `endif
`ifdef and `ifndef are used to check if a macro is defined or not.
`else and `endif are used to define the else and end of the if statement.
```systemverilog
`ifdef SIMULATION_ONLY
  // do something
`else
  // do something else
`endif
```
A common use case is to have the same code for both simulation and synthesis.where in simulation you may want to use behavioral memory which is not really synthesizable, and in synthesis you want to use a memory that is provided by a vendor and is synthesizable.

```systemverilog
#### Guarding macros
For included files, it is common to use a macro to "guard" the file from being included more than once.  
This is a common practice to include the same SystemVerilog file multiple times to solve the cases where we want to compile a specific sub unit, so we must add the `include in the subunit header file, but we don't want to include it more than once.  
By adding the guarding macro, we can include the file in the subunit header file, and in the top level file, and the file will be included only once no matter what hierarchy we are trying to compile.  
Example: if this file has a global macro that we don't want to be included more than once, we can use the following code:  
```systemverilog
`ifndef MY_FILE_SV
`define MY_FILE_SV
  ...
  //the content if the included file>
  ...
`endif
```
When the include files have this we may include the file as many times we want in the lib, but the content will be visable to the compiler only once.
*Note:*   
- The macro name must be unique, so it is recommended to use the file name as the macro name.  
- `define are non-scoped, so if you have a macro with the same name in a different file, it will be overridden by the macro in the included file.  
- `define will affect only once the pre-compilation reads the specific file the define is in, so it will not affect any file that was parsed before the file with the define.

### `Define & macros
It is recommended to use `define in 2 cases:   

1. As guarding macros for included files.  
2. As define macros that ease the design and readability of the code such as `DFF(q,i,clk), `muxor(out,in_vec,sel), `find_first(first,canidate_vec).    

*Defines should not be used as parameters.

A define that is environment specific should be defined in the environment, and not in the design file.
Example for defines:   
`SIM_ONLY, `FPGA_ON, `SYNTH_ON, `EMULATION_ON, `ASSERT_ON, `DEBUG_ON, etc.  
Should be part of the environment and defined in the compilation command line:  
Example:  
``` vcs -sverilog -debug_all +define+SIM_ONLY +define+ASSERT_ON +define+DEBUG_ON +incdir+./include ```   
Or within a "file_list.f" file: `vcs -f file_list.f, where my_file.f contains the following:   
```systemverilog
-sverilog
-debug_all
+define+SIM_ONLY
+define+ASSERT_ON
+define+DEBUG_ON
_incdir+./include
```
Example for macros:
```systemverilog
`ifndef MACROS_VS //GUARDING MACRO
`define MACROS_VS

`define  DFF(q,i,clk)             \
         always_ff @(posedge clk) \
            q<=i;

`define  DECODER(decoded , encoded, valid )  \
    always_comb begin                        \
	    decoded = '0 ;                         \
        if(valid) decoded[encoded] = 1'b1 ;  \
	  end     

`endif //MACROS_VS
```

