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

