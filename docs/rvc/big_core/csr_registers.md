 ## Introduction

 - RISC-V Control and Status Registers (CSRs) are an integral part of the RISC-V architecture, serving as a set of special-purpose registers that control and manage the processor's behavior, as well as store system status information. They play a crucial role in handling privilege levels, exceptions, and various system operations.

- The CSR registers are categorized into machine-level CSRs, supervisor-level CSRs, hypervisor-level CSRs (in systems that support virtualization), and user-level CSRs. Each privilege level has its own set of CSRs, providing control over different aspects of the processor's functionality. [^1]

- The CSRs handle a wide range of functionalities, including:

1. Control of Privilege Levels: Certain CSRs manage the transition between privilege levels, facilitating the shift between user mode and higher privilege modes (supervisor or machine mode).

2. **Exception Handling: CSRs hold information related to exceptions, interrupts, and traps, enabling the processor to handle these events effectively. They store exception causes, trap handling addresses, and interrupt enable/disable flags.**

3. Performance Monitoring: Some CSRs are dedicated to performance monitoring and counters, offering insights into the processor's performance metrics and aiding in optimization.

4. System Configuration: These registers often contain system configuration and setup details, allowing the processor to control various functionalities, such as cache behavior or memory mapping.

5. Machine Specific Registers: CSRs that cater to specific functionalities or extensions, which can vary based on the particular implementation or optional extensions of the RISC-V architecture.

- Understanding and managing CSRs are crucial for system developers, as they directly impact how the processor operates at different privilege levels, handles exceptions, and interacts with the system. However, the specifics of these registers, including their number, functionalities, and their accessibility across different privilege levels, can vary based on the RISC-V implementation or extensions used in a particular system.

- The RISC-V architecture's openness and modularity allow for flexibility in implementing CSRs, providing space for customization and adaptation to various system requirements. This adaptability also facilitates the incorporation of new extensions and features into the processor design without altering the fundamental architecture, making RISC-V CSRs a pivotal aspect of its versatility.   

- RISC-V defines a separate address space of 4096 Control and Status registers. 

