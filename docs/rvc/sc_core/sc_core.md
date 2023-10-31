 ### sc_core.sv file
Now we are going to look at the `sc_core.sv` file. That file is located at `/source/sc_core/sc_core.sv` folder.  

- Please use the figure [here](/docs/rvc/sc_core/intro.md) to understand the cpu stages.

### module signals
```
//-----------------------------------------------------------------------------
// Title            : single cycle core design
// Project          : 
//-----------------------------------------------------------------------------
// File             : 
// Original Author  : Amichai Ben-David
// Code Owner       : 
// Created          : 11/2022
//-----------------------------------------------------------------------------
// Description :
// This is the top level of the single cycle core design.
// The core is a 32 bit RISC-V core.
// compatible with the RV32I base instruction set.
// Fetch, Decode, Execute, Memory, WriteBack all in one cycle.
// The PC (program counter) is the synchronous element in the core 
//-----------------------------------------------------------------------------
`include "macros.sv"

module sc_core
import sc_core_pkg::*;
(
    input logic Clk,
    input logic Rst,
    // interface with instruction memory
    output logic [31:0] Pc,
    input  logic [31:0] Instruction,
    // interface with Data Memory
    output logic [31:0] DMemAddress,
    output logic [31:0] DMemData   ,
    output logic [3:0]  DMemByteEn ,
    output logic        DMemWrEn   ,
    output logic        DMemRdEn   ,
    input  logic [31:0] DMemRspData
);
```

`Clk` - core clock 
`Rst` - core reset. We use that signal to reset Pc to 0.
#### interface with instruction memory
Pc value is sended to the instruction memory. The instruction memory returns the instruction that is located at the Pc address. Because the core is a single cycle the memory read must be asynchronous.    

Instruction memory Granularity is 8-bit.

#### interface with data memory
- `DMemAddress` - address to the data memory
- `DMemData` - data to be written to the data memory
- `DMemByteEn` - byte enable to the data memory. used for byte and half word instructions
- `DMemWrEn` - write enable to the data memory
- `DMemRdEn` - read enable to the data memory
- `DMemRspData` - data that is read from the data memory   

Data memory Granularity is 8-bit.

### Signal declaration

There in no need to explain the signal declaration and the best way to understand what each signal does is to look at the code and the figure [here](/docs/rvc/sc_core/intro.md).

```
// signal declination
//Data-Path signals
logic [31:0]        NextPc;
logic [31:0]        PcPlus4;
logic [31:1][31:0]  Register; 
logic [31:0]        Immediate;
logic [4:0]         Shamt;
logic [31:0]        PreDMemRdData;
logic [31:0]        AluIn1; 
logic [31:0]        AluIn2; 
logic [31:0]        AluOut;
logic [31:0]        RegRdData1; 
logic [31:0]        RegRdData2; 
logic [31:0]        RegWrData; 
logic [31:0]        WrBackData;
//Ctrl Bits
logic               SelNextPcAluOut;
logic               SelRegWrPc; 
logic               BranchCondMet;
logic               SelDMemWb;
logic               CtrlLui;
logic               CtrlRegWrEn;
logic [2:0]         Funct3;
logic [6:0]         Funct7;
logic [4:0]         RegSrc1, RegSrc2, RegDst;
logic [3:0]         CtrlDMemByteEn;
logic               CtrlDMemWrEn;
logic               CtrlSignExt;
logic               SelAluPc ;
logic               SelAluImm;
t_immediate         SelImmType;
t_alu_op            CtrlAluOp;
t_branch_type       CtrlBranchOp;
t_opcode            Opcode;
```

### Instruction fetch

```
//===========================================================================
// Instruction fetch
// 1. Send the PC (Program Counter) to the I_MEM.
// 2. Set the Next Pc -> Pc+4 or Calculated Address.
//===========================================================================
assign PcPlus4  = Pc + 32'd4;
assign NextPc   = SelNextPcAluOut ? AluOut : PcPlus4;
`MAFIA_RST_DFF( Pc, NextPc , Clk, Rst )
```

That block is responsible for fetching the instruction from the instruction memory. Pc can be changed by the `JAL/JALR/BRANCH` instruction calculated in the execute stage or incremented by 4 in the case of a normal instruction. 


### Instruction Decode part 1

