
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
<br />
<br />

