# Intro to System-Verilog

## System-Verilog vs Verilog
Verilog and SystemVerilog are both hardware description languages (HDLs) that are used to model, design, and verify digital and mixed-signal systems. Verilog is a standard in the field of electronic design automation (EDA) and is widely used for design and verification of digital circuits. SystemVerilog is an extension of Verilog that includes additional features and capabilities for more advanced design and verification tasks.



## Assignments: always vs assign
In SystemVerilog, the assign and always statements are used to specify the behavior of a digital circuit.   
The main difference between these two statements is the type of behavior they can describe.
### Assign
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

### Always and SystemVerilog always type
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

## System-Verilog typedef:
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
<br />
<br />

