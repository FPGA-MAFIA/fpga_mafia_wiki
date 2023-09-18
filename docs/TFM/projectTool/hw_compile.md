### Compilation
In simple terms, compilation is a process that looks for errors in your code. These errors can be related to syntax or hardware issues, broadly speaking.   
In that part, we'll go through all the basic steps needed for writing system Verilog, fixing any issues, and observing the outcomes in simulation.

1. write a simple systemverilog module: `test.sv` 
    ```
    module test (
        input  logic in_0,
        input  logic in_1,
        output logic out
    );
    assign out = in_0 & in_1;
    endmodule
    ```  
2. write a simple systemverilog test bench module: `test_tb.sv`
    ```  
    module test_tb ();
    logic in_0;
    logic in_1;
    logic  out;
    initial begin : assign_input
        in_0 = 1'b0;
        in_1 = 1'b0; // 0&0
    #4 $display("out = in_0 & in_1:\n    > %b = %b & %b",out ,in_0, in_1);
    #4 in_1 = 1'b1; // 0&1
    #4 $display("out = in_0 & in_1:\n    > %b = %b & %b",out ,in_0, in_1);
    #4 in_0 = 1'b1; // 1&1
    #4 $display("out = in_0 & in_1:\n    > %b = %b & %b",out ,in_0, in_1);
    #4 $finish;
    end// initial
    test test_and (
        .in_0(in_0),
        .in_1(in_1),
        .out(out)
    );
    endmodule // test_tb
    ```  
3. List the files & include dirs for model: `test_list.f`
    ```
    touch test_list.f
    code test_list.f
    ```
    Insert file names into `test_list.f` file
    ```
    test.sv
    test_tb.sv
    ```
4. Make directory called `"work"`
   ```
   mkdir work
   ```
5. Compile systemverilog using the following command.
   ```
   vlog.exe -f test_list.f
   ```
       
If everything is fine, you should receive a message saying that there are no errors.

### troubleshooting
- Your PATH might contain Hebrew letters or a mix of characters. 
- Please run compile command outside `WORK` folder