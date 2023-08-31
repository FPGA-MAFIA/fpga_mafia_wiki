# SystemVerilog Types
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

## System-Verilog typedef
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

## Parameter, localparam, Package
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


