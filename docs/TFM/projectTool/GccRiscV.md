## RISCV GCC
To be able to run programs on our proprietary RISCV CPU implementation, we need to create the executable files such as the `elf` files.  
This is done by using the RISCV GCC compiler.  
The RISC GCC compiler input are the C source files, crt0.s, and linker script. The output is the `elf` file.  
The crt0.s file is the C runtime file that is used to initialize the C runtime environment.  
The linker script is used to define the memory layout of the executable file and link the crt0.s file with the C source files.  

### RISCV GCC Installation
- https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/releases/ -> File name: "xpack-riscv-none-embed-gcc-10.2.0-1.2-win32-x64.zip"). If newer versions are available, you can also download them and then extract into the correct location as shown in the next section.

You can unzip the file into any library, but we suggest unzipping it to this specific Windows path.   
`C:\Users\your-user-name\AppData\Roaming\xPacks\xpack-riscv-none-embed-gcc`

### Gitbash shell - adding to PATH and test installation:  
Add to the ~/.bashrc the PATH of the gcc compiler
Example:
```
export PATH=$PATH:/c/Users/your-user-name/AppData/Roaming/xPacks/xpack-riscv-none-embed-gcc/bin
```
Make sure that the PATH is correct.

To confirm the successful installation, please enter the following command: "riscv-none-embed-gcc --version". If you receive the version information, everything is set up correctly. If not, please revisit the previous steps carefully or [Contact Us](/docs/contact_us/contact.md) 

### Example of RISCV GCC usage
Like we mentioned earlier, GCC typically makes a *.elf file. But in our situation, it's also crucial for us to create a special SystemVerilog file. This file will have the memory contents representing our C program and will go into the instruction memory of the CPU we're building.

- Now we will create folder and *.c file
```
cd ~                # your home directory
mkdir gcc_test      # make gcc_test folder
cd gcc_test         # enter that folder
touch example.c     # create *.c file
code example.c      # open that file in vs code
```

- Write a basic program, for example:
```
// example.c
int main(){
    int x = 1;
    int y = 2;
    int c = x + y;

    return 0;
}
```

-Type the following cmd to create assembly file example.s
- Type the following command to create an assembly file "example.s" from "example.c"
```
riscv-none-embed-gcc.exe -S -ffreestanding -march=rv32i example.c -o example.s
```

### example of linker script
In general terms, the linker's role encompasses defining memory sections, such as the locations of instructions, data, the stack, heap, and more. For example, in our linker the instruction memory starts at 0x00000000 and its length is: 0x4000, and data memory starts exactly after it.    
For more information [click here](https://sourceware.org/binutils/docs/ld/Simple-Example.html)

- Create basic_linker.ld file in vscode (stay at the same directory)
```
    MEMORY {  
        i_mem          : ORIGIN = 0x00000000 , LENGTH = 0x4000  
        global_data    : ORIGIN = 0x00004000 , LENGTH = 0x4000  
    }  
    SECTIONS {  
        .text : {  
        . = ALIGN(4);  
        *(.start);  
        *(.text);  
        . = ORIGIN(i_mem) + LENGTH(i_mem) - 1;  
        BYTE(0);  
    }  > i_mem  
        .data : {  
        . = ALIGN(4);  
        *(.rodata);  
        *(.sdata);  
        *(.sbss);  
        } > global_data  
        .bss : {} > global_data  
    }  
```  
### example of crt0.s

- Create crt0.s file in vscode (stay at the same directory) 
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
- notice `li   x2, 0x8000` and `jal x1, main  //jump to main` and try to understand where 0x8000 came from

Now, we have everything required to start working on our goals, which is to create both the *.elf file and the memory initialization file.

## Compile -> Link -> assembler -> machine code:  
 Run the following commands:

- Create an *.elf file
In that command we re-define the offset and length of instruction and data memory and combining it with crt0.s file to create example_rv32i.elf   

```
riscv-none-embed-gcc.exe -O3 -march=rv32i -T basic_linker.ld -nostartfiles -D__riscv__ -Wl,-Map=alive.map crt0.S example.s -o example_rv32i.elf
```
- Create "visible" *.elf file
In order to view example_rv32i.elf file we do the following command. 
```
riscv-none-embed-objdump.exe -gd example_rv32i.elf > example_rv32i_elf.txt
```
- Generate the content for a SystemVerilog instruction memory.
```
riscv-none-embed-objcopy.exe --srec-len 1 --output-target=verilog example_rv32i.elf inst_mem.sv
```

make sure you have created the files:
- crt0.S  
- basic_linker.ld  
- example.s  
- example_rv32i.elf  
- example_rv32i_elf.txt  
- inst_mem.sv 

If you can that far and everything is functioning smoothly, you've done an excellent job. 👍