```

//===========================================================================
// Decode
// 1. Get the instruction from I_MEM and use the "decoder" to set the Ctrl Bits.
// 2. Construct the Immediate types.
// 3. Use the RS1 & RS2 (RegSrc) to read the Register file data.
//===========================================================================
assign Opcode = t_opcode'(Instruction[6:0]);
assign Funct3 = Instruction[14:12];
assign Funct7 = Instruction[31:25];

assign SelNextPcAluOut = (Opcode == JAL) || (Opcode == JALR) || ((Opcode == BRANCH) & (BranchCondMet));
assign SelRegWrPc      = (Opcode == JAL) || (Opcode == JALR);
assign SelAluImm       = !(Opcode == R_OP);
assign SelAluPc        = (Opcode == JAL) || (Opcode == BRANCH) || (Opcode == AUIPC);
assign SelDMemWb       = (Opcode == LOAD);
assign CtrlRegWrEn     = (Opcode == LUI ) || (Opcode == AUIPC) || (Opcode == JAL)  || (Opcode == JALR) ||
                         (Opcode == LOAD) || (Opcode == I_OP)  || (Opcode == R_OP) || (Opcode == FENCE);
assign CtrlDMemWrEn    = (Opcode == STORE);
assign CtrlSignExt     = (Opcode == LOAD) & (!Funct3[2]);                     
assign CtrlDMemByteEn  = ((Opcode == LOAD) || (Opcode == STORE)) && (Funct3[1:0] == 2'b00) ? 4'b0001 :// LB || SB
                         ((Opcode == LOAD) || (Opcode == STORE)) && (Funct3[1:0] == 2'b01) ? 4'b0011 :// LH || SH
                         ((Opcode == LOAD) || (Opcode == STORE)) && (Funct3[1:0] == 2'b10) ? 4'b1111 :// LW || SW
                                                                                            4'b0000 ;                      
assign CtrlBranchOp    = t_branch_type'(Funct3);  
assign SimulationDone  = (Opcode == SYSCAL);
```
The most interesting part here is the `assign Opcode = t_opcode'(Instruction[6:0]);`, because every thing else is relatively intuitive.   

`t_opcode` is an enum that is defined in the `sc_core_pkg.sv` file.   `Opcode` is defined in previous section and it can be one of the following values: `LUI, AUIPC, JAL, JALR, BRANCH, LOAD, STORE, I_OP, R_OP, FENCE, SYSCAL`. 

`Instruction[6:0]` is a value that represents the opcode of the instruction, because its type is logic, we need to make  **casting** to `t_opcode` type. We do that by adding the
 **t_opcode'** casting operator.

### Instruction Decode part 2
```
always_comb begin
    unique casez ({Funct3, Funct7, Opcode})
    //-----LUI type-------
    {3'b???, 7'b???????, LUI } : CtrlAluOp = IN_2;//LUI
    //-----R type-------
    {3'b000, 7'b0000000, R_OP} : CtrlAluOp = ADD; //ADD
    {3'b000, 7'b0100000, R_OP} : CtrlAluOp = SUB; //SUB
    {3'b001, 7'b0000000, R_OP} : CtrlAluOp = SLL; //SLL
    {3'b010, 7'b0000000, R_OP} : CtrlAluOp = SLT; //SLT
    {3'b011, 7'b0000000, R_OP} : CtrlAluOp = SLTU;//SLTU
    {3'b100, 7'b0000000, R_OP} : CtrlAluOp = XOR; //XOR
    {3'b101, 7'b0000000, R_OP} : CtrlAluOp = SRL; //SRL
    {3'b101, 7'b0100000, R_OP} : CtrlAluOp = SRA; //SRA
    {3'b110, 7'b0000000, R_OP} : CtrlAluOp = OR;  //OR
    {3'b111, 7'b0000000, R_OP} : CtrlAluOp = AND; //AND
    //-----I type-------
    {3'b000, 7'b???????, I_OP} : CtrlAluOp = ADD; //ADDI
    {3'b010, 7'b???????, I_OP} : CtrlAluOp = SLT; //SLTI
    {3'b011, 7'b???????, I_OP} : CtrlAluOp = SLTU;//SLTUI
    {3'b100, 7'b???????, I_OP} : CtrlAluOp = XOR; //XORI
    {3'b110, 7'b???????, I_OP} : CtrlAluOp = OR;  //ORI
    {3'b111, 7'b???????, I_OP} : CtrlAluOp = AND; //ANDI
    {3'b001, 7'b0000000, I_OP} : CtrlAluOp = SLL; //SLLI
    {3'b101, 7'b0000000, I_OP} : CtrlAluOp = SRL; //SRLI
    {3'b101, 7'b0100000, I_OP} : CtrlAluOp = SRA; //SRAI
    //-----Other-------
    default                    : CtrlAluOp = ADD; //AUIPC || JAL || JALR || BRANCH || LOAD || STORE
    endcase
end
```

