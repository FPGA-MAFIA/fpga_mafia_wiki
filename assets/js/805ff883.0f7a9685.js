"use strict";(self.webpackChunkmy_docs=self.webpackChunkmy_docs||[]).push([[2857],{3905:(t,e,i)=>{i.d(e,{Zo:()=>f,kt:()=>u});var r=i(7294);function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function s(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function n(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?s(Object(i),!0).forEach((function(e){a(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):s(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function o(t,e){if(null==t)return{};var i,r,a=function(t,e){if(null==t)return{};var i,r,a={},s=Object.keys(t);for(r=0;r<s.length;r++)i=s[r],e.indexOf(i)>=0||(a[i]=t[i]);return a}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)i=s[r],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(t,i)&&(a[i]=t[i])}return a}var c=r.createContext({}),h=function(t){var e=r.useContext(c),i=e;return t&&(i="function"==typeof t?t(e):n(n({},e),t)),i},f=function(t){var e=h(t.components);return r.createElement(c.Provider,{value:e},t.children)},m="mdxType",_={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},l=r.forwardRef((function(t,e){var i=t.components,a=t.mdxType,s=t.originalType,c=t.parentName,f=o(t,["components","mdxType","originalType","parentName"]),m=h(i),l=a,u=m["".concat(c,".").concat(l)]||m[l]||_[l]||s;return i?r.createElement(u,n(n({ref:e},f),{},{components:i})):r.createElement(u,n({ref:e},f))}));function u(t,e){var i=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var s=i.length,n=new Array(s);n[0]=l;var o={};for(var c in e)hasOwnProperty.call(e,c)&&(o[c]=e[c]);o.originalType=t,o[m]="string"==typeof t?t:a,n[1]=o;for(var h=2;h<s;h++)n[h]=i[h];return r.createElement.apply(null,n)}return r.createElement.apply(null,i)}l.displayName="MDXCreateElement"},9442:(t,e,i)=>{i.r(e),i.d(e,{assets:()=>c,contentTitle:()=>n,default:()=>_,frontMatter:()=>s,metadata:()=>o,toc:()=>h});var r=i(7462),a=(i(7294),i(3905));const s={},n=void 0,o={unversionedId:"rvc/core_verification/checker_tasks",id:"rvc/core_verification/checker_tasks",title:"checker_tasks",description:"minicoretasks.vh",source:"@site/docs/rvc/core_verification/checker_tasks.md",sourceDirName:"rvc/core_verification",slug:"/rvc/core_verification/checker_tasks",permalink:"/fpga_mafia_wiki/docs/rvc/core_verification/checker_tasks",draft:!1,editUrl:"https://github.com/FPGA-MAFIA/fpga_mafia_wiki/tree/main/docs/rvc/core_verification/checker_tasks.md",tags:[],version:"current",frontMatter:{},sidebar:"RISCV_Cores",previous:{title:"print_sanity",permalink:"/fpga_mafia_wiki/docs/rvc/core_verification/print_sanity"},next:{title:"verification_mini_core",permalink:"/fpga_mafia_wiki/docs/rvc/core_verification/verification_mini_core"}},c={},h=[{value:"mini_core_tasks.vh",id:"mini_core_tasksvh",level:2},{value:"analyzing outputs",id:"analyzing-outputs",level:2},{value:"Output of the data integrity test in case successful test",id:"output-of-the-data-integrity-test-in-case-successful-test",level:3},{value:"Output of the data integrity test in case of mismatch.",id:"output-of-the-data-integrity-test-in-case-of-mismatch",level:3},{value:"Types of mismatches and possible causes.",id:"types-of-mismatches-and-possible-causes",level:3}],f={toc:h},m="wrapper";function _(t){let{components:e,...i}=t;return(0,a.kt)(m,(0,r.Z)({},f,i,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"mini_core_tasksvh"},"mini_core_tasks.vh"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"mini_core_tasks.vh")," is a set of tasks used for check and track data. It contains tasks that tracks writes to register file of your and ",(0,a.kt)("a",{parentName:"p",href:"/fpga_mafia_wiki/docs/rvc/core_verification/rv32i_ref_model"},"reference core"),'. Despite its name "mini_core," these tasks can be used in any other core. You can give it a different name if you prefer.'),(0,a.kt)("p",null,"The tasks in this file keep a record of all the information stored in the register file of your core and the `rv32i_ref`` core during the simulation and compare them after the simulation is completed. If the information stored and the number of times it's stored are the same, everything is working correctly. But if they don't match, it means there's an issue, and an error message will point out the problem."),(0,a.kt)("h2",{id:"analyzing-outputs"},"analyzing outputs"),(0,a.kt)("h3",{id:"output-of-the-data-integrity-test-in-case-successful-test"},"Output of the data integrity test in case successful test"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"===============================\n# Starting data integrity test\n# ===============================\n# ref_rf_write_history size = 45\n# rf_write_history size     = 45\n#  >> rf_write_history[0] Match: time: 200, PC: 00000014, RegDsd:  1, Data: 00000000\n#  >> rf_write_history[1] Match: time: 210, PC: 00000018, RegDsd:  2, Data: 00000000\n#  >> rf_write_history[2] Match: time: 220, PC: 0000001c, RegDsd:  3, Data: 00000000\n#  >> rf_write_history[3] Match: time: 230, PC: 00000020, RegDsd:  4, Data: 00000000\n#  >> rf_write_history[4] Match: time: 240, PC: 00000024, RegDsd:  5, Data: 00000000\n#  >> rf_write_history[5] Match: time: 250, PC: 00000028, RegDsd:  6, Data: 00000000\n#  >> rf_write_history[6] Match: time: 260, PC: 0000002c, RegDsd:  7, Data: 00000000\n#  >> rf_write_history[7] Match: time: 270, PC: 00000030, RegDsd:  8, Data: 00000000\n#  >> rf_write_history[8] Match: time: 280, PC: 00000034, RegDsd:  9, Data: 00000000\n#  >> rf_write_history[9] Match: time: 290, PC: 00000038, RegDsd: 10, Data: 00000000\n#  >> rf_write_history[10] Match: time: 300, PC: 0000003c, RegDsd: 11, Data: 00000000\n#  >> rf_write_history[11] Match: time: 310, PC: 00000040, RegDsd: 12, Data: 00000000\n#  >> rf_write_history[12] Match: time: 320, PC: 00000044, RegDsd: 13, Data: 00000000\n#  >> rf_write_history[13] Match: time: 330, PC: 00000048, RegDsd: 14, Data: 00000000\n#  >> rf_write_history[14] Match: time: 340, PC: 0000004c, RegDsd: 15, Data: 00000000\n#  >> rf_write_history[15] Match: time: 350, PC: 00000050, RegDsd: 16, Data: 00000000\n#  >> rf_write_history[16] Match: time: 360, PC: 00000054, RegDsd: 17, Data: 00000000\n#  >> rf_write_history[17] Match: time: 370, PC: 00000058, RegDsd: 18, Data: 00000000\n#  >> rf_write_history[18] Match: time: 380, PC: 0000005c, RegDsd: 19, Data: 00000000\n#  >> rf_write_history[19] Match: time: 390, PC: 00000060, RegDsd: 20, Data: 00000000\n#  >> rf_write_history[20] Match: time: 400, PC: 00000064, RegDsd: 21, Data: 00000000\n#  >> rf_write_history[21] Match: time: 410, PC: 00000068, RegDsd: 22, Data: 00000000\n#  >> rf_write_history[22] Match: time: 420, PC: 0000006c, RegDsd: 23, Data: 00000000\n#  >> rf_write_history[23] Match: time: 430, PC: 00000070, RegDsd: 24, Data: 00000000\n#  >> rf_write_history[24] Match: time: 440, PC: 00000074, RegDsd: 25, Data: 00000000\n#  >> rf_write_history[25] Match: time: 450, PC: 00000078, RegDsd: 26, Data: 00000000\n#  >> rf_write_history[26] Match: time: 460, PC: 0000007c, RegDsd: 27, Data: 00000000\n#  >> rf_write_history[27] Match: time: 470, PC: 00000080, RegDsd: 28, Data: 00000000\n#  >> rf_write_history[28] Match: time: 480, PC: 00000084, RegDsd: 29, Data: 00000000\n#  >> rf_write_history[29] Match: time: 490, PC: 00000088, RegDsd: 30, Data: 00000000\n#  >> rf_write_history[30] Match: time: 500, PC: 0000008c, RegDsd: 31, Data: 00000000\n#  >> rf_write_history[31] Match: time: 510, PC: 00000090, RegDsd:  2, Data: 0001f090\n#  >> rf_write_history[32] Match: time: 520, PC: 00000094, RegDsd:  2, Data: 0001f000\n#  >> rf_write_history[33] Match: time: 530, PC: 00000098, RegDsd:  1, Data: 0000009c\n#  >> rf_write_history[34] Match: time: 560, PC: 00000150, RegDsd:  2, Data: 0001efe0\n#  >> rf_write_history[35] Match: time: 580, PC: 00000158, RegDsd:  8, Data: 0001f000\n#  >> rf_write_history[36] Match: time: 590, PC: 0000015c, RegDsd: 15, Data: 00000001\n#  >> rf_write_history[37] Match: time: 610, PC: 00000164, RegDsd: 15, Data: 00000002\n#  >> rf_write_history[38] Match: time: 630, PC: 0000016c, RegDsd: 14, Data: 00000001\n#  >> rf_write_history[39] Match: time: 640, PC: 00000170, RegDsd: 15, Data: 00000002\n#  >> rf_write_history[40] Match: time: 670, PC: 00000174, RegDsd: 15, Data: 00000003\n#  >> rf_write_history[41] Match: time: 690, PC: 0000017c, RegDsd: 15, Data: 00000000\n#  >> rf_write_history[42] Match: time: 700, PC: 00000180, RegDsd: 10, Data: 00000000\n#  >> rf_write_history[43] Match: time: 710, PC: 00000184, RegDsd:  8, Data: 00000000\n#  >> rf_write_history[44] Match: time: 720, PC: 00000188, RegDsd:  2, Data: 0001f000\n# rf_write_history size match\n# Data Integrity final status: Data integrity test passed\n# ===============================\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"This is the output of the data integrity test for one of the",(0,a.kt)("inlineCode",{parentName:"li"},"mini_core")," tests. It shows the number of writes to the register file of your core and the reference core, at this case is the programs writes 45 into the register file. It also shows the data written to the register file (Data), the time at which it was written(time), Pc value of the instruction at which it was written(PC) and the written value(RegDsd)."),(0,a.kt)("li",{parentName:"ul"},"As you can see, the data written to the register file of your core and the reference core are the same and the test is passed.")),(0,a.kt)("h3",{id:"output-of-the-data-integrity-test-in-case-of-mismatch"},"Output of the data integrity test in case of mismatch."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"===============================\n# Starting data integrity test\n# ===============================\n# ref_rf_write_history size = 45\n# rf_write_history size     = 45\n#  >> rf_write_history[0] Mismatch!!\n# ** Error: ERROR: rf_write_history mismatch\n#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84\n#       ref_rf_write_history[0] =   {time: 150, Pc: 00000014, RegDst:  1, Data: 00000000}\n#       rf_write_history    [0] =   {time: 200, Pc: 00000014, RegDst:  1, Data: 00000001}\n#  >> rf_write_history[1] Mismatch!!\n# ** Error: ERROR: rf_write_history mismatch\n#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84\n#       ref_rf_write_history[1] =   {time: 160, Pc: 00000018, RegDst:  2, Data: 00000000}\n#       rf_write_history    [1] =   {time: 210, Pc: 00000018, RegDst:  2, Data: 00000002}\n#  >> rf_write_history[2] Mismatch!!\n# ** Error: ERROR: rf_write_history mismatch\n#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84\n#       ref_rf_write_history[2] =   {time: 170, Pc: 0000001c, RegDst:  3, Data: 00000000}\n#       rf_write_history    [2] =   {time: 220, Pc: 0000001c, RegDst:  3, Data: 00000002}\n#  >> rf_write_history[3] Mismatch!!\n# ** Error: ERROR: rf_write_history mismatch\n#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84\n#       ref_rf_write_history[3] =   {time: 180, Pc: 00000020, RegDst:  4, Data: 00000000}\n#       rf_write_history    [3] =   {time: 230, Pc: 00000020, RegDst:  4, Data: 00000002}\n#  >> rf_write_history[4] Mismatch!!\n# ** Error: ERROR: rf_write_history mismatch\n#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84\n#       ref_rf_write_history[4] =   {time: 190, Pc: 00000024, RegDst:  5, Data: 00000000}\n#       rf_write_history    [4] =   {time: 240, Pc: 00000024, RegDst:  5, Data: 00000002}\n#  >> rf_write_history[5] Mismatch!!\n# ** Error: ERROR: rf_write_history mismatch\n#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84\n#       ref_rf_write_history[5] =   {time: 200, Pc: 00000028, RegDst:  6, Data: 00000000}\n#       rf_write_history    [5] =   {time: 250, Pc: 00000028, RegDst:  6, Data: 00000002}\n.\n.\n.\n#  >> rf_write_history[44] Mismatch!!\n# ** Error: ERROR: rf_write_history mismatch\n#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84\n#       ref_rf_write_history[44] =   {time: 630, Pc: 00000188, RegDst:  2, Data: 0001f000}\n#       rf_write_history    [44] =   {time: 720, Pc: 00000189, RegDst:  2, Data: 0001f004}\n# rf_write_history size match\n# Data Integrity final status: Data integrity test failed - rf_write_history mismatch\n# ===============================\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"This is an output of one of the data integrity test in case of a mismatch. "),(0,a.kt)("li",{parentName:"ul"},"first we observe that the number of write to rv32i_ref core and the core under test are the same at that case, second we got lots of (45) mismatches."),(0,a.kt)("li",{parentName:"ul"},"lets observe the first mismatch:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"#       ref_rf_write_history[0] =   {time: 150, Pc: 00000014, RegDst:  1, Data: 00000000}\n#       rf_write_history    [0] =   {time: 200, Pc: 00000014, RegDst:  1, Data: 00000001}\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The first write in the ",(0,a.kt)("inlineCode",{parentName:"li"},"rv32i_ref model")," was capture during the simulation in time of 150, and the data written to register 1 was 0. This information relates to instruction located at PC 0x00000014. You may observe the ",(0,a.kt)("inlineCode",{parentName:"li"},"_elf.txt")," file to easier debugging."),(0,a.kt)("li",{parentName:"ul"},"The first write in the ",(0,a.kt)("inlineCode",{parentName:"li"},"mini_core")," was capture during the simulation in time of 200, and the data written to register 1 was 1. This information relates to instruction located at PC 0x00000014.  "),(0,a.kt)("li",{parentName:"ul"},"To fix that issue, you need to debug your core and find out why the data written to register 1 is 1 instead of 0.")),(0,a.kt)("h3",{id:"types-of-mismatches-and-possible-causes"},"Types of mismatches and possible causes."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Pc is different between the two cores in the same write.",(0,a.kt)("sup",{parentName:"li",id:"fnref-1"},(0,a.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1")))),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"This may indicates that your core misses some write instruction to the register file."),(0,a.kt)("li",{parentName:"ul"},"If your core seems to work ok than it can be caused by the wrong Pc assignment inside the ",(0,a.kt)("inlineCode",{parentName:"li"},"mini_core_tasks.vh")," file. For example: if you use 5 stage pipeline, you need to assign the Pc value to the write history from the ",(0,a.kt)("inlineCode",{parentName:"li"},"mini_core_wb.sv")," stage (PcQ104H).")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"Data is different between the two cores in the same write",(0,a.kt)("sup",{parentName:"li",id:"fnref-1"},(0,a.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1")))),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"This may indicates that your core writes a wrong data to the register file."),(0,a.kt)("li",{parentName:"ul"},"One of the reasons for this is that your forwarding unit is not working correctly.")),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"Different number of writes to the register file",(0,a.kt)("sup",{parentName:"li",id:"fnref-1"},(0,a.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1"))," ")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"This may indicates that your core misses some write instruction to the register file as in case 1. "),(0,a.kt)("li",{parentName:"ul"},"This can caused by wrong stall (miss of instruction or perform unnecessary one).")),(0,a.kt)("p",null,(0,a.kt)("sup",{parentName:"p",id:"fnref-1"},(0,a.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1")),"This may indicates some other issues in your core like alu and many other possible issues."))}_.isMDXComponent=!0}}]);