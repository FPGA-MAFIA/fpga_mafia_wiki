### CR_MEM
- CR_MEM is the control registers memory region. It is a flip-flop based memory (not sram like others) that contains essential registers for the communication with the FGPA peripherals. CR data can be accessed through the software by  requesting the specific offset of the specific CR in the CR table. Some CRs are read only that sample data from the hardware. Others are read and write CRs. The memory size is control by the parameter CR_MEM_MSB and its basic size is 4kb. The access to CR_MEM is a single-port access. The processor accesses CR_MEM in the Memory stage. The table below shows the control registers present in the design.   
Please note the CRs list may be changed depending on the design and future updates.    

| CR Name         | Address    | Description |
|-----------------|------------|-------------|
| CR_SEG7_0       | 0x00007000 | RW 7 bit    |
| CR_SEG7_1       | 0x00007004 | RW 7 bit    |
| CR_SEG7_2       | 0x00007008 | RW 7 bit    |
| CR_SEG7_3       | 0x0000700C | RW 7 bit    |
| CR_SEG7_4       | 0x00007010 | RW 7 bit    |
| CR_SEG7_5       | 0x00007014 | RW 7 bit    |
| CR_LED          | 0x00007018 | RW 10 bit   |
| CR_Button_0     | 0x0000701C | RO 1 bit    |
| CR_Button_1     | 0x00007020 | RO 1 bit    |
| CR_SWITCH       | 0x00007024 | RO 10 bit   |
| CR_JOYSTICK_X   | 0x00007028 | RW 10 bit   |
| CR_JOYSTICK_Y   | 0x0000702C | RW 10 bit   |
| CR_KBD_DATA     | 0x00007100 | RO 8 bit    |
| CR_KBD_READY    | 0x00007104 | RO 1 bit    |
| CR_KBD_SCANF_EN | 0x00007108 | RW 1 bit    |

* RW - read write CR. We can send data to the fpga and sample data from the fpga.
* RO - read only CR. We can only sample data from the fpga.
* The two last one are related to the keyboard.

- We define two structs to communicate with the fpga
The first one is for signals coming from the fpga into the core (`t_fpga_in`) and the second is for signals coming from the core to fpga (``)
```
typedef struct packed {
    logic           Button_0;
    logic           Button_1;
    logic [9:0]     Switch;
    logic [11:0]    Joystick_x;
    logic [11:0]    Joystick_y;
} t_fpga_in;
```

```
typedef struct packed {
    logic [7:0] SEG7_0;
    logic [7:0] SEG7_1;
    logic [7:0] SEG7_2;
    logic [7:0] SEG7_3;
    logic [7:0] SEG7_4;
    logic [7:0] SEG7_5;
    logic [9:0] LED;
} t_fpga_out;
```

### Writing to CR_MEM

In the following always block we update the CR's. For example lets say we want to turn on SEG7_0 in the fpga, we will write to CR_SEG7_0 with some value. The always block will sample the data and turn on the SEG7_0 in the fpga. 

```
always_comb begin
    fpga_out_2 = fpga_out_1; 
    kbd_cr_next.kbd_scanf_en =  kbd_cr.kbd_scanf_en;
    if(wren) begin
        unique casez (address) // address holds the offset
            // ---- RW memory ----
            CR_SEG7_0   : fpga_out_2.SEG7_0    = data[7:0];
            CR_SEG7_1   : fpga_out_2.SEG7_1    = data[7:0];
            CR_SEG7_2   : fpga_out_2.SEG7_2    = data[7:0];
            CR_SEG7_3   : fpga_out_2.SEG7_3    = data[7:0];
            CR_SEG7_4   : fpga_out_2.SEG7_4    = data[7:0];
            CR_SEG7_5   : fpga_out_2.SEG7_5    = data[7:0];
            CR_LED      : fpga_out_2.LED       = data[9:0];
            CR_KBD_SCANF_EN : kbd_cr_next.kbd_scanf_en = data[0];
            // ---- Other ----
            default   : /* Do nothing */;
        endcase
    end
end
```
### Reading from CR_MEM

