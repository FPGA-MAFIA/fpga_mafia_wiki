# Illegal Instruction Exception
Illegal instruction is a synchronous exception because its origin comes from the software flow. 
### Causes of illegal instructions
- Un familiar instruction that belongs to a specific RISCV extension that not supported bt the core.
- Hw errors while fetching the instruction from the memory.
- Custom instructions that not supported by RISCV spec (In most of the cases the compiler will not compile that).
- Compiler errors (very rare but possible).

### Cases in our core
For more details, please refer to `/source/core_rrv/illegal_instruction.vh`
- Some of the `Funct7` fields in R-type instructions do not zero
- `Funct3` do not match the instruction. For example we try to execute S-type instruction and `Funct3  = 111`.
- Un recognized OpCode that not supported by the core or not allowed by the spec.

### Illegal Instruction Generation
- We use the test `/verif/core_rrv/alive_illegal.c`.
- We try to create an instruction with illegal `FUCT7`, we generate `slli` with funct7 = 0x7f instead of 0x0
```
   // This instruction is trying to generate slli instruction with illegal FUNCT7.
    asm(".word 0xfff79793" : /* outputs / : / inputs / : / clobbers */);
```
- This is a code snippet from the `elf.txt` file
```
  1660:	fd010113          	addi	sp,sp,-48
        .
        .
        .
    1674:	00200793          	li	a5,2
    1678:	fef42423          	sw	a5,-24(s0)
    167c:	fff79793          	0xfff79793
    1680:	fec42703          	lw	a4,-20(s0)
        .
        .
        .
    16b0:	00008067          	ret
```
### Illegal Instruction Mechanism
1. Detection if illegal instruction inside the controller :
`assign IllegalInstructionQ101H = (PreIllegalInstructionQ101H) && ! (flushQ102H || flushQ103H);`
- In case of illegal instruction and flush, we do not start the the interrupt routine because the instruction will be flushed anyway.
- When the illegal instruction is a part of the instruction flow than we erase that instruction by inserting `NOP` and jumps to the interrupt routine.
2. Csr update
Once we decide to take the exception we start to update and read csr's. T
- We update the cause of the exception by modifying the `csr_mcause` csr by assign the `32'h00000002`.
- Update `csr_mepc` with the return value PC of the illegal instruction. We will use it as return address from the interrupt routine.
- Update `csr_mtval` with the illegal instruction machine code. In our case it will be `fff79793`
- Set the `CSR_MSTATUS[MIE]` to the current value of `CSR_MSTATUS[MIE]` to store the previous machine interrupt enable mode.
- Disable `CSR_MSTATUS[MIE]` when taking an exception to avoid nested interrupts.   
3. Jumps to Interrupt routine
- Store the values of the registers
- Perform the routine
Jump to `csr_mtvec` value that keeps the address pf the routine.
4. Return from interrupt routine
- Restore the registers
- update `CSR_MSTATUS[MIE]` with `CSR_MSTATUS[MIE]`. 
### crt0.s_boot_trap.s file
```
csr_init:
  li t0, 0x100      # Load the immediate value 0x100 of trap handler address
  csrw mtvec, t0    # Write the value in t0 to the mtvec CSR
```

- The address of the interrupt routine is `0x100`
- Inside that file we store and restore the registers before jumping to the routine inside `interrupt_handler.h`.
Please see `/app/crt0/crt0_boot_trap.S` and `/app/defines/interrupt_handler.h`

### Interrupt_handler.h
```
 if ((mcause & 0xFFF) == ILLEGAL_INSTRUCTION_EXCEPTION) { 
        csr_mepc = read_mepc();
        csr_mtval = read_mtval();
        rvc_printf("ILGL INST\n");
        rvc_printf("MEPC:");
        rvc_print_unsigned_int_hex(csr_mepc);
        rvc_printf("\n");
        rvc_printf("MTVAL:");
        rvc_print_unsigned_int_hex(csr_mtval);
        rvc_printf("\n");
       }
```




