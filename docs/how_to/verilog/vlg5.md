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


