 In the GCC RISC-V toolchain, a linker file, also known as a linker script, is a configuration file used by the linker (ld) to specify how a program's code and data should be organized in memory. It defines things like where the program's code starts, where data is stored, and how different sections are grouped together. Linker scripts are important for ensuring that the program runs correctly on a RISC-V system and can be customized to meet specific hardware requirements.   
 Lets take a look at our `*.ld` file and explore the main sections.
 - Memory : We divide our memory into two memory sections, their start address and size 
 - Sections : Organization of memory sections
 
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