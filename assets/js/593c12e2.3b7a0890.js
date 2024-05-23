"use strict";(self.webpackChunkmy_docs=self.webpackChunkmy_docs||[]).push([[428],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),m=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=m(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),p=m(n),u=i,h=p["".concat(s,".").concat(u)]||p[u]||d[u]||o;return n?a.createElement(h,l(l({ref:t},c),{},{components:n})):a.createElement(h,l({ref:t},c))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,l=new Array(o);l[0]=u;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r[p]="string"==typeof e?e:i,l[1]=r;for(var m=2;m<o;m++)l[m]=n[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8514:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>m});var a=n(7462),i=(n(7294),n(3905));const o={},l="Walkthrough - tool-chain tutorial",r={unversionedId:"TFM/projectTool/Walkthrough",id:"TFM/projectTool/Walkthrough",title:"Walkthrough - tool-chain tutorial",description:"Download a text editor",source:"@site/docs/TFM/projectTool/Walkthrough.md",sourceDirName:"TFM/projectTool",slug:"/TFM/projectTool/Walkthrough",permalink:"/fpga_mafia_wiki/docs/TFM/projectTool/Walkthrough",draft:!1,editUrl:"https://github.com/FPGA-MAFIA/fpga_mafia_wiki/tree/main/docs/TFM/projectTool/Walkthrough.md",tags:[],version:"current",frontMatter:{}},s={},m=[{value:"Download a text editor",id:"download-a-text-editor",level:2},{value:"Download Python",id:"download-python",level:2},{value:"Download gitbash for Windows",id:"download-gitbash-for-windows",level:2},{value:"Set gitbash in the vscode",id:"set-gitbash-in-the-vscode",level:2},{value:"Download Modelsim  - a system Verilog compiler &amp; simulator (lite free version)",id:"download-modelsim----a-system-verilog-compiler--simulator-lite-free-version",level:2},{value:"Download the RISCV ToolChain:",id:"download-the-riscv-toolchain",level:2},{value:"Gitbash shell - adding to PATH and test installation:",id:"gitbash-shell---adding-to-path-and-test-installation",level:2},{value:"Test the RISCV toolchain:",id:"test-the-riscv-toolchain",level:2},{value:"1. Cloning the fpga_mafia environment",id:"1-cloning-the-fpga_mafia-environment",level:3},{value:"2. Create a simple c program. - &quot;alive.c&quot;",id:"2-create-a-simple-c-program---alivec",level:3},{value:"3. Create a simple linker - &quot;link.common.ld&quot;",id:"3-create-a-simple-linker---linkcommonld",level:3},{value:"4. Create a simple crt0 file - &quot;crt0.S&quot;",id:"4-create-a-simple-crt0-file---crt0s",level:3},{value:"5. Compile -&gt; Link -&gt; assembler -&gt; machine code:",id:"5-compile---link---assembler---machine-code",level:3},{value:"Running RISCV toolchain using GUI",id:"running-riscv-toolchain-using-gui",level:3},{value:"MODELSIM - systemverilog toolchain",id:"modelsim---systemverilog-toolchain",level:2},{value:"How to use GUI window",id:"how-to-use-gui-window",level:3},{value:"Now you have everything you need to start designing a RISCV core in systemverilog!!",id:"now-you-have-everything-you-need-to-start-designing-a-riscv-core-in-systemverilog",level:2}],c={toc:m},p="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"walkthrough---tool-chain-tutorial"},"Walkthrough - tool-chain tutorial"),(0,i.kt)("h2",{id:"download-a-text-editor"},"Download a text editor"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"vscode: ",(0,i.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/download"},"https://code.visualstudio.com/download"),"  "),(0,i.kt)("li",{parentName:"ul"},"add useful extensions (python, SystemVerilog, venus Terminal, Copilot, Diff, Spell Checker) ")),(0,i.kt)("h2",{id:"download-python"},"Download Python"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.python.org/downloads/"},"https://www.python.org/downloads/"))),(0,i.kt)("h2",{id:"download-gitbash-for-windows"},"Download gitbash for Windows"),(0,i.kt)("p",null,"Git Bash is a command-line tool designed for Windows users, offering a Unix-like environment. It seamlessly integrates the Git version control system with a Bash shell, providing developers with a powerful and familiar command-line interface."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://gitforwindows.org/"},"https://gitforwindows.org/"),"  ")),(0,i.kt)("h2",{id:"set-gitbash-in-the-vscode"},"Set gitbash in the vscode"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"you may configure the ~/.bashrc & ~/.aliases with your preferences. To accomplish this, you may need to create a .bashrc file. Do that by typing the following commands")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"touch ~/.bashrc # creating .bashrc file\ncode ~/.bashrc # open file in vs code for editing\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},'You can also explore an alternative option that doesn\'t require editing the ~/.bashrc file. In Visual Studio Code, navigate to "Terminal -> New Terminal," and once the terminal is open, click on the "plus" icon in the terminal window and choose the "Git Bash" option.')),(0,i.kt)("h2",{id:"download-modelsim----a-system-verilog-compiler--simulator-lite-free-version"},"Download Modelsim  - a system Verilog compiler & simulator (lite free version)"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.intel.com/content/www/us/en/software-kit/660907/intel-quartus-prime-lite-edition-design-software-version-20-1-1-for-windows.html"},"https://www.intel.com/content/www/us/en/software-kit/660907/intel-quartus-prime-lite-edition-design-software-version-20-1-1-for-windows.html"),(0,i.kt)("br",{parentName:"li"}),'Download indevidual files: modelsim, quartus, "Intel MAX 10 Device Support".  ',(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Note: after all three programs are downloaded, run the Quartus installation, which will automatically install Modelsim & MAX10.  ")))),(0,i.kt)("h2",{id:"download-the-riscv-toolchain"},"Download the RISCV ToolChain:"),(0,i.kt)("p",null,"In essence, the RISC-V GCC toolchain comprises a suite of software programs designed to transform a C source file into machine code suitable for loading and execution on RISC-V CPUs. This process involves several stages that are not described here. "),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/releases/"},"https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/releases/"),' -> File name: "xpack-riscv-none-embed-gcc-10.2.0-1.2-win32-x64.zip"). If newer versions are available, you can also download them and then extract into the correct location as shown in the next section.'),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://xpack.github.io/riscv-none-embed-gcc/install/"},"https://xpack.github.io/riscv-none-embed-gcc/install/"),'  -> follow "Manual install" (Only extract in the correct location)  ')),(0,i.kt)("h2",{id:"gitbash-shell---adding-to-path-and-test-installation"},"Gitbash shell - adding to PATH and test installation:"),(0,i.kt)("p",null,"Add to the ~/.bashrc the PATH of the gcc compiler\nExample:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"export PATH=$PATH:/c/Users/abendavid/AppData/Roaming/xPacks/xpack-riscv-none-embed-gcc-10.2.0-1.2/bin\n")),(0,i.kt)("p",null,'To confirm the successful installation, please enter the following command: "riscv-none-embed-gcc --version". If you receive the version information, everything is set up correctly. If not, please revisit the previous steps carefully. '),(0,i.kt)("h2",{id:"test-the-riscv-toolchain"},"Test the RISCV toolchain:"),(0,i.kt)("h3",{id:"1-cloning-the-fpga_mafia-environment"},"1. Cloning the fpga_mafia environment"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Create a folder to host your environment and clone fpga_mafia")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"cd ~    # you can choose any other reasonable location\nmkdir workspace \ncd workspace\ngit clone https://github.com/amichai-bd/fpga_mafia.git\n")),(0,i.kt)("h3",{id:"2-create-a-simple-c-program---alivec"},'2. Create a simple c program. - "alive.c"'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Open fpga_mafia on vs code "),(0,i.kt)("li",{parentName:"ul"},'Navigate to alive.c file located at "verif/mini_core/tests/alive.c" and write a basic program like suggested bellow (if there is any content, don\'t hesitate to delete it) ')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"int main()  {  \n    int x,y,z;  \n    x = 2;  \n    y = 3;  \n    z = x+y;  \n}  // main()\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},'Type the following command that creates an assembly file "example.s" from "alive.c"')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"riscv-none-embed-gcc.exe -S -ffreestanding -march=rv32i ../../../verif/mini_core/tests/alive.c -o example.s\n")),(0,i.kt)("h3",{id:"3-create-a-simple-linker---linkcommonld"},'3. Create a simple linker - "link.common.ld"'),(0,i.kt)("p",null,"In general terms, the linker's role encompasses defining memory sections, such as the locations of instructions, data, the stack, heap, and more. For example, in our linker the instruction memory starts at 0x00000000 and its length is: 0x4000, and data memory starts exactly after it. "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"    MEMORY {  \n        i_mem          : ORIGIN = 0x00000000 , LENGTH = 0x4000  \n        global_data    : ORIGIN = 0x00004000 , LENGTH = 0x4000  \n    }  \n    SECTIONS {  \n        .text : {  \n        . = ALIGN(4);  \n        *(.start);  \n        *(.text);  \n        . = ORIGIN(i_mem) + LENGTH(i_mem) - 1;  \n        BYTE(0);  \n    }  > i_mem  \n        .data : {  \n        . = ALIGN(4);  \n        *(.rodata);  \n        *(.sdata);  \n        *(.sbss);  \n        } > global_data  \n        .bss : {} > global_data  \n    }  \n")),(0,i.kt)("h3",{id:"4-create-a-simple-crt0-file---crt0s"},'4. Create a simple crt0 file - "crt0.S"'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"_start:\n  .global _start\n  .org 0x00\n  nop                       \n  nop                       \n  nop                       \n  nop                       \n  nop                       \nreset_handler:\n  mv  x1, x0\n  mv  x2, x1\n  mv  x3, x1\n  mv  x4, x1\n  mv  x5, x1\n  mv  x6, x1\n  mv  x7, x1\n  mv  x8, x1\n  mv  x9, x1\n  mv x10, x1\n  mv x11, x1\n  mv x12, x1\n  mv x13, x1\n  mv x14, x1\n  mv x15, x1\n  mv x16, x1\n  mv x17, x1\n  mv x18, x1\n  mv x19, x1\n  mv x20, x1\n  mv x21, x1\n  mv x22, x1\n  mv x23, x1\n  mv x24, x1\n  mv x25, x1\n  mv x26, x1\n  mv x27, x1\n  mv x28, x1\n  mv x29, x1\n  mv x30, x1\n  mv x31, x1\n  /* stack initialization */\n  li   x2, 0x8000\n  jal x1, main  //jump to main\n  ebreak        //end\n  .section .text\n")),(0,i.kt)("h3",{id:"5-compile---link---assembler---machine-code"},"5. Compile -> Link -> assembler -> machine code:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Create the following directory ")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"mkdir -p ./target/mini_core/tests/alive/gcc_files\ncd ./target/mini_core/tests/alive/gcc_files\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Create assembly file named alive_rv32.c.s from alive.c source code")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"}," riscv-none-embed-gcc.exe -S -ffreestanding -march=rv32i -I ../../../../../app/defines ../../../../.././verif/mini_core/tests/alive.c -o alive_rv32i.c.s\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Create an *.elf file\nIn that command we re-define the offset and length of instruction and data memory and combining it with crt0.s file to create alive_rv32i.elf   ")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"riscv-none-embed-gcc.exe -O3 -march=rv32i -T ../../../../../app/link.common.ld -I ../../../../../app/defines -Wl,--defsym=I_MEM_OFFSET=0 -Wl,--defsym=I_MEM_LENGTH=65536 -Wl,--defsym=D_MEM_OFFSET=65536 -Wl,--defsym=D_MEM_LENGTH=61440 -nostartfiles -D__riscv__ -Wl,-Map=alive.map ../../../../../app/crt0.S alive_rv32i.c.s -o alive_rv32i.elf\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},'Create "visible" *.elf file\nIn order to view alive_rv32i.elf file we do the following command. (Some of crt0.s lines ca\u05e2\u05df\u05d0 n be seen in that file).')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"riscv-none-embed-objdump.exe -gd alive_rv32i.elf > alive_rv32i_elf.txt\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Generate the content for a SystemVerilog instruction memory.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"riscv-none-embed-objcopy.exe --srec-len 1 --output-target=verilog alive_rv32i.elf inst_mem.sv\n")),(0,i.kt)("p",null,"make sure you have created the files:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"crt0.S  "),(0,i.kt)("li",{parentName:"ul"},"link.common.ld  "),(0,i.kt)("li",{parentName:"ul"},"alive_rv32i.c.s  "),(0,i.kt)("li",{parentName:"ul"},"alive_rv32i.elf  "),(0,i.kt)("li",{parentName:"ul"},"alive_rv32i_elf.txt  "),(0,i.kt)("li",{parentName:"ul"},"alive_inst_mem_rv32i.sv  ")),(0,i.kt)("h3",{id:"running-riscv-toolchain-using-gui"},"Running RISCV toolchain using GUI"),(0,i.kt)("p",null,"Using the GUI, you can execute Section 5 in just a matter of seconds."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Install the termcolor module")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"pip install termcolor\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Navigate to fpga_mafia folder and open the GUI by typing")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"python gui_build.py\n")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"DUT: choose mini_core.",(0,i.kt)("br",{parentName:"p"}),"\n","Mark -tests and than choose alive.c",(0,i.kt)("br",{parentName:"p"}),"\n","Mark -app.",(0,i.kt)("br",{parentName:"p"}),"\n","Apply Run Command.    ")),(0,i.kt)("h2",{id:"modelsim---systemverilog-toolchain"},"MODELSIM - systemverilog toolchain"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"write a simple systemverilog module: ",(0,i.kt)("inlineCode",{parentName:"p"},"test.sv")," "),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"module test (\n    input  logic in_0,\n    input  logic in_1,\n    output logic out\n);\nassign out = in_0 & in_1;\nendmodule\n"))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"write a simple systemverilog test bench module: ",(0,i.kt)("inlineCode",{parentName:"p"},"test_tb.sv")),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},'module test_tb ();\nlogic in_0;\nlogic in_1;\nlogic  out;\ninitial begin : assign_input\n    in_0 = 1\'b0;\n    in_1 = 1\'b0; // 0&0\n#4 $display("out = in_0 & in_1:\\n    > %b = %b & %b",out ,in_0, in_1);\n#4 in_1 = 1\'b1; // 0&1\n#4 $display("out = in_0 & in_1:\\n    > %b = %b & %b",out ,in_0, in_1);\n#4 in_0 = 1\'b1; // 1&1\n#4 $display("out = in_0 & in_1:\\n    > %b = %b & %b",out ,in_0, in_1);\n#4 $finish;\nend// initial\ntest test_and (\n    .in_0(in_0),\n    .in_1(in_1),\n    .out(out)\n);\nendmodule // test_tb\n'))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"List the files & include dirs for model: ",(0,i.kt)("inlineCode",{parentName:"p"},"test_list.f")),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"test.sv\ntest_tb.sv\n"))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Make directory called ",(0,i.kt)("inlineCode",{parentName:"p"},'"work"')),(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("inlineCode",{parentName:"p"},"mkdir work"),"  "),(0,i.kt)("ul",{parentName:"blockquote"},(0,i.kt)("li",{parentName:"ul"},"Please note that The presence of Hebrew letters in the pass could lead to errors. ")))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Compile systemverilog from ",(0,i.kt)("inlineCode",{parentName:"p"},'"dotf"')," file list."),(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("inlineCode",{parentName:"p"},"vlog.exe -f test_list.f")))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Elaboration & simulation  "),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Simulate the Design without gui:  ",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("inlineCode",{parentName:"p"},"vsim.exe work.test_tb -c -do 'run -all'"),"  "))),(0,i.kt)("li",{parentName:"ul"},"Simulate the Design with gui ",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("inlineCode",{parentName:"p"},"vsim.exe -gui work.test_tb"),"   "))))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Make sure you see the wave form of your code when running with ",(0,i.kt)("inlineCode",{parentName:"p"},"-gui"),":\n",(0,i.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/81047407/137597659-b4465e6f-3d8d-4fd6-867a-c63df68b89e7.png",alt:"image"})))),(0,i.kt)("h3",{id:"how-to-use-gui-window"},"How to use GUI window"),(0,i.kt)("p",null,"At gui window please choose the following"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"DUT: choose mini_core.",(0,i.kt)("br",{parentName:"p"}),"\n","Mark -test and than choose alive.c",(0,i.kt)("br",{parentName:"p"}),"\n","Mark -app, -hw, -sim",(0,i.kt)("br",{parentName:"p"}),"\n","Apply Run Command",(0,i.kt)("br",{parentName:"p"}),"\n","For model sim gui add -gui ")),(0,i.kt)("h2",{id:"now-you-have-everything-you-need-to-start-designing-a-riscv-core-in-systemverilog"},"Now you have everything you need to start designing a RISCV core in systemverilog!!"),(0,i.kt)("p",null,"Good place to start:\nA single cycle RV32I core:\n",(0,i.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/81047407/170105460-3ea25fe6-b71a-451c-a75f-c8f6696e6713.png",alt:"image"}),"Good luck!",(0,i.kt)("br",{parentName:"p"}),"\n","Please contact me with any issue. ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/amichai-bd"},(0,i.kt)("inlineCode",{parentName:"a"},"amichai-bd"))))}d.isMDXComponent=!0}}]);