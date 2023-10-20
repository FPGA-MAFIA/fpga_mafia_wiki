# ctrl
## mini_core controller

- After you understood the mini_core architecture, you can start to understand the mini_core controller.   
- The mini_core controller is the main module of the mini_core implemented as a combination logic.
- The controller is a part of Q101H stage of the pipeline.

- The controller goals are:   
 1) Create all control signals, enable signals and select signal for each stage of the pipeline in the data path.   
 2) Responsible for the control hazard and Load hazard detection.   
 3) Get the instruction from I_MEM and use the decoder to set the Ctrl Bits.   
 4) Construct the Immediate types.   
 5) Use the rs1 & rs2 (RegSrc) to read the Register file data.   
 6) Flush pipe line in case of branch or jump.   



### Instantiation of mini_core controller in mini_core.sv

```
mini_core_ctrl mini_core_ctrl (
  .Rst                  (Rst    ), //input
  .Clock                (Clock  ), //input
  // input instruction 
  .PreInstructionQ101H  (PreInstructionQ101H), //input
  .PcQ101H              (PcQ101H), // output logic [31:0] PcQ101H
  // input feedback from data path
  .BranchCondMetQ102H   (BranchCondMetQ102H), //input
  .DMemReady            (DMemReady), //input
  // ready signals for "back-pressure" - use as the enable for the pipe stage sample
  .ReadyQ100H           (ReadyQ100H), //  output 
  .ReadyQ101H           (ReadyQ101H), //  output 
  .ReadyQ102H           (ReadyQ102H), //  output 
  .ReadyQ103H           (ReadyQ103H), //  output 
  .ReadyQ104H           (ReadyQ104H), //  output 
  // output ctrl signals
  .CtrlIf               (CtrlIf             ), //output
  .CtrlRf               (CtrlRf             ), //output
  .CtrlExe              (CtrlExe            ), //output
  .CtrlMem              (CtrlMem            ), //output
  .CtrlWb               (CtrlWb             ), //output
  // output data path signals
  .ImmediateQ101H       (ImmediateQ101H     ) //output
);
```

### Signal description
- `preInstructionQ101H:` That signal is an input to mini_core controller. It is the instruction that comes from instruction memory.
- `BranchCondMetQ102H:` That signal comes from Q102H stage and indicates if the branch condition is met. [Click here](docs/rvc/common/exe.md) to learn more.
- `CtrIf, CtrlRf, CtrlExe, CtrlMem, CtrlWb:` These signals are output from mini_core controller. They are the control signals for each stage of the pipeline. Those signals are a part of `typedef struct packed named t_ctrl_if, t_ctrl_rf, t_ctrl_exe, t_ctrl_mem, t_ctrl_wb` (see mini_core_pkg.vh file) variables. We saw all of them in the previous sections.

### mini_core controller module mini_core_ctrl.sv

- The full code of the mini_core controller located at `/src/mini_core/mini_core_ctrl.sv`.

### Load Hazard 

- A load hazard is not the same as a data hazard we talked about before in the execution stage. A data hazard happens when the data we want is in the pipeline but not in the right place yet. On the other hand, a load hazard occurs when we need data right now, but it hasn't been figured out yet. In these situations, we have to stall (stop) the pipeline and wait until the data becomes available.   
- Lets have a look at the following instruction that causes load hazard

```
lw x1, imm(x2)  #Q102H
add x3, x1, x4  #Q101H
```
In the second instruction we need the data from the first instruction, but the data is not ready yet. We have to stall the pipeline and wait until the data becomes available.

- The following code shows how we detect load hazard in the mini_core controller is detected.

```
assign LoadHzrdDetectQ101H       = Rst ? 1'b0 : 
                                 ((PreRegSrc1Q101H == CtrlQ102H.RegDst) && (CtrlQ102H.Opcode == LOAD)) ? 1'b1:
                                 ((PreRegSrc2Q101H == CtrlQ102H.RegDst) && (CtrlQ102H.Opcode == LOAD)) ? 1'b1:
                                                                                                         1'b0;
```
- Note that load hazard detection is done in Q101H stage. We compare the destination register of the previous instruction located in Q102H stage with the source registers of the current instruction located Q101H stage. If the previous instruction is a load instruction and the destination register of the previous instruction is the same as the source register of the current instruction, then we have a load hazard. In this case we have to stall the pipeline and wait until the data becomes available.

- To solve that problem we do the following things:    
1) Stall Pc in Q100H stage
2) Disenable IF/ID register  
```
assign ReadyQ101H = (!CoreFreeze) && !(LoadHzrdDetectQ101H); //
assign ReadyQ100H = (!CoreFreeze) && ReadyQ101H;//
```
3) Inserting bubble (NOP)[^1] into Q101H stage. 
 
 ```
 assign InstructionQ101H = flushQ102H          ? NOP :
                          flushQ103H          ? NOP :
                          LoadHzrdDetectQ101H ? NOP : 
                                                PreInstructionQ101H;
 assign PreValidInstQ101H = flushQ102H          ? 1'b0 : 
                           flushQ103H          ? 1'b0 : 
                           LoadHzrdDetectQ101H ? 1'b0 : 
                                                 1'b1 ;
 ```
