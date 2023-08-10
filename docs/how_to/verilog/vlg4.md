# System-Verilog Features 

### `include
`include is used to include a file in the current file.
The pre-compiler will replace the `include with the content of the file.
The file can be a SystemVerilog file or a text file.
To allow the pre-compiler to find the file, the file must be in the same directory as the current file, or in a directory that is specified in the +incdir+ compiler option.
```systemverilog
`include "my_file.sv"
```
### 'ifdef, `ifndef, else, 'endif
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



### Parameter, localparam, Package
In SystemVerilog, both localparam and parameter are used to define constants, but there are some key differences between the two:
- localparam is used to define constants within a module or an interface, and it cannot be overridden by any other module or interface. It can only be accessed within the same module or interface where it is defined. The value of a localparam is determined during the elaboration phase of the simulation and cannot be changed during runtime.
- parameter is also used to define constants within a module or an interface, but a higher-level module or interface can override it. It can be accessed by any module that instantiates the module where it is defined. The value of a parameter can be determined during both the elaboration and runtime phases of the simulation.
Example for passing a parameter in module instance:
```systemverilog
module top;
// instantiate the module
my_module #(.WIDTH(8), .DEPTH(16)) 
my_instance (
 .clk(clk),
 .rst(rst),
 .in_req(in_req),
 .out_rsp(out_rsp)
)
//module content
...

endmodule

module my_module (
    parameter WIDTH = 8, //default value
    parameter DEPTH = 16 //default value 
)(
    input logic clk,
    input logic rst,
    input t_req  in_req,
    output t_req out_rsp
);
    // module contents
    ...
endmodule
```

In summary, localparam are more restrictive and cannot be overridden. In contrast, parameters are more flexible and can be overridden.

#### Package
A SystemVerilog package is a collection of data types, functions, and other constructs that can be used to organize and reuse design elements. 
A package allows you to encapsulate related functionality and make it available to other parts of the design without duplicating code. It also provides a way to organize and manage the design hierarchy by grouping related elements together. Packages can be used to define interfaces, data types, and classes that can be shared across multiple design modules, making it easier to reuse and maintain the design. They also provide a way to hide implementation details, while exposing a clear and consistent interface to other parts of the design.
Example:
```systemverilog
package my_pkg;
parameter NUM_ELEMENTS  = 6;
...
typedef struct packed {
    logic [1:0]            A;
    logic [NUM_ELEMENTS-1:0] B;    
} t_my_struct;
... 
etc.
```


importing a package:
```systemverilog
// package declaration
package my_package;
    // package contents (data types, structs, enums, parameters, functions, etc.)
endpackage

// module declaration
module my_module;
    import my_package::*;
(
    input   logic   clk,
    input   logic   rst,
    input   t_req   req, // "t_req" type is a typedef struct from the "my_package"
    output  t_rsp   rsp  // "t_rsp" type is a typedef struct from the "my_package"
);
always_comb begin
    for (int i = 0; i < ITERATIONS; i++) begin //ITERATIONS is a parameter declared in "my_package"
        // do something
    end
end
assign t_rsp.header  = ...; // the t_rsp struct fields are described in "my_package"
assign t_rsp.data    = ...;
assign t_rsp.address = ...;
assign t_rsp.opcode  = ...;

endmodule

```


###
value
