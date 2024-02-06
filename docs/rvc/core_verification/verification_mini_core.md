# verification_mini_core
## Strategy
The mini core is a bit more compicated IP due to its versatility. we cannot use a simple method of checking inputs and outputs only, we need to add a reference model(RM).
after that the RM is added we can activate a DI checker that will check any differences between the RM result and the real result.
Note - we do not have UVM the we created the RM like an SV module i.e it is a module that we instansiate inside the TB (in UVM we are using pure software to the RM and we send through a portal called TLM).
## RM
The RM is a module that build as a massive switch case that its output is the expected result from the mini core.
for example:
```systemverilog
...
assign U_ImmediateQ101H = {     instruction[31:12], 12'b0 } ;             
...                                                // U_Immediate
assign rd               = instruction[11:7];
...
casez (instruction)
    //=======================================================
    // LUI
    //=======================================================
    32'b????????????????????_?????_0110111: begin
        instr_type       = LUI;
        next_regfile[rd] = U_ImmediateQ101H;
        reg_wr_en        = 1'b1;
    end
...
    endcase
```
in this case the command is LUI (load upper immediate) so we load the next_regfile[rd] with the relevant data (straight forward from the RISC-V spec).
This is done to all the commands so at the end we have all the expected results from any input.

## mini_core_tb
The next part is to combine the real 5-stage pipe line mini core and the RM in one TB and to activate a checker that will compare the results.
The first part of the TB is to load the IMEM and DMEM that were created by the linker after the compiliation of the C file.
```systemverilog
    ...
    $readmemh({"../../../target/mini_core/tests/",test_name,"/gcc_files/inst_mem.sv"} , IMem);
    force mini_core_top.mini_mem_wrap.i_mem.mem = IMem; //backdoor to actual memory
    force rv32i_ref.imem                        = IMem; //backdoor to reference model memory
    file = $fopen({"../../../target/mini_core/tests/",test_name,"/gcc_files/data_mem.sv"}, "r");
    if (file) begin
        $fclose(file);
        $readmemh({"../../../target/mini_core/tests/",test_name,"/gcc_files/data_mem.sv"} , DMem);
        force mini_core_top.mini_mem_wrap.d_mem.mem = DMem; //backdoor to actual memory
        force rv32i_ref.dmem                        = DMem; //backdoor to reference mode
        release rv32i_ref.dmem;
    end
    ...
```
as we can see we are loading the same memory to the RM and to the real mini core.

The next part is to collect the data of the RM and the real mini core and after the end of the test we will activate the DI checker.
this is done like this:
```systemverilog
  fork
    get_rf_write(); // real mini core
    get_ref_rf_write(); // RM
    begin wait(mini_core_top.mini_core.mini_core_ctrl.ebreak_was_calledQ101H == 1'b1);
        eot(.msg("ebreak was called"));
    end
  join
```
In this code we activate the collectors of the real mini core and the RM at the same time (using fork join). When the test is over (i.e ebreak is called) then we are activating the DI checker (inside the eot function).

The two collectors works in the same way:
```systemverilog
task get_ref_rf_write();
fork forever begin 
    @(posedge Clk) begin
        if (rv32i_ref.reg_wr_en) begin
            ref_rf_cur_write.RegDst = rv32i_ref.rd;
            ref_rf_cur_write.Data   = rv32i_ref.next_regfile[rv32i_ref.rd];
            ref_rf_cur_write.Pc     = rv32i_ref.pc;
            ref_rf_cur_write.cur_time   = $time;
            if (rv32i_ref.rd != 5'b0) begin
                ref_rf_write_history.push_back(ref_rf_cur_write);
            end
        end
    end
end
join_none
endtask
```
They are both processes that are run in the background (using fork - join_none), each one of them is collecting the data in to an SV queue, in this case ref_rf_write_history, and at the end both queues will be compared.

The DI checker is activated after the ebreak, at this point the mini core end the flow end arrive to the ebreak which is the last command of the IMem.
```systemverilog
string msg = "Data integrity test passed"; // default
task di_register_write();
foreach(rf_write_history[i])begin
    if ((ref_rf_write_history[i].RegDst == rf_write_history[i].RegDst ) && 
        (ref_rf_write_history[i].Data   == rf_write_history[i].Data   ) )
    begin
        $display(" >> rf_write_history[%0d] Match: time: %0d, PC: %8h, RegDsd: %d, Data: %h", i, rf_write_history[i].cur_time,
                                                                                                 rf_write_history[i].Pc,
                                                                                                 rf_write_history[i].RegDst,
                                                                                                 rf_write_history[i].Data);
    end else begin
        $display(" >> rf_write_history[%0d] Mismatch!!", i);
        $error("ERROR: rf_write_history mismatch");
        $display("      ref_rf_write_history[%0d] =   {time: %0d, Pc: %8h, RegDst: %d, Data: %h}", i, ref_rf_write_history[i].cur_time, ref_rf_write_history[i].Pc, ref_rf_write_history[i].RegDst, ref_rf_write_history[i].Data);
        $display("      rf_write_history    [%0d] =   {time: %0d, Pc: %8h, RegDst: %d, Data: %h}", i, rf_write_history[i].cur_time    , rf_write_history[i].Pc    , rf_write_history[i].RegDst    , rf_write_history[i].Data    );
        msg = "Data integrity test failed - rf_write_history mismatch";
    end
end

if(ref_rf_write_history.size() != rf_write_history.size()) begin
    $error("ERROR: rf_write_history size mismatch");
    msg = "Data integrity test failed - rf_write_history size mismatch";
end else begin
    $display("rf_write_history size match");
end
$display("Data Integrity final status: %s", msg);
$display("===============================\n");
endtask
```
This DI checker is comparing all the data from the collectors and reports which if there is a mismatch. There are several issues that can occur, the first one is that the output data from a specific input is different between the RM and the real mini core. The second error is a case when the mini core has to many or to few transactions inside of his collector, this can point that the mini core got stuck in some point or that it is creating transactions with no control.

## Trackers
The trackers are a complemantary debug tool that can help us find the exact problem in the exact time that it occurs. The process of the debug is that the DI checker point to a problem in a specific transaction, but since it is a post process it cannot tell us the time to debug it in the waves, so in the tracker we search for the relevant transaction and it will show us the time that the event occured.