In the following always block we sample the data from the CR's that going to fpga. For example lets say we want to read the value on SEG7_0 in the fpga, we will read from CR_SEG7_0. 
- Note that in our design the `q_b` output always reads the data from the CR's going to fpga. 
```
always_comb begin
    pre_q   = 32'b0;
    pre_q_b = 32'b0;
    if(rden) begin
        unique casez (address) // address holds the offset
            // ---- RW memory ----
            CR_SEG7_0       : pre_q = {24'b0 , fpga_out.SEG7_0}     ; 
            CR_SEG7_1       : pre_q = {24'b0 , fpga_out.SEG7_1}     ;
            CR_SEG7_2       : pre_q = {24'b0 , fpga_out.SEG7_2}     ;
            CR_SEG7_3       : pre_q = {24'b0 , fpga_out.SEG7_3}     ;
            CR_SEG7_4       : pre_q = {24'b0 , fpga_out.SEG7_4}     ;
            CR_SEG7_5       : pre_q = {24'b0 , fpga_out.SEG7_5}     ;
            CR_LED          : pre_q = {22'b0 , fpga_out.LED}        ;
            CR_KBD_SCANF_EN : pre_q = {31'b0 , kbd_cr.kbd_scanf_en} ;
            // ---- RO memory ----
            CR_Button_0   : pre_q = {31'b0 , fpga_in_2.Button_0}  ;
            CR_Button_1   : pre_q = {31'b0 , fpga_in_2.Button_1}  ;
            CR_SWITCH     : pre_q = {22'b0 , fpga_in_2.Switch}    ;
            CR_JOYSTICK_X : pre_q = {20'b0 , fpga_in_2.Joystick_x};
            CR_JOYSTICK_Y : pre_q = {20'b0 , fpga_in_2.Joystick_y};
            CR_KBD_READY  : pre_q = {31'b0 , kbd_cr.kbd_ready}  ;
            CR_KBD_DATA   : pre_q = {24'b0 , kbd_cr.kbd_data}   ;
            default       : pre_q = 32'b0                         ;
        endcase
    end
    
    //Fabric Read
    unique casez (address_b) // address holds the offset
        // ---- RW memory ----
        CR_SEG7_0     : pre_q_b = {24'b0 , fpga_out.SEG7_0}   ; 
        CR_SEG7_1     : pre_q_b = {24'b0 , fpga_out.SEG7_1}   ;
        CR_SEG7_2     : pre_q_b = {24'b0 , fpga_out.SEG7_2}   ;
        CR_SEG7_3     : pre_q_b = {24'b0 , fpga_out.SEG7_3}   ;
        CR_SEG7_4     : pre_q_b = {24'b0 , fpga_out.SEG7_4}   ;
        CR_SEG7_5     : pre_q_b = {24'b0 , fpga_out.SEG7_5}   ;
        CR_LED        : pre_q_b = {22'b0 , fpga_out.LED}      ;
        CR_KBD_SCANF_EN: pre_q_b = {31'b0 , kbd_cr.kbd_scanf_en} ;
        // ---- RO memory ----
        CR_Button_0   : pre_q_b = {31'b0 , fpga_in_2.Button_0} ;
        CR_Button_1   : pre_q_b = {31'b0 , fpga_in_2.Button_1} ;
        CR_SWITCH     : pre_q_b = {22'b0 , fpga_in_2.Switch}   ;
        CR_JOYSTICK_X : pre_q_b = {20'b0 , fpga_in_2.Joystick_x};
        CR_JOYSTICK_Y : pre_q_b = {20'b0 , fpga_in_2.Joystick_y};
        CR_KBD_READY  : pre_q_b = {31'b0 , kbd_cr.kbd_ready}  ;
        CR_KBD_DATA   : pre_q_b = {24'b0 , kbd_cr.kbd_data}   ;
        default       : pre_q_b = 32'b0                         ;
    endcase

end
```