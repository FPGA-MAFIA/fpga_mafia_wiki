# Walkthrough - tool-chain tutorial
## Download a text editor  
- vscode: https://code.visualstudio.com/download  
- add useful extensions (python, SystemVerilog, venus Terminal, Copilot, Diff, Spell Checker) 

## Download Python  
- https://www.python.org/downloads/

## Download gitbash for Windows
Git Bash is a command-line tool designed for Windows users, offering a Unix-like environment. It seamlessly integrates the Git version control system with a Bash shell, providing developers with a powerful and familiar command-line interface.
- https://gitforwindows.org/  
  
## Set gitbash in the vscode  
- you may configure the ~/.bashrc & ~/.aliases with your preferences. To accomplish this, you may need to create a .bashrc file. Do that by typing the following commands
```
touch ~/.bashrc # creating .bashrc file
code ~/.bashrc # open file in vs code for editing
```
- You can also explore an alternative option that doesn't require editing the ~/.bashrc file. In Visual Studio Code, navigate to "Terminal -> New Terminal," and once the terminal is open, click on the "plus" icon in the terminal window and choose the "Git Bash" option.
  
## Download Modelsim  - a system Verilog compiler & simulator (lite free version)  
- https://www.intel.com/content/www/us/en/software-kit/660907/intel-quartus-prime-lite-edition-design-software-version-20-1-1-for-windows.html  
Download indevidual files: modelsim, quartus, "Intel MAX 10 Device Support".  
  - Note: after all three programs are downloaded, run the Quartus installation, which will automatically install Modelsim & MAX10.  

## Download the RISCV ToolChain: 
In essence, the RISC-V GCC toolchain comprises a suite of software programs designed to transform a C source file into machine code suitable for loading and execution on RISC-V CPUs. This process involves several stages that are not described here. 
- https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/releases/ -> File name: "xpack-riscv-none-embed-gcc-10.2.0-1.2-win32-x64.zip"). If newer versions are available, you can also download them and then extract into the correct location as shown in the next section.
- https://xpack.github.io/riscv-none-embed-gcc/install/  -> follow "Manual install" (Only extract in the correct location)  



## Gitbash shell - adding to PATH and test installation:  
Add to the ~/.bashrc the PATH of the gcc compiler
Example:
```
export PATH=$PATH:/c/Users/abendavid/AppData/Roaming/xPacks/xpack-riscv-none-embed-gcc-10.2.0-1.2/bin
```
To confirm the successful installation, please enter the following command: "riscv-none-embed-gcc --version". If you receive the version information, everything is set up correctly. If not, please revisit the previous steps carefully. 


## Test the RISCV toolchain:

