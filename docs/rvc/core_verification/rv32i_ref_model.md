rv32i_ref_model
### Introduction
- `rv32i_ref_model` serves as a foundational model that implements the RV32I RISC-V ISA. This model, composed in a behavioral style using SystemVerilog, is designed to aid in the verification of other cores. It is employed with the assumption of its correctness, contributing to the validation process. This core acts loke a single-cycle CPU.
- The model can be instantiated in a testbench of core which is being verified. Than we can use some [tasks](/docs/rvc/core_verification/checker_tasks.md) to compare between the signals of the core and the model. If the signals are not the same, the tasks will raise an error depending on the task.
- The model is located at `/verif/rv32i_ref/tb/rv32i_ref.sv`. Take a look at that file to understand its functionality, its relatively easy :blush:
### ref32i_ref_model interface
```
module rv32i_ref 
#(  
    parameter I_MEM_LSB = 'h0_0000,
    parameter I_MEM_MSB = 'h1_0000 - 1'h1,
    parameter D_MEM_LSB = 'h1_0000,
    parameter D_MEM_MSB = 'h2_0000 - 1'h1 
) (
    input clk,
    input rst,
    input run
);
```
- `I_MEM_LSB` and `I_MEM_MSB` are the lower and upper bounds of the instruction memory. `D_MEM_LSB` and `D_MEM_MSB` are the lower and upper bounds of the data memory.   
- clk: clock signal. rst: reset signal. run: run signal, when run is high, the model will retire the instruction. Its possible to put some logic on `run` when we want to stop the model from executing instructions which are not relevant to the test or to the ref model.

### Instantiation of the model
- The best way to understand how to instantiate the model is to look at the testbench of the core which is being verified. In the next example we will look at `mini_core tb.sv`, that testbench is located at `/verif/mini_core/tb/mini_core_tb.sv`.   

```
rv32i_ref
# (
    .I_MEM_LSB (I_MEM_OFFSET_MINI),
    .I_MEM_MSB (I_MEM_MSB_MINI),
    .D_MEM_LSB (D_MEM_OFFSET_MINI),
    .D_MEM_MSB (D_MEM_MSB_MINI)
)  rv32i_ref (
.clk    (Clk),
.rst    (Rst),
.run    (1'b1) // set the RUN only when the mini_core DUT is retiring the instruction.
               // every time the run is set, the next instruction is executed
);
```
- The parameters `I_MEM_LSB`, `I_MEM_MSB`, `D_MEM_LSB` and `D_MEM_MSB` are located in the package file. In the case of the mini_core, the package file is located at `/source/mini_core/mini_core_pkg.sv`.

- In the following code we force the verified core and rv32i_ref_model core with the same instruction and data memory. 
- The tasks `get_rf_write` and `get_ref_rf_write` are used to compare between the register file of the core and the rv32i_ref_model. 
```
integer file;
initial begin: test_seq
    if ($value$plusargs ("STRING=%s", test_name))
        $display("STRING value %s", test_name);
    //======================================
    //load the program to the DUT & reference model
    //======================================
    // Make sure inst_mem.sv exists
    file = $fopen({"../../../target/mini_core/tests/",test_name,"/gcc_files/inst_mem.sv"}, "r");
    if (!file) begin
        $error("the file: ../../../target/mini_core/tests/%s/gcc_files/inst_mem.sv does not exist", test_name);
        $display("ERROR: inst_mem.sv file does not exist");
        $finish;
    end
    $readmemh({"../../../target/mini_core/tests/",test_name,"/gcc_files/inst_mem.sv"} , IMem);
    force mini_core_top.mini_mem_wrap.i_mem.mem = IMem; //backdoor to actual memory
    force rv32i_ref.imem                        = IMem; //backdoor to reference model memory
    //load the data to the DUT & reference model 
    file = $fopen({"../../../target/mini_core/tests/",test_name,"/gcc_files/data_mem.sv"}, "r");
    if (file) begin
        $fclose(file);
        $readmemh({"../../../target/mini_core/tests/",test_name,"/gcc_files/data_mem.sv"} , DMem);
        force mini_core_top.mini_mem_wrap.d_mem.mem = DMem; //backdoor to actual memory
        force rv32i_ref.dmem                        = DMem; //backdoor to reference model memory
        #10
        release mini_core_top.mini_mem_wrap.d_mem.mem;
        release rv32i_ref.dmem;
    end
    
    //=======================================
    // enable the checker data collection (monitor)
    //=======================================
    fork
    get_rf_write();
    get_ref_rf_write();
    begin wait(mini_core_top.mini_core.mini_core_ctrl.ebreak_was_calledQ101H == 1'b1);
        eot(.msg("ebreak was called"));
    end
    join

end // test_seq
```

