"use strict";(self.webpackChunkmy_docs=self.webpackChunkmy_docs||[]).push([[1548],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=l(r),u=o,f=m["".concat(s,".").concat(u)]||m[u]||d[u]||a;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[m]="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},7488:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var n=r(7462),o=(r(7294),r(3905));const a={},i=void 0,c={unversionedId:"TFM/projectTool/linker",id:"TFM/projectTool/linker",title:"linker",description:"In the GCC RISC-V toolchain, a linker file, also known as a linker script, is a configuration file used by the linker (ld) to specify how a program's code and data should be organized in memory. It defines things like where the program's code starts, where data is stored, and how different sections are grouped together. Linker scripts are important for ensuring that the program runs correctly on a RISC-V system and can be customized to meet specific hardware requirements.",source:"@site/docs/TFM/projectTool/linker.md",sourceDirName:"TFM/projectTool",slug:"/TFM/projectTool/linker",permalink:"/fpga_mafia_wiki/docs/TFM/projectTool/linker",draft:!1,editUrl:"https://github.com/FPGA-MAFIA/fpga_mafia_wiki/tree/main/docs/TFM/projectTool/linker.md",tags:[],version:"current",frontMatter:{},sidebar:"TFM",previous:{title:"GccRiscV",permalink:"/fpga_mafia_wiki/docs/TFM/projectTool/GccRiscV"},next:{title:"crt0",permalink:"/fpga_mafia_wiki/docs/TFM/projectTool/crt0"}},s={},l=[],p={toc:l},m="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(m,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"In the GCC RISC-V toolchain, a linker file, also known as a linker script, is a configuration file used by the linker (ld) to specify how a program's code and data should be organized in memory. It defines things like where the program's code starts, where data is stored, and how different sections are grouped together. Linker scripts are important for ensuring that the program runs correctly on a RISC-V system and can be customized to meet specific hardware requirements.",(0,o.kt)("br",{parentName:"p"}),"\n","Lets take a look at our ",(0,o.kt)("inlineCode",{parentName:"p"},"*.ld")," file and explore the main sections."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Memory : We divide our memory into two memory sections, their start address and size ")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Sections : Organization of memory sections"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"  MEMORY {  \n       i_mem          : ORIGIN = 0x00000000 , LENGTH = 0x4000  \n       global_data    : ORIGIN = 0x00004000 , LENGTH = 0x4000  \n   }  \n   SECTIONS {  \n       .text : {  \n       . = ALIGN(4);  \n       *(.start);  \n       *(.text);  \n       . = ORIGIN(i_mem) + LENGTH(i_mem) - 1;  \n       BYTE(0);  \n   }  > i_mem  \n       .data : {  \n       . = ALIGN(4);  \n       *(.rodata);  \n       *(.sdata);  \n       *(.sbss);  \n       } > global_data  \n       .bss : {} > global_data  \n   } \n")))))}d.isMDXComponent=!0}}]);