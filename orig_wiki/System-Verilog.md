# Table of Contents
1. [SystemVerilog vs Verilog](#systemverilog-vs-verilog)
   1. [assignments: always vs assign](#assignments-always-vs-assign)
      1. [assign](#assign)
      1. [always and SystemVerilog always type](#always-and-systemverilog-always-type)
   1. [Sensitivity list](#sensitivity-list)
   1. [reg, wire, logic](#reg-wire-logic)
   1. [systemverilog typedef:](#systemverilog-typedef)
1. [Blocking vs Non-Blocking assignment](#blocking-vs-non-blocking-assignment)
1. [multiple dimensional arrays](#multiple-dimensional-arrays)
1. [Coding Style](#Coding-Style)
   1. [signal declaration](#signal-decliration)
   1. [Naming convention](#naming-convention)
1. [define, Parameter, localparam, pvalue, Package, `include](#define-parameter-localparam-pvalue-package-include)
   1. [`include](#include)
   1. [Guarding macros](#guarding-macros)
   1. [`Define](#define)
   1. [macros](#macros)
   1. [Parameter, localparam, Package](#parameter-localparam-package)
1. [module, function, macro](#module-function-macro)
   1. [common examples:](#common-examples)
      1. [Mux](#mux)
      1. [Counter](#counter)
      1. [State-Machine](#state-machine)
      1. [Find_First](#find_first)
      1. [Shift register](#shift-register)
      1. [Register-File](#register-file)
      1. [Pipe-Line](#pipe-line)
1. [Clock domain crossing](#clock-domain-crossing)
   1. [Two flip-flop synchronizer](#two-flip-flop-synchronizer)
   1. [Single bit — synchronizer with feedback acknowledge](#single-bit--synchronizer-with-feedback-acknowledge)
   1. [gfifo](#gfifo)
   1. [MCP: Multi-Cycle-Path](#mcp-multi-cycle-path)
1. [PLL](#pll)
[async vs sync Flop Reset](#async-vs-sync-flop-reset)
1. [Compilation, Elaboration & Simulation](#compilation-elaboration--simulation)
   1. [Compilation](#compilation)
   1. [Elaboration](#elabortion)
   1. [Simulation](#simulation)


***
***


# SystemVerilog vs Verilog
Verilog and SystemVerilog are both hardware description languages (HDLs) that are used to model, design, and verify digital and mixed-signal systems. Verilog is a standard in the field of electronic design automation (EDA) and is widely used for design and verification of digital circuits. SystemVerilog is an extension of Verilog that includes additional features and capabilities for more advanced design and verification tasks.

## assignments: always vs assign
In SystemVerilog, the assign and always statements are used to specify the behavior of a digital circuit.   
The main difference between these two statements is the type of behavior they can describe.
### assign
The assign statement is used to specify a continuous assignment of a value to a signal. It is triggered whenever the value of any of the signals on the right-hand side of the assignment changes. The assign statement can only describe combinational logic, which has no memory or state.
When using an assign, the left-hand side of the assignment may get a value only once.
in contrast to always_comb where the left-hand side may be overridden within the always block. (see the always_comb section)
Examples:
```systemverilog
assign c   = a & b; //AND
assign out = sel ? in1 : in2; //mux
assign sum = addend_a + addend_b; //add
assign result = !(|( vec_a ^ vec_b)); //equivalent to (vec_a == vec_b)). achieved by `XOR` bitwise between vec_a^vec_b, then `OR` all the bits, then `NOT` the result.
```

### always and SystemVerilog always type
While in Verilog, always assignments types are determined using the sensitive list & the Block/Non-Blocking assignment,  
in SystemVerilog we use dedicated always_\<*\> blocks to enforce correctness:
- always_comb
Is equivalent to Verilog ```always @*``` 
Any combinatorial error such as "inferred latch" or "combinatorial loop"  will be reported in the compilation.
Unlike the `assign`, within an `always_comb` the left-hand side signal may get multiple assignments.  
some examples:
```systemverilog
//mux
always_comb begin
   if(sel==1'b0)
      out = in1;
   else //(sel ==1'b1)
      out = in2;
end
```
```systemverilog
//legal if without else
always_comb begin
   out = '0; //default value
   if(condition == TRUE)
      out = other_input; //no latch due to the default value
end
```
```systemverilog
//legal multiple assignment to left-hand side within same always_comb
logic [31:0] sum_all;
logic [31:0] vec[9:0]
always_comb begin
sum_all = '0;
for(int i = 0; i<10; i++) begin
    sum_all= sum_all + vec[i];
end //for
end
```
```systemverilog
//using new assignments in for loop into next loop iteration. 
logic [31:0] fibb [9:0]
always_comb begin
fibb[0] = 0;
fibb[1] = 1;
for(int i = 2; i<10; i++) begin
    fibb[i] = fibb[i-1] + fibb[i-2];
end //for
end
```

- always_latch
The always_latch statement is used to describe logic that has a latch-like behavior. 
A common way to create a latch is "if without else". example:
```SystemVerilog
always_latch begin
  if(en)  out = in;
end
```
in this logic, the out is a "memory cell". this due to no value is given to `out` if the 'en==0'.
So out must "remember" its old value. this is done using a latch memory cell.

- always_ff
Is equivalent to Verilog ```always @(posedge clk)``` 
This will also enforce the correct usage of "Non-Blocking" assignment within the logic
```SystemVerilog
always_ff @(posedge clk) begin
  if (rst) q <='0;
    else   q <= in;
end
```
Note that in the sensitivity list of the always_ff we only have the `clk`.
This will make any of the assignments in the block evaluated **only** on the clock positive edge.
An implication of this is the fact that the Reset won't have any effect on the flop output without having the Clock toggling.
Also known as a "synchronized reset flop"

## Sensitivity list
A sensitivity list is a list of signals used to trigger a procedural block of code. 
In verilog Sensitivity lists are used in every always block to specify the conditions under which the block will be executed.
Verilog example:
```verilog
always @(a or b or c) begin
  d = (a && b) || (c);
end
```
Note: This coding style is prone to disasters, where you might miss a signal in the sensitivity list and accidentally create a `latch`
In this example, the c is not part of the sensitivity list, which means d may not be evaluated if only c has changed.
This will cause the `d` signal to become a "latch" memory cell so it can remember its last value.
```verilog
always @(a or b) begin
  d = (a && b) || (c);
end
```
to simplify, Verilog allows all right-hand side signals to be part of the sensitivity list by using a `wild card`
```verilog
always @* begin
  d = (a && b) || (c);
end
```
In SystemVerilog coding style, the sensitivity list shenanigans are eliminated by simply using an `always_comb`.
And latches are carefully designed only when they are intended by adding the `always_latch` block.

## reg, wire, logic
The reg and wire data types are used to represent digital signals in a hardware description. The main difference between these two data types is their use and the type of behavior they can describe.

The reg data type represents variables that can be assigned a value within a procedural block of code, such as an always block.   
reg variables can be used to describe **both** combinatorial and sequential logic, and they can be assigned a value using blocking(=) and non-blocking (<=) assignments.

The wire data type is used to represent signals that are interconnections between modules or between blocks of code within a module. wire signals can be used to describe combinatorial logic, and they cannot be assigned a value within a procedural block of code. Instead, they are driven by continuous assignments (using the assign statement) or by the output of a gate or module.

Note: In Verilog, a signal may be driven by combinatorial logic if it's a wire or reg. this means there is no "real" difference between the two once we synthesize the block. the only difference is that a reg type **can** (but not necessarily) get a non-blocking assignment (as flop output) or be a latch output. which `wire` type can't.
But what determines if `reg` is a memory cell is the context where it's used!

In SystemVerilog, the `logic` data type is a multi-purpose data type that can represent digital signals in a hardware description.  
It is a more flexible and powerful data type than the `wire` and `reg` types in Verilog, 
Using `logic` instead of `wire` and `reg` in SystemVerilog designs is highly recommended.

Here are some reasons why logic is generally considered to be better than wire and reg in SystemVerilog:
1. Type compatibility: logic is more type-compatible with other data types than wire and reg. For example, logic can be used as an element type in arrays, as a member of a structs, used both in `assign` and `always` blocks, used for module interface.
Generally, whenever you want a logical signal in your circuit, the `logic` type will due. 
2. Type inference: logic supports type inference, which means that it can be assigned a value from any type that can be implicitly converted to logic. This allows for more flexible and concise code, as it is not necessary to explicitly specify the type of every variable.
3. Mixed-signal modeling: logic has four subtypes (bit, logic, tri, and triand) that can represent different digital signals, such as single-bit signals, multi-bit vectors, tri-state signals, and high-impedance signals. This makes it easier to model mixed-signal systems that include both digital and analog components.

Overall, logic is a more powerful and flexible data type than wire and reg in SystemVerilog. Using logic instead of wire and reg in SystemVerilog designs is generally recommended.

## systemverilog typedef:
the typedef keyword defines a new type alias for an existing type. It allows you to create a new name for an existing type, making your code more readable and easier to maintain.  
Example:
```SystemVerilog 
typedef logic [31:0] t_address;
typedef logic [3:0] t_tq_id;
```
typedef can also be used to create type aliases for user-defined types, such as structures or unions.  
For example:
- enum
```SystemVerilog 
typedef enum logic [1:0] {
        RED         = 2'b00,
        YELLOW      = 2'b01,
        GREEN       = 2'b10,
        RED_YELLOW  = 2'b11
} t_state;
```
- struct
```systemverilog 
typedef struct packed {
    logic         valid;
    t_opcode      opcode;
    t_address     address;
    t_data        data;
} t_req ;
```
accessing a struct field is state forward.  
Example:
```SystemVerilog
t_req request;
t_address  new_address;
assign new_address = request.address;// accessing the address field from the request struct
```

- union
```systemverilog 
typedef struct packed {
    logic         valid;  // 1 bit
    logic [5:0]   date;   // 6 bit
    logic [2:0]   opcode; // 3 bit
} t_a_type ;              // 10 bit in total
typedef struct packed {
    logic         valid;  // 1 bit
    logic [4:0]   address;// 5 bit
    logic [1:0]   opcode; // 2 bit
    logic [1:0]   rsvd;   // 2 bit
} t_b_type ;              // 10 bit in total

typedef union {
  t_a_type a; // 10 bit
  t_b_type b; // 10 bit
} t_union;    // the union is still 10 bit!
```
Using the union, we can access any field using the union type:
```systemverilog 
t_union physical_io;
t_a_type a_bus;
t_b_type b_bus;
// assign 2 different types on to the same physical port:
assign physical_io = sel ? a_bus : b_bus;
// Then we can access any field on the physical_io:
assign address = physical_io.b.address[4:0];
assign data    = physical_io.a.data[5:0];
```

# Blocking vs Non-Blocking assignment
The main difference between these two types of assignments is how they are executed in relation to the rest of the code in a design.  
Blocking assignments are executed immediately and block the execution of any other statements until the assignment is completed.  
They are denoted by the `=` operator and are commonly used for simple assignments or for modeling combinatorial logic. For example:
```systemverilog
always_comb begin
   x = y;      // blocking assignment
   z = x + y;  // blocking assignment - z is getting the x evaluation from the previous line
end
```
On the other hand, non-blocking assignments are executed at the end of a time step and do not block the execution of other statements.  
They are denoted by the `<=` operator and are commonly used for modeling sequential logic or updating registers.  
For example:
```systemverilog
always_ff @(posedge clk) begin
   x <= y;      // non-blocking assignment
   z <= x + y;  // non-blocking assignment - z is getting the x evaluation from the **previous clock cycle** and not the previous line.
end
```

Please note:
- Never mix blocking & non-Blocking assignments
- Use non-Blocking assignments with sequential logic, such as Flops
- It is recommended to have all sequential logic wrapped in \`macros   
this means we can get a design without any visible non-Blocking assignments
And we are very specific about the sequential logic, which has the non-Blocking assignments hidden in the `macros.

# multiple dimensional arrays
## Packed vs Unpacked
In SystemVerilog, packed and unpacked arrays are used to represent different types of data storage.  
Packed arrays store data in a compact, contiguous block of memory, while unpacked arrays store data in separate, non-contiguous memory locations.  
Commonly Packed arrays are used when your signal is treated as a single element, while unpacked arrays are useful for storing arrays of a elements.  
Two signals may be the same number of bits, but they are not the same "shape".  

For example, the following code declares a packed,unpacked & mixed arrays of 4 bits:  
```systemverilog
// Packed array declaration
logic [3:0] packed_array;
// Unpacked array declaration
logic unpacked_array [3:0];
//mixed packed and unpacked array declaration:
logic [1:0] array_c [1:0];
```
`array_a` is a packed array of 4 bits, while `array_b` is an unpacked array of 4 bits.  
The mixed array `array_c` is a two-dimensional array where each element is a packed array of 2 bits.

To assign values between a packed and an unpacked array, you need to explicitly access the bits of the packed array.  
This is because packed and unpacked arrays have different storage formats, and the bits of a packed array may be arranged in a different order than the bits of an unpacked array.  
For example, to assign the values of array_b to array_a, you can use a for loop to access each bit of the arrays and assign the values one by one:  
```systemverilog
always_comb begin
  for(int i = 0; i < 4; i++) begin
    array_a[i] = array_b[i];
  end
end
```

To assign values from a mixed array to a packed array, you can use concatenation to combine the bits from the elements of the mixed array to match the correct "shape" of the packed array:  

```systemverilog
assign packed_array = {array_c[1][1:0], array_c[0][1:0]};
```
In this example, the bits [1:0] of array_c[1] and array_c[0] are concatenated to form the 4-bit packed array packed_array.

Another example:
```systemverilog
// 8-bit packed array (a single element)
logic [7:0] element_a;
logic [7:0] element_b;
logic [7:0] element_c;
logic [7:0] element_d;

// unpacked array_1d with 10 elements. each element is 8-bit
logic [7:0] array_1d [9:0]
// unpacked array_2d with 10x10=100 elements. each element is 8-bit
logic [7:0] array_2d [9:0][9:0];

// ====== Example for legal assignments =====
// assign an Element from the array to the entr
assign element_a = array_2d[0][0];

// assign element_b to array_2d to a specific entry
assign array_2d[1][2] = element_b;

// assign a row to the 1d array from the 2d array
assign array_1d = array_2d[3];
//same as: assign array_1d[9:0] = array_2d[3][9:0];

// assign a column to the 1d array from the 2d array 
/// Note this wont work: "assign array_1d[9:0] = array_2d[9:0][5];"
always_comb begin
  for(int i=0; i< 10; i++) begin
    array_1d[i] = array_2d[i][5];
  end//for
end

// Can access a specific bit from the element in the array
logic [1:0] specific_bits;
// Example "array_2d[7][5][3:2]"
// unpacked: [7]-row, [5]-col
// packed [3:0]- specific bits from the element
assign specific_bits[1:0] = array_2d[7][5][3:2]; 

//Note: the order of the brackets are:
// 1. access the unpacked (left to right)
// 2. access the packed (left to right)
logic [3:0][7:0] mixed_example [31:0][95:0];
//accessing the MSB of this multi-dimensional array:
assign the_msb = mixed_example[31][95][3][7];
```

# Coding Style
## signal declaration
- implicit declaration & declaration type
In SystemVerilog declaring types are optional, but it is recommended to use them for better readability.
If you do not explicitly declare a signal type, the default type is a single bit `logic`.


- Module IO



## Naming convention
- `Module:`     
lower case, and use underscores to separate words.
```systemverilog 
  module my_module ( 
    input logic Clock,
    input logic Reset,
    ...
    );
```
- `signal:`    
Option 1: lower case, and use underscores to separate words
```systemverilog 
    logic [1:0] my_signal,
```
Option 2: CamelCase, may use underscore for specific cases
```systemverilog 
    logic [1:0] MySignal,
    logic [1:0] A2F_MySignal,
```
- `instance:`    
lower case, and use underscores to separate words
```systemverilog 
    my_module my_module_inst (
      .Clock(Clock),
      .Reset(Reset),
      ...
    );
```
- `parameters:`  
HIGH CASE, and use underscores to separate words
```systemverilog 
    parameter MY_PARAM = 10;
```
- `typedef:`    
lower case, prefix "t_", and use underscores to separate words
```systemverilog 
    typedef logic [1:0] t_my_typedef;
```
- `Pipe staging:`  
Option 1: lower case, suffix underscore "_<pipe_letter><pipe_number>" example: singal_q1, signal_q2,
```systemverilog 
    `DFF(signal_q2, signal_q1, clk)
```
Option 2: CamelCase, Suffixed PipeLetter and PipeNumber, example: SignalQ1, SignalQ2
```systemverilog 
    `DFF(SignalQ2, SignalQ1 , Clk)
```


# define, Parameter, localparam, pvalue, Package, `include
### `include
`include is used to include a file in the current file.
The pre-compiler will replace the `include with the content of the file.
The file can be a SystemVerilog file or a text file.
To allow the pre-compiler to find the file, the file must be in the same directory as the current file, or in a directory that is specified in the +incdir+ compiler option.
```systemverilog
`include "my_file.sv"
```
### `ifdef, `ifndef, `else, `endif
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

# Module, Function, Macro
In system verilog, there are multiple ways to define a block of code that can be reused.   
Note: The content of a module, function or macro must be synthesizable to be used in RTL.  
For verification, it is possible to use non-synthesizable code, and there are other options such as task, class, etc.  
## Module
A module is a collection of code that can be instantiated in other modules.
Using a module is the most common way encapsulate a logical block.
Module can be reused in multiple places in the design.
Example:
```systemverilog
module my_module (
    input logic clk,
    input logic rst,
    input t_req  in_req,
    output t_req out_rsp
);
    // module contents
    ...
endmodule
```

## Function
A function is a code that can be called from other modules.
Using a function is a good way to encapsulate a block of code that can be reused.
Is systemverilog, function are best to use in asynchronous logic, where the output is combinatorial logic of the inputs (without clock or reset).

Example:
```systemverilog
function logic [3:0] some_function(input logic [3:0] in);
    // function contents
    ...
endfunction
```

## Macro
A macro is a code that can be called from other modules.
Macros are parsed by the pre-compilation phase of the compiler, and treated by the compiler as a text replacement. This means that the macro is replaced by the text that is defined in the macro, and the compiler does not see the macro as a hierarchical block.
Macros are great for synchronous logic such non-blocking assignments -> DFF and all its variants.
This will allow us to call common logic in a single line, and not have to write it multiple times. without introducing a module or function hierarchy.
Example:
```systemverilog
`define  DFF(q,i,clk)             \
         always_ff @(posedge clk) \
            q<=i;
```



# common examples:
## Mux
In System Verilog, there are many ways to code a mux.  
We will show a couple of examples and what are the implications of them

Lets use this as the signals:
```systemverilog
logic [3:0] in [3:0];
logic [1:0] enc_sel;
logic [3:0] out ;
```

## Most compact:
```systemverilog
assign out = in[enc_sel];
```
## Naive If else
```systemverilog
always_comb begin
  if      (enc_sel == 2'b00) out =in[0];
  else if (enc_sel == 2'b01) out =in[1];
  else if (enc_sel == 2'b10) out =in[2];
  else if (enc_sel == 2'b11) out =in[3];
end
```

## compact if else - "? : "
```systemverilog
assign out = (enc_sel == 2'b00) ? in[0] : 
             (enc_sel == 2'b01) ? in[1] : 
             (enc_sel == 2'b10) ? in[2] : 
                                  in[3] ; // (enc_sel == 2'b11) 
```

## using case
```systemverilog
always_comb begin
  unique case (enc_sel) 
  2'b00   : out = in[0];
  2'b01   : out = in[1];
  2'b10   : out = in[2];
  2'b11   : out = in[3];
  default : out = in[0];
  endcase 
end
```
## AND_OR mux
```systemverilog
logic [MSB:0] in [3:0];
logic [MSB:0] dec_sel;
logic [MSB:0] out ;


 out  = ({MSB{dec_sel[0]}} & in[0] ) |
        ({MSB{dec_sel[1]}} & in[1] ) |
        ({MSB{dec_sel[2]}} & in[2] ) |
        ({MSB{dec_sel[3]}} & in[3] ) ;

```


### Counter
using macro:
``` systemverilog
assign next_count = count +1;
`DFF(count, next_count,clk)
```
alternatively can write smaller - but I do not recommend it. 
We like using the ```next_<name>``` with FF
``` systemverilog
`DFF(count, (count + 1) , clk)
```

The macro translates into:
``` systemverilog
assign next_count = count +1;
always_ff  @(posedge clk) begin
      count <= next_count; 
end
```

### State-Machine
Guidelines:
- Use an Enumerate value for the state
- Have a simple Flip-Flop to sample the state.   
Example:
```systemverilog
`RST_VAL_DFF(state, next_sate, clk, rst, IDLE)
```
- in an 'always_comb' block, calculate the next_state as a function of the current state + other condition.  
  - Use a ```unique casez```
  - May use ```priority casez``` if appropriate)
  - Make sure to have a default value
  - 
```systemverilog
//==========================
// The state Machine:
//==========================
always_comb begin
next_state = state;
unique casez (state)
    IDLE: begin
        if( condition == CONDITION_MET) begin
            next_state = FIRST_STATE;
        end // if
    end // IDLE
...
    default: begin
            next_state = state;
    end
endcase // casez
end // always_comb
```
See the example of traffic_light state_machine
https://github.com/amichai-bd/fpga_mafia/discussions/27


### Find_First

### Shift register
This is a compact and nice way to code a Shift register:
```systemverilog
logic [MSB_DATA:0] shift_register [MSB_SHFT:0]

assign shift_register[0] = data_in[MSB_DATA:0];
`DFF(shift_register[MSB_SHFT:1] , shift_register[MSB_SHFT-1:0] , clk)
```

### Register-File
example of a duel read single write register file:  
```systemverilog
logic [31:0] Register [31:0]; 
//logic [31:0][31:0] Register ; //this is valid option to.
logic [4:0] RegDst;
logic [4:0] RegSrc1;
logic [4:0] RegSrc2;
//---- The Register File  ------
`EN_DFF(Register[RegDst] , RegWrData , Clk , CtrlRegWrEn)
// --- read Register File --------
assign RegRdData1 = Register[RegSrc1];
assign RegRdData2 = Register[RegSrc2];

```

### Pipe-Line

For a pipe where we accumulate & calculate different attributes we can use a "struct" with relevant fields, and keep adding/overriding then down the pipe:
 lu_valid, lu_set,lu_tag,hit, miss, mb_hit_cancel, set_ways_mru[3:0], set_ways_valid[3:0], set_ways_victim[3:0],set_ways_hit[3:0], set_ways_enc_hit[2:0], fill_cl_data[127:0], fill_valid, lu_opcode[1:0] // RD_LU, WR_LU,FILL_LU

- Each cycle has the sampled version and the updated version (cache_pipe_lu_q2 ,pre_cache_pipe_lu_q2)
- Make sure that the assignments all match the correct suffix (q1,q2,q3...)
- The suffix (pipe stage) should change only when it goes through a Fli-Flop 
``` `DFF(pre_cache_pipe_lu_q2, cache_pipe_lu_q1, clk) ```
```systemverilog
//====================
//    Pipe stage 1
//====================
always_comb begin
  cache_pipe_lu_q1 ='0; //this is the default value
  cache_pipe_lu_q1.valid     = ...q1 ;
  cache_pipe_lu_q1.opcode    = ...q1 ;
  cache_pipe_lu_q1.set       =  ...q1 ;
  cache_pipe_lu_q1.tag       =  ...q1 ;
  cache_pipe_lu_q1.fill_data =  ...q1 ;
end //always_comb


//====================
//    Pipe stage 2
//====================
`DFF(pre_cache_pipe_lu_q2, cache_pipe_lu_q1, clk)
always_comb begin
  cache_pipe_lu_q2                         =pre_cache_pipe_lu_q2; //this is the default value
  cache_pipe_lu_q2.set_ways_valid = ...q2;
  cache_pipe_lu_q2.set_ways_tags = ...q2;
  cache_pipe_lu_q2.set_ways_mru  = ...q2;
  cache_pipe_lu_q2.set_ways_hit    = ...q2;
  cache_pipe_lu_q2.hit                    = ...q2;
  cache_pipe_lu_q2.miss                = ...q2;
  cache_pipe_lu_q2.data_array_address   = {pre_cache_pipe_lu_q2.set , pre_cache_pipe_lu_q2.set_ways_enc_hit};

end //always_comb

//====================
//    Pipe stage 3
//====================
`DFF(pre_cache_pipe_lu_q3, cache_pipe_lu_q2, clk)
always_comb begin
  cache_pipe_lu_q3                        =pre_cache_pipe_lu_q3; //this is the default value
  .. 
end
```


# Clock domain crossing
In a multi-clock domain design, the clock domain crossing (CDC) problem arises when a signal is used in a clock domain that is different from the clock domain in which it was generated.   
The CDC problem is a major concern in the design of high-performance, high-speed, and high-density systems.   
The CDC problem can be solved by using a clock domain crossing (CDC) solution.   
A CDC solution is a set of design techniques that are used to transfer data between clock domains.   
The CDC solution can be implemented
## Two flip-flop synchronizer
Meta-Flop:
The meta-flop is a two-flip-flop synchronizer that is used to transfer data between clock domains which solves the metastability problem.
The two flops are connected in series, and connected to the target clock domain.
This works will when the moving from a slower clock domain to a faster clock domain.
Incase of moving from a faster clock domain to a slower clock domain, there data will sampled only if the data is stable long enough for the target clock domain to sample it.


## Single bit — synchronizer with feedback acknowledge
## gfifo
## MCP: Multi-Cycle-Path
## PLL

# async vs sync Flop Reset
## synchronized Flop Reset
```systemverilog 
always_ff @( posedge clk) begin
   if(reset) out <=0;
   else      out <= in;
end
```

## asynchronized Flop Reset
```systemverilog 
always_ff @( posedge clk or posedge reset) begin
   if(reset) out <=0;
   else      out <= in;
end
```

# Compilation, Elaboration & Simulation
In SystemVerilog, the process of designing and testing a digital hardware system typically involves three main stages: compilation, elaboration, and simulation.

## precompile
This is the first stage of the process, where the SystemVerilog source files are preprocessed to resolve any `include statements and `macros, and to perform any other necessary preprocessing tasks. A preprocessor tool typically performs the precompile stage, which generates a preprocessed version of the source files.

## Compilation
This is the first stage of the process, where the SystemVerilog source code is compiled into an intermediate form that can be used for further processing. During compilation, the source code is checked for syntax errors and other issues and is transformed into a form that the next process stage can process.

## Elaboration
This is the second stage of the process, where the compiled code is elaborated into a structural description of the digital system. During elaboration, the code is analyzed to determine the structure and interconnections of the various modules and blocks of code in the design.

## Simulation
This is the final stage of the process, where the elaborated design is simulated to verify its behavior. During simulation, the digital system is modeled and tested using a variety of input stimuli and test cases to ensure that it behaves as expected.

