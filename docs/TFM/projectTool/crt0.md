We've come across the `crt0.s` file while working on creating `*.elf` files, but we haven't explored why this file is important.

The crt0.s file, commonly referred to as "C runtime initialization," is an assembly language file that serves as the entry point for C and C++ programs. Its primary role is to set up the runtime environment for a program, including initializing the stack, global variables, processing command-line arguments, and executing the main function. crt0.s is platform-specific and ensures that a program starts correctly and has the necessary resources and environment for execution. Typically, programmers do not need to modify this file, as it is provided by the toolchain and runtime libraries.   

Lets take a look at our `crt0.s` file and explore the main sections
- reset_handler : Before the main program starts, we initialize all 32 registers to 0
- `li   x2, 0x8000` : Initialization of stack pointer. The address (0x8000) is not an arbitrary address and we must take into consideration some definitions in the linker file. (Take a look at the memory section in the [linker file](/TFM/projectTool/linker.md) )
- `jal x1, main` : After initializations of registers and stack pointer we jumps to main program   

```
_start:
  .global _start
  .org 0x00
  nop                       
  nop                       
  nop                       
  nop                       
  nop                       
reset_handler:
  mv  x1, x0
  mv  x2, x1
  mv  x3, x1
  mv  x4, x1
  mv  x5, x1
  mv  x6, x1
  mv  x7, x1
  mv  x8, x1
  mv  x9, x1
  mv x10, x1
  mv x11, x1
  mv x12, x1
  mv x13, x1
  mv x14, x1
  mv x15, x1
  mv x16, x1
  mv x17, x1
  mv x18, x1
  mv x19, x1
  mv x20, x1
  mv x21, x1
  mv x22, x1
  mv x23, x1
  mv x24, x1
  mv x25, x1
  mv x26, x1
  mv x27, x1
  mv x28, x1
  mv x29, x1
  mv x30, x1
  mv x31, x1
  /* stack initialization */
  li   x2, 0x8000
  jal x1, main  //jump to main
  ebreak        //end
  .section .text

```