That code defines a combinational logic block using the `always_comb` keyword. The code is using a case statement to determine the value of CtrlAluOp based on the values of `Funct3, Funct7, and Opcode`. 

- The always_comb block indicates that this logic should always be computed whenever the inputs change.

- `unique casez`` is a unique case statement that allows for the most specific match to be used, meaning that if multiple conditions match, only the first one encountered will be executed.

- Inside the case block, the code checks various combinations of `Funct3, Funct7`, and Opcode values using pattern matching.

Depending on the values of these inputs, different values are assigned to the CtrlAluOp variable, which is used in further logic or hardware.

- For example, if Funct3 is 3'b???', Funct7 is 7'b???????, and Opcode is LUI, then CtrlAluOp is set to IN_2.

The default case at the end of the case block specifies what happens when none of the specified conditions match. In this case, CtrlAluOp is set to ADD.


### Instruction Decode part 3

```
//  Immediate Generator
always_comb begin
    unique casez (Opcode)    //mux
    JALR, I_OP, LOAD : SelImmType = I_TYPE;
    LUI, AUIPC       : SelImmType = U_TYPE;
    JAL              : SelImmType = J_TYPE;
    BRANCH           : SelImmType = B_TYPE;
    STORE            : SelImmType = S_TYPE;
    default          : SelImmType = I_TYPE;
  endcase
  unique casez (SelImmType)    //mux
    U_TYPE : Immediate = {     Instruction[31:12], 12'b0 } ;                                                            //U_Immediate;
    I_TYPE : Immediate = { {20{Instruction[31]}} , Instruction[31:20] };                                                //I_Immediate;
    S_TYPE : Immediate = { {20{Instruction[31]}} , Instruction[31:25] , Instruction[11:7]  };                           //S_Immediate;
    B_TYPE : Immediate = { {20{Instruction[31]}} , Instruction[7]     , Instruction[30:25] , Instruction[11:8]  , 1'b0};//B_Immediate;
    J_TYPE : Immediate = { {12{Instruction[31]}} , Instruction[19:12] , Instruction[20]    , Instruction[30:21] , 1'b0};//J_Immediate;
    default: Immediate = {     Instruction[31:12], 12'b0 };                                                             //U_Immediate;
  endcase
end                
```

This code defines a combinational logic block using the always_comb keyword. It determines the value of SelImmType based on the Opcode and then computes the Immediate value based on the selected SelImmType. Here's an explanation:

- The first casez (Opcode) block checks the value of Opcode and assigns a value to SelImmType based on its value.

- Depending on the value of Opcode, it selects one of several instruction types (U_TYPE, I_TYPE, S_TYPE, B_TYPE, or J_TYPE). If none of the specific conditions match, it sets SelImmType to I_TYPE by default.

- The second casez (SelImmType) block uses the selected SelImmType to determine how to compute the Immediate value for the instruction.

- It assigns the appropriate value to Immediate based on the instruction type. Each type corresponds to a different way of forming the immediate value for the instruction.

- For example, when SelImmType is U_TYPE, it forms the Immediate value by taking bits from the Instruction array in a specific pattern. The same logic applies to the other instruction types as well.

### Instruction Decode part 4 - Register file

```
//===================
//  Register File
//===================
assign RegDst  = Instruction[11:7];
assign RegSrc1 = Instruction[19:15];
assign RegSrc2 = Instruction[24:20];
// --- Select what Write to register file --------
assign RegWrData = SelRegWrPc ? PcPlus4 : WrBackData; 
//---- The Register File  ------
`MAFIA_EN_DFF(Register[RegDst] , RegWrData , Clk , (CtrlRegWrEn && (RegDst!=5'b0)))
// --- read Register File --------
assign RegRdData1 = (RegSrc1==5'b0) ? 32'b0 : Register[RegSrc1];
assign RegRdData2 = (RegSrc2==5'b0) ? 32'b0 : Register[RegSrc2];
```


### Execution stage

```
//===========================================================================
// Execute
// 1. Compute Data to write back to register.
// 2. Compute Address for load/store
// 3. Compute Branch/Jump address target. (set PC)
// 4. Check branch condition
//===========================================================================
assign AluIn1 = SelAluPc    ? Pc        : RegRdData1;
assign AluIn2 = SelAluImm   ? Immediate : RegRdData2;

always_comb begin : alu_logic
    Shamt = AluIn2[4:0]; 
    //According to ALU OP we select the correct operation
    unique casez (CtrlAluOp)
        ADD      :   AluOut = AluIn1 + AluIn2                  ;
        SUB      :   AluOut = AluIn1 + (~AluIn2) + 1'b1        ;
        //shift
        SLL     : AluOut = AluIn1 << Shamt                     ;//SLL
        SRL     : AluOut = AluIn1 >> Shamt                     ;//SRL
        SRA     : AluOut = $signed(AluIn1) >>> Shamt           ;//SRA
        //bit wise operations
        XOR     : AluOut = AluIn1 ^ AluIn2                     ;//XOR
        OR      : AluOut = AluIn1 | AluIn2                     ;//OR
        AND     : AluOut = AluIn1 & AluIn2                     ;//AND
        IN_2    : AluOut = AluIn2                              ;//LUI
        SLT     : AluOut = $signed(AluIn1) < $signed(AluIn2)   ;//SLT
        SLTU    : AluOut = AluIn1 < AluIn2                     ;//SLTU
        default : AluOut = AluIn1 + AluIn2                     ;
  endcase
end

always_comb begin : branch_comp
  //for branch condition.
  unique casez ({CtrlBranchOp})
    BEQ     : BranchCondMet =  (RegRdData1==RegRdData2)                   ;// BEQ
    BNE     : BranchCondMet = ~(RegRdData1==RegRdData2)                   ;// BNE
    BLT     : BranchCondMet =  ($signed(RegRdData1)<$signed(RegRdData2))  ;// BLT
    BGE     : BranchCondMet = ~($signed(RegRdData1)<$signed(RegRdData2))  ;// BGE
    BLTU    : BranchCondMet =  (RegRdData1<RegRdData2)                    ;// BLTU
    BGEU    : BranchCondMet = ~(RegRdData1<RegRdData2)                    ;// BGEU
    default : BranchCondMet = 1'b0                                        ;
  endcase
end
```
This is the execution stage, including computing values for write-back to registers, load/store addresses, branch/jump target addresses, and checking branch conditions.

- The code assigns values to AluIn1 and AluIn2 based on certain conditions. AluIn1 is assigned either the PC or the value from RegRdData1, and AluIn2 is assigned either the Immediate value or RegRdData2. These assignments depend on the values of SelAluPc and SelAluImm.

- The always_comb block with the label alu_logic calculates the result of the ALU (Arithmetic Logic Unit) operation based on the CtrlAluOp control signal. The specific operation performed depends on the value of CtrlAluOp. Common ALU operations like addition (ADD), subtraction (SUB), bitwise operations, and shifts are implemented here.

- The always_comb block labeled branch_comp computes the branch condition (BranchCondMet) based on the control signal CtrlBranchOp. The type of branch comparison depends on the value of CtrlBranchOp and includes conditions such as equal (BEQ), not equal (BNE), less than (BLT), greater than or equal to (BGE), and unsigned comparisons (BLTU and BGEU). The result of the comparison is assigned to BranchCondMet.


### Memory Access

```
//===========================================================================
// Memory Access
// Access D_MEM for Write (STORE) and Reads (LOAD). – use Byte Enable and Sign-Extend indications.
//===========================================================================

// Both RD & WR
assign DMemAddress  = AluOut;
assign DMemByteEn   = CtrlDMemByteEn;
//WR
assign DMemData     = RegRdData2;
assign DMemWrEn     = CtrlDMemWrEn;
//RD
assign DMemRdEn     = SelDMemWb;
```

This part calculates the address of the data memory and the byte enable signal. It also sets the data to be written to the data memory and the write enable signal. Finally, it sets the read enable signal based on the value of SelDMemWb.

### Write back stage


```
//===========================================================================
// Write-Back
//===========================================================================
// -----------------
// 1. Select which data should be written back to the register file AluOut or DMemRdData.
// Sign extend taking care of
logic [31:0] DMemRspDataBeSx;
assign DMemRspDataBeSx[7:0]   =  CtrlDMemByteEn[0] ? DMemRspData[7:0]     : 8'b0;
assign DMemRspDataBeSx[15:8]  =  CtrlDMemByteEn[1] ? DMemRspData[15:8]    :
                                 CtrlSignExt       ? {8{WrBackData[7]}} : 8'b0;
assign DMemRspDataBeSx[23:16] =  CtrlDMemByteEn[2] ? DMemRspData[23:16]:
                                 CtrlSignExt       ? {8{WrBackData[15]}}: 8'b0;
assign DMemRspDataBeSx[31:24] =  CtrlDMemByteEn[3] ? DMemRspData[31:24]:
                                 CtrlSignExt       ? {8{WrBackData[23]}}: 8'b0;
//
assign WrBackData = SelDMemWb ? DMemRspDataBeSx : AluOut;


endmodule
```

In that stage we decide what data to write back to the register file. The data can be the result of the ALU operation or the data that was read from the data memory. The data that is read from the data memory is sign extended according to the instruction type.    