* flush signals will be discussed soon.

### Lets take a more detailed look

 - Step1  - load hazard detected (happens concurrently with step 2)
 
 |  Q100H              | Q101H           | Q102H          |   Notes                    |
 |---------------------|-----------------|----------------|----------------------------|
 |  Pc is stalled      | add x3, x1, x4  | lw x1, imm(x2) | LoadHzrdDetectQ101H = 1'b1 |

 - Step2 - response to load hazard

 |  Q100H                                             | Q101H                | Q102H          |   Notes                    |
 |----------------------------------------------------|----------------------|----------------|----------------------------|
 |  Pc is stalled, still points on add x3, x1, x4     | addi x0, x0, 0 (NOP) | lw x1, imm(x2) | LoadHzrdDetectQ101H = 1'b1 |

- Step 3 - load hazard been handled

 |  Q100H              | Q101H           | Q102H                    |   Q103H         |   Notes                   |
 |---------------------|-----------------|--------------------------|-----------------|---------------------------|
 |  Enabe Pc           | add x3, x1, x4  | addi x0, x0, 0 (NOP)     |  lw x1, imm(x2) |LoadHzrdDetectQ101H = 1'b0 |
 
 - Step 4

 |  Q100H              | Q101H           | Q102H              |   Q103H               | Q104H         |  Notes     |
 |---------------------|-----------------|--------------------|-----------------------|---------------|------------|
 |  Enabe Pc           | new instruction | add x3, x1, x4     |  addi x0, x0, 0 (NOP) |lw x1, imm(x2) | forwarding |




### Control Hazard 
Control hazard occurs when we have a branch or jump instruction. In this case we have to flush the pipeline and start fetching instructions from the new address.

- Lets have a look at the following instruction that causes control hazard

case1 (No Control Hazard)
```
beq x1, x2, label1  #Q102H
add x3, x1, x4      #Q101H
add x5, x6, x7      #Q100H
```
if x1 != x2 then we execute the instruction in Q101H and Q100H as usual.

case2 (Control Hazard)
```
beq x1, x2, label1  #Q102H
add x3, x1, x4      #Q101H
add x5, x6, x7      #Q100H
```

if x1 == x2 then it means that we have to flush the instructions in Q101H and Q100H and start fetching instructions from the new address.
 - flush in our context means that we have to change instructions on Q100H and Q101H into NOP's instruction into the pipeline. In this case we have to insert **2 NOP**.

 ```
 logic IndirectBranchQ102H;
assign IndirectBranchQ102H = (CtrlQ102H.SelNextPcAluOutB && BranchCondMetQ102H) || (CtrlQ102H.SelNextPcAluOutJ);
assign flushQ102H = IndirectBranchQ102H;
`MAFIA_EN_DFF(flushQ103H , flushQ102H   , Clock , ReadyQ103H)
assign InstructionQ101H = flushQ102H          ? NOP :
                          flushQ103H          ? NOP :
                          LoadHzrdDetectQ101H ? NOP : 
                                                PreInstructionQ101H;
assign PreValidInstQ101H = flushQ102H          ? 1'b0 : 
                           flushQ103H          ? 1'b0 : 
                           LoadHzrdDetectQ101H ? 1'b0 : 
                                                 1'b1 ;
 ```
- IndirectBranchQ102H is a signal that indicates if we have a branch or jump instruction. If we have a branch or jump instruction then we have to flush the pipeline.
- When flashQ102H is high, it means that we insert NOP into the actual Q101H stage. In order to insert another nop in the next cycle we use the following code to let flash moves threw the pipeline
```
`MAFIA_EN_DFF(flushQ103H , flushQ102H   , Clock , ReadyQ103H)
```

### Back pressure
- Back pressure is a way we can stop the pipeline from moving forward. We use back pressure when we have a load hazard or memory access with read latency higher than 1. In this case we have to stop the pipeline and wait until the data becomes available.
```
assign ReadyQ104H = (!CoreFreeze);
assign ReadyQ103H = (!CoreFreeze);
assign ReadyQ102H = (!CoreFreeze);//
assign ReadyQ101H = (!CoreFreeze) && !(LoadHzrdDetectQ101H); //
assign ReadyQ100H = (!CoreFreeze) && ReadyQ101H;//
```


### Control signals goes threw the pipeline
```
// Sample the Ctrl bits though the pipe
`MAFIA_EN_RST_DFF(CtrlQ102H, CtrlQ101H, Clock, ReadyQ102H, Rst )
`MAFIA_EN_DFF    (CtrlQ103H, CtrlQ102H, Clock, ReadyQ103H )
`MAFIA_EN_DFF    (CtrlQ104H, CtrlQ103H, Clock, ReadyQ104H )
```

### ebreak detection
- Used for debug purposes to indicates end of program.
```
logic ebreak_was_calledQ101H; 
assign ebreak_was_calledQ101H = (InstructionQ101H == 32'b000000000001_00000_000_00000_1110011);
```



### note
- there are more code in the mini_core controller that we didn't discuss here because its relatively simple and easy to understand. For example, the code that responsible for the immediate types construction, AluOp construction, etc.


[^1]: NOP means addi x0, x0, 0 or 0x00000013H