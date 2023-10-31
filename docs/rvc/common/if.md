# if
## Instruction fetch

- The instruction fetch unit is responsible for fetching instructions from the Instruction memory.
- The first stage of the pipeline in our coding style named as `CYCLE Q100H`


### instantiation of fetch module in mini_core.sv

```
//////////////////////////////////////////////////////////////////////////////////////////////////
//   _____  __     __   _____   _        ______          ____    __    ___     ___    _    _ 
//  / ____| \ \   / /  / ____| | |      |  ____|        / __ \  /_ |  / _ \   / _ \  | |  | |
// | |       \ \_/ /  | |      | |      | |__          | |  | |  | | | | | | | | | | | |__| |
// | |        \   /   | |      | |      |  __|         | |  | |  | | | | | | | | | | |  __  |
// | |____     | |    | |____  | |____  | |____        | |__| |  | | | |_| | | |_| | | |  | |
//  \_____|    |_|     \_____| |______| |______|        \___\_\  |_|  \___/   \___/  |_|  |_|
//
//////////////////////////////////////////////////////////////////////////////////////////////////
// Instruction fetch
// -----------------
// 1. Send the PC (program counter) to the I_MEM
// 2. Calc/Set the NextPc
// -----------------
//////////////////////////////////////////////////////////////////////////////////////////////////
mini_core_if mini_core_if (
  .Clock        (Clock       ), // input  logic        Clock,
  .Rst          (Rst         ), // input  logic        Rst,
  .ReadyQ100H   (ReadyQ100H  ), // input  logic        ReadyQ100H,
  .ReadyQ101H   (ReadyQ101H  ), // input  logic        ReadyQ101H,
  .Ctrl         (CtrlIf        ), // input  t_ctrl_if    Ctrl,
  .AluOutQ102H  (AluOutQ102H ), // input  logic [31:0] AluOutQ102H,
  .PcQ100H      (PcQ100H     ), // output logic [31:0] PcQ100H,
  .PcQ101H      (PcQ101H     ) // output logic [31:0] PcQ101H
);
```

### Signal description

- Clock: Clock signal. That signal is a part of mini_core inputs. and declare as :`input  logic  Clock`
- Rst: Reset signal. That signal is a part of mini_core inputs. and declare as :`input  logic  Rst`
- ReadyQ100H: its the enable signal of Pc register.
- ReadyQ101H: its the enable signal of IF/ID register.
- CtrlIf: This is a part of `typedef struct packed` (see mini_core_pkg.vh file) variable. Its connected to the mux ctrl input (as seen in the sketch below) to determine the next PC. 
- AluOutQ102H: its the output of ALU from `Q102H` execution stage and determine the next PC in case of `JAL, JALR, BRANCH` instructions.
- PcQ100H: its the output of Pc register.
- PcQ101H: its the input of IF/ID register.

### Fetch module mini_core_if.sv
```
`include "macros.sv"

module mini_core_if 
import common_pkg::*;
(
    input  logic        Clock,
    input  logic        Rst,
    input  var t_ctrl_if    Ctrl,
    input  logic        ReadyQ100H,
    input  logic        ReadyQ101H,
    input  logic [31:0] AluOutQ102H,
    output logic [31:0] PcQ100H,
    output logic [31:0] PcQ101H
);

logic [31:0] PcPlus4Q100H;
logic [31:0] NextPcQnnnH;
assign PcPlus4Q100H = PcQ100H + 3'h4;
assign NextPcQnnnH  = Ctrl.SelNextPcAluOutQ102H ? AluOutQ102H : PcPlus4Q100H;
`MAFIA_EN_RST_DFF(PcQ100H, NextPcQnnnH, Clock, ReadyQ100H, Rst)

// Q100H to Q101H Flip Flops. 
`MAFIA_EN_DFF(PcQ101H, PcQ100H, Clock, ReadyQ101H)

endmodule
```

### mini_core_if module abstract diagram   
**------------------------------------------------------------------------------------------------------------------------**

![if_fetch](/drawio/if_fetch.jpg)

**------------------------------------------------------------------------------------------------------------------------**