## CSR specifications and implementations
- To implement RISC-V Control and Status Registers (CSRs), two RISC-V specifications are used: one is the [unprivileged spec](https://riscv.org/wp-content/uploads/2019/12/riscv-spec-20191213.pdf) and the other is the [privileged spec](https://riscv.org/wp-content/uploads/2017/05/riscv-privileged-v1.10.pdf).   

- Within the CSR context, the unprivileged specification covers fundamental aspects, such as general read and write conditions and types of csr instructions. On the other hand, the privileged specification delves deeper, offering detailed insights into these registers, including their specific addresses and accessibility criteria, defining which privilege levels, such as user or supervisor, can access them.

### CSR Instruction Types
The following information is based on unprivileged spec, chapter 9.

![csr_instructions.png](/snapshots/csr_instructions.png) 
- The `csr` field represents the address of the CSR. We can understand that there are 4096 possible csr registers(we wont use them all)[^1]. 

- The `rs1` field represents the source register. This is the register from which the value is read and written to the CSR, it also represents the immediate value instructions.[^2] 

- The `funct3` field represents the function of the instruction. It can be either `read`, `write` or `read and write`.

`001 - for csrrw` - read and write   
`010 - for csrrs` - read and set   
`011 - for csrrc` - read and clear   
`101 - for csrrwi` - read and write immediate   
`110 - for csrrsi` - read and set immediate   
`111 - for csrrci` - read and clear immediate   

- The `rd` field represents the destination register. This is the register to which the value is written to from csr. 

- The `opcode` field represents the opcode of the instruction. It is always `1110011` for csr instructions.



[^1]: For detailed information on the CSR addresses, refer to the privileged spec, chapter 2.   
[^2]: For detailed information about the instruction fields, refer to the unprivileged spec, chapter 9.

### CSR Read and Write Conditions
The following information is based on unprivileged spec, chapter 9. 

 - Register Operand (rs1 is a register) read/write policy:               

| Instruction | rd  | rs   |   read CSR?  |   write CSR?   |
|------------ |-----|----- |--------------|----------------|
| CSRRW       | x0  |  -   |      no      |      yes       |
| CSRRW       | !x0 |  -   |      yes     |      yes       |
| CSRRS/C     | -   |  x0  |      yes     |      no        |
| CSRRS/C     | -   | !x0  |      yes     |      yes       |


 - Imemdiate Operand (rs1 is a `uimm` field) read/write policy:               

| Instruction | rd  | rs   |   read CSR?  |   write CSR?   |
|------------ |-----|----- |--------------|----------------|
| CSRRWI      | x0  |  -   |      no      |      yes       |
| CSRRWI      | !x0 |  -   |      yes     |      yes       |
| CSRRS/CI    | -   |  0   |      yes     |      no        |
| CSRRS/CI    | -   | !0   |      yes     |      yes       |

- Those tables implemented inside the control unit of the big core.
```
assign CsrInstQ101H.csr_wren     = (OpcodeQ101H == SYSCAL) && !(((Funct3Q101H[1:0] == 2'b11) || (Funct3Q101H[1:0] == 2'b10)) && (CtrlQ101H.RegSrc1 =='0 ));  
assign CsrInstQ101H.csr_rden     = (OpcodeQ101H == SYSCAL) && !((Funct3Q101H[1:0]==2'b01 ) && (CtrlQ101H.RegDst =='0 ));
```
### CSR instructions examples
```
csrrw	a5,vxsat, a4
```
- In that instruction, the value of `vxsat` is written to `a5` and the value of `a4` is written to `vxsat`. Do not spend time to understand the meaning of the `vxsat` register, generally speaking it just a CSR register name. You can find other CSR register names in the privileged spec, chapter 2 but its not that important for now.
- for example: suppose that `vxsat` is equal to 0x00000100 and `a4` is equal to 0x00000001, after executing the instruction, `a5` will be equal to 0x00000100 and `vxsat` will be equal to 0x00000001. 

```
csrrwi	a5,vxsat,27
```
- In that instruction, the value of `vxsat` is written to `a5` and the value of 27 is written to `vxsat`.

```
csrrs	a5,vxsat,a4
```
- In that instruction, the value of `vxsat` is written to `a5` and the value of `a4` is used to set the bits of `vxsat` to 1 any place that `a4` has 1 otherwise the bits of `vxsat` will not be changed.
- for example: suppose that `vxsat` is equal to 0x00000100 and `a4` is equal to 0x00000001, after executing the instruction, `a5` will be equal to 0x00000100 and `vxsat` will be equal to 0x00000101. 

```
csrrsi	a5,vxsat,27
```
- In that instruction, the value of `vxsat` is written to `a5` and the value of 27 is used to set the bits of `vxsat` to 1 any place that 27 has 1 otherwise the bits of `vxsat` will not be changed.


```
csrrc	a5,vxsat,a4
```
- In that instruction, the value of `vxsat` is written to `a5` and the value of `a4` is used to clear the bits of `vxsat` to 0 any place that `a4` has 1 otherwise the bits of `vxsat` will not be changed.
- for example: suppose that `vxsat` is equal to 0x00001100 and `a4` is equal to 0x00000111, after executing the instruction, `a5` will be equal to 0x00001100 and `vxsat` will be equal to 0x00001000. 

```
csrrci	a5,vxsat,27
```
- In that instruction, the value of `vxsat` is written to `a5` and the value of 27 is used to clear the bits of `vxsat` to 0 any place that 27 has 1 otherwise the bits of `vxsat` will not be changed.

### CSR instructions examples (read or write only)
- There are some CSR instructions that are read or write only. Those instructions can be done by using the above instructions for example:

- Write to CSR only: 
```
csrrw x0, vxsat, rs
```
- You may use pseudo instruction `csrw vxsat, rs` instead of the above instruction.

```
csrrwi x0, vxsat, imm
```
- You may use pseudo instruction `csrwi vxsat, imm` instead of the above instruction.

- Read from CSR only: 
```
csrrs rd, csr, x0
```
- You may use pseudo instruction `csrr rd, csr` instead of the above instruction.

For more information about the CSR read/write only instructions, refer to the unprivileged spec, chapter 25 - RISC-V assembly Programmer's Handbook.

![csr_pseudoInstructions.png](/snapshots/csr_pseudoInstructions.png)


### Generate CSR instructions in C code
- In order to use CSR instruction in C code and not directly in assembly, we need to use the `asm volatile` command. The following code snippet shows how to use CSR instructions in C code. 

```
  asm volatile ("csrw 0x009, 0x7"); 
```
- This instruction will write the value 0x7 to the CSR register 0x009 and generate the following instruction in `_elf.txt` file : `csrwi	vxsat,7`
- In our implementation we are using the CSR register `scratchpad_csr` which address is equal to 0x009. The compiler change its name to `vxsat` as described in the privileged spec, chapter 2. Please do not worry about the names of the CSR registers, you may play with those addresses as you wish and examine `_elf.txt` file to see the changes.
Make sure to supply the correct address of the CSR as defined in `t_csr_addr` enumerator in the big core package file. 

- **For more instructions using asm volatile, please go to `/verif/big_core/test/alive_csr.c`, We suggest to compile the file and look at the `_elf.txt` file to see the generated instructions.** 

### CSR instructions implemented in the big core
- CSR control signals are generated in the control unit of the big core. The following code snippet shows the CSR control signals generation. 
```
// CSR Control Signals
assign CsrInstQ101H.csr_wren     = (OpcodeQ101H == SYSCAL) && !(((Funct3Q101H[1:0] == 2'b11) || (Funct3Q101H[1:0] == 2'b10)) && (CtrlQ101H.RegSrc1 =='0 ));  
assign CsrInstQ101H.csr_rden     = (OpcodeQ101H == SYSCAL) && !((Funct3Q101H[1:0]==2'b01 ) && (CtrlQ101H.RegDst =='0 ));
assign CsrInstQ101H.csr_op       = InstructionQ101H[13:12];
assign CsrInstQ101H.csr_rs1      = CtrlQ101H.RegSrc1;
assign CsrInstQ101H.csr_addr     = InstructionQ101H[31:20];
assign CsrInstQ101H.csr_data_imm = {27'h0, CtrlQ101H.RegSrc1}; 
assign CsrInstQ101H.csr_imm_bit  = InstructionQ101H[14];  
```
- The used typedef struct is defined in the big_core package file

- CSR unit located in `Q102H` execution stage because we need to forward data to rd if necessary.
- CSR register defined in the core package file under `t_csr_addr` enumerator which includes all the CSR addresses used in the core and the registers them self in the `t_csr` struct

### PMON measurments
note: The following csr's defined in `source/big_core` core.
- Please refer to [pmon link](/docs/rvc/big_core/pmon.md).

### Custom CSR's  
note: The following csr's defined in `source/big_core` core.
- timer interrupt exception csr's:
  - `csr_custom_mtime` - Used to measure time of our system. This csr is read only from software and can be updated only in HW. Each clock it decrements by one. Used only in machine mode.
  - `csr_cutome_mtimecmp` - This csr is RW csr and used for comparison with `custom_mtime`. We use it in Timer interrupt exception.
   See [exceptions](/docs/rvc/big_core/exceptions.md)
  - `csr_custom_LFSR`     - Used for generating pseudo random numbers. The algorithm is based on LFSR algorithm. For biggest cycle we used  the following Polynom: `x^32 + x^22 + x^2 + x^1 + 1`. That Csr is RO and can be updated by HW for seed value update.


