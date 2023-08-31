## RISCV GCC
To be able to run programs on our proprietary RISCV CPU implementation, we need to create the executable files such as the `elf` files.  
This is done by using the RISCV GCC compiler.  
The RISC GCC compiler input are the C source files, crt0.s, and linker script. The output is the `elf` file.  
The crt0.s file is the C runtime file that is used to initialize the C runtime environment.  
The linker script is used to define the memory layout of the executable file and link the crt0.s file with the C source files.  

### RISCV GCC Installation

### Example of RISCV GCC usage

### example of crt0.s


### example of linker script