### 1. Cloning the fpga_mafia environment
- Create a folder to host your environment and clone fpga_mafia
```
cd ~    # you can choose any other reasonable location
mkdir workspace 
cd workspace
git clone https://github.com/amichai-bd/fpga_mafia.git
``` 
### 2. Create a simple c program. - "alive.c" 
- Open fpga_mafia on vs code 
- Navigate to alive.c file located at "verif/mini_core/tests/alive.c" and write a basic program like suggested bellow (if there is any content, don't hesitate to delete it) 
```
int main()  {  
    int x,y,z;  
    x = 2;  
    y = 3;  
    z = x+y;  
}  // main()
```
- Type the following command to examine an assembly file "example.s" created from "alive.c"
```
riscv-none-embed-gcc.exe -S -ffreestanding -march=rv32i ../../../verif/mini_core/tests/alive.c -o example.s
```

### 3. Create a simple linker - "link.common.ld" 
In general terms, the linker's role encompasses defining memory sections, such as the locations of instructions, data, the stack, heap, and more. For example, in our linker the instruction memory starts at 0x00000000 and its length is: 0x4000, and data memory starts exactly after it. 
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
### 4. Create a simple crt0 file - "crt0.S"  
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
### 5. Compile -> Link -> assembler -> machine code:  
- Create the following directory 
```
mkdir -p ./target/mini_core/tests/alive/gcc_files
cd ./target/mini_core/tests/alive/gcc_files
```
- Create assembly file named alive_rv32.c.s from alive.c source code
```
 riscv-none-embed-gcc.exe -S -ffreestanding -march=rv32i -I ../../../../../app/defines ../../../../.././verif/mini_core/tests/alive.c -o alive_rv32i.c.s
```
- Create an *.elf file
In that command we re-define the offset and length of instruction and data memory and combining it crt0.s  to create alive_rv32i.elf   
```
riscv-none-embed-gcc.exe -O3 -march=rv32i -T ../../../../../app/link.common.ld -I ../../../../../app/defines -Wl,--defsym=I_MEM_OFFSET=0 -Wl,--defsym=I_MEM_LENGTH=65536 -Wl,--defsym=D_MEM_OFFSET=65536 -Wl,--defsym=D_MEM_LENGTH=61440 -nostartfiles -D__riscv__ -Wl,-Map=alive.map ../../../../../app/crt0.S alive_rv32i.c.s -o alive_rv32i.elf
```
- Create "visible" *.elf file
In order to view alive_rv32i.elf file we do the following command. Some of crt0.s lines can be seen in that file.
```
riscv-none-embed-objdump.exe -gd alive_rv32i.elf > alive_rv32i_elf.txt
```
- Generate the content for a SystemVerilog instruction memory.
```
riscv-none-embed-objcopy.exe --srec-len 1 --output-target=verilog alive_rv32i.elf inst_mem.sv
```

make sure you have created the files:
- crt0.S  
- link.common.ld  
- alive_rv32i.c.s  
- alive_rv32i.elf  
- alive_rv32i_elf.txt  
- alive_inst_mem_rv32i.sv  

## MODELSIM - systemverilog toolchain 
1. write a simple systemverilog module: `test.sv` 
    ```
    module test (
        input  logic in_0,
        input  logic in_1,
        output logic out
    );
    assign out = in_0 & in_1;
    endmodule
    ```  
1. write a simple systemverilog test bench module: `test_tb.sv`
    ```  
    module test_tb ();
    logic in_0;
    logic in_1;
    logic  out;
    initial begin : assign_input
        in_0 = 1'b0;
        in_1 = 1'b0; // 0&0
    #4 $display("out = in_0 & in_1:\n    > %b = %b & %b",out ,in_0, in_1);
    #4 in_1 = 1'b1; // 0&1
    #4 $display("out = in_0 & in_1:\n    > %b = %b & %b",out ,in_0, in_1);
    #4 in_0 = 1'b1; // 1&1
    #4 $display("out = in_0 & in_1:\n    > %b = %b & %b",out ,in_0, in_1);
    #4 $finish;
    end// initial
    test test_and (
        .in_0(in_0),
        .in_1(in_1),
        .out(out)
    );
    endmodule // test_tb
    ```  
1. List the files & include dirs for model: `test_list.f`
    ```
    test.sv
    test_tb.sv
    ```
1. Make directory called `"work"`
    > `mkdir work`
1. Compile systemverilog from `"dotf"` file list.
    > `vlog.exe -f test_list.f`
1. Elaboration & simulation  
    - Simulate the Design without gui:  
    > `vsim.exe work.test_tb -c -do 'run -all'`  
    - Simulate the Design with gui 
    > `vsim.exe -gui work.test_tb`   

1. Make sure you see the wave form of your code when running with `-gui`:
![image](https://user-images.githubusercontent.com/81047407/137597659-b4465e6f-3d8d-4fd6-867a-c63df68b89e7.png)


## Now you have everything you need to start designing a RISCV core in systemverilog!!
Good place to start:
A single cycle RV32I core:
![image](https://user-images.githubusercontent.com/81047407/170105460-3ea25fe6-b71a-451c-a75f-c8f6696e6713.png)Good luck!  
Please contact me with any issue. [`amichai-bd`](https://github.com/amichai-bd) 

