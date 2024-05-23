"use strict";(self.webpackChunkmy_docs=self.webpackChunkmy_docs||[]).push([[5632],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var m=a.createContext({}),c=function(e){var t=a.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(m.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,m=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=c(n),u=r,k=d["".concat(m,".").concat(u)]||d[u]||p[u]||i;return n?a.createElement(k,o(o({ref:t},s),{},{components:n})):a.createElement(k,o({ref:t},s))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var l={};for(var m in t)hasOwnProperty.call(t,m)&&(l[m]=t[m]);l.originalType=e,l[d]="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1101:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const i={},o="The Mini Core",l={unversionedId:"rvc/common/intro",id:"rvc/common/intro",title:"The Mini Core",description:"- Mini core is a RISC-V core that supports the RV32I and RV32E instruction set. The core is pipelined and has 5 stages: IF, ID, EX, MEM, WB. The core is written in SystemVerilog. The core is written in a modular way, so it is easy to add or remove modules.",source:"@site/docs/rvc/common/intro.md",sourceDirName:"rvc/common",slug:"/rvc/common/intro",permalink:"/fpga_mafia_wiki/docs/rvc/common/intro",draft:!1,editUrl:"https://github.com/FPGA-MAFIA/fpga_mafia_wiki/tree/main/docs/rvc/common/intro.md",tags:[],version:"current",frontMatter:{},sidebar:"RISCV_Cores",previous:{title:"sc_core",permalink:"/fpga_mafia_wiki/docs/rvc/sc_core/"},next:{title:"if",permalink:"/fpga_mafia_wiki/docs/rvc/common/if"}},m={},c=[{value:"Mini Core Files and location",id:"mini-core-files-and-location",level:3},{value:"Package files and macros locations",id:"package-files-and-macros-locations",level:3}],s={toc:c},d="wrapper";function p(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"the-mini-core"},"The Mini Core"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Mini core is a RISC-V core that supports the RV32I and RV32E instruction set. The core is pipelined and has 5 stages: IF, ID, EX, MEM, WB. The core is written in SystemVerilog. The core is written in a modular way, so it is easy to add or remove modules. ")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"mini_core.sv")," is the top module of the core. It instantiates all the modules of the core and connects them together. The modules are connected by registers. The registers are named Q100H, Q101H, Q102H, Q103H, Q104H. The registers are used to pass data between the stages of the pipeline.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"The mini_core share some common files that used in other cores and includes macros, parameters and typedefs. ")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"We strongly recommend to learn the mini_core architecture and code in details because its the base of all the other cores and MAFIA project."))),(0,r.kt)("h3",{id:"mini-core-files-and-location"},"Mini Core Files and location"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"module"),(0,r.kt)("th",{parentName:"tr",align:null},"file name"),(0,r.kt)("th",{parentName:"tr",align:null},"coding style name"),(0,r.kt)("th",{parentName:"tr",align:null},"description"),(0,r.kt)("th",{parentName:"tr",align:null},"link"),(0,r.kt)("th",{parentName:"tr",align:null},"location in MAFIA  repository"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"mini_core"),(0,r.kt)("td",{parentName:"tr",align:null},"mini_core.sv"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"main file with all instantiations"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/source/mini_core/"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"fetch"),(0,r.kt)("td",{parentName:"tr",align:null},"mini_core_if.sv"),(0,r.kt)("td",{parentName:"tr",align:null},"Q100H"),(0,r.kt)("td",{parentName:"tr",align:null},"fetch instruction from instruction memory"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/fpga_mafia_wiki/docs/rvc/common/if"},"if")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/source/mini_core/"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"decode",(0,r.kt)("sup",{parentName:"td",id:"fnref-1"},(0,r.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1"))),(0,r.kt)("td",{parentName:"tr",align:null},"mini_core_id.sv"),(0,r.kt)("td",{parentName:"tr",align:null},"Q101H"),(0,r.kt)("td",{parentName:"tr",align:null},"decode instruction and read register file"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/fpga_mafia_wiki/docs/rvc/common/decode"},"decode")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/source/mini_core/"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"execution"),(0,r.kt)("td",{parentName:"tr",align:null},"mini_core_exe.sv"),(0,r.kt)("td",{parentName:"tr",align:null},"Q102H"),(0,r.kt)("td",{parentName:"tr",align:null},"execute instruction"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/fpga_mafia_wiki/docs/rvc/common/exe"},"exe")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/source/mini_core/"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"memory"),(0,r.kt)("td",{parentName:"tr",align:null},"mini_core_mem.sv"),(0,r.kt)("td",{parentName:"tr",align:null},"Q103H"),(0,r.kt)("td",{parentName:"tr",align:null},"read/write memory"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/fpga_mafia_wiki/docs/rvc/common/mem_acs"},"mem_acs")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/source/mini_core/"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"write_back"),(0,r.kt)("td",{parentName:"tr",align:null},"mini_core_wb.sv"),(0,r.kt)("td",{parentName:"tr",align:null},"Q104H"),(0,r.kt)("td",{parentName:"tr",align:null},"write back to register file"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/fpga_mafia_wiki/docs/rvc/common/wb"},"wb")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/source/mini_core/"))))),(0,r.kt)("h3",{id:"package-files-and-macros-locations"},"Package files and macros locations"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"file name"),(0,r.kt)("th",{parentName:"tr",align:null},"description"),(0,r.kt)("th",{parentName:"tr",align:null},"location"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"macros.sv"),(0,r.kt)("td",{parentName:"tr",align:null},"macros file, mostly DFF types"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/source/common/"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"mini_core_pkg.sv"),(0,r.kt)("td",{parentName:"tr",align:null},"enums, structs & parameters for the MAFIA core"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/source/mini_core/"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"common_pkg.sv"),(0,r.kt)("td",{parentName:"tr",align:null},"common parameters, structs, enums used in the many_core_project"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/source/common/"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"big_core_pkg.sv"),(0,r.kt)("td",{parentName:"tr",align:null},"common parameters, structs, enums used in the many_core_project"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/source/bog_core/"))))),(0,r.kt)("div",{className:"footnotes"},(0,r.kt)("hr",{parentName:"div"}),(0,r.kt)("ol",{parentName:"div"},(0,r.kt)("li",{parentName:"ol",id:"fn-1"},"Decode stage has two modules. The first one is the decoder module: ",(0,r.kt)("inlineCode",{parentName:"li"},"mini_core_id.sv")," and second one is the register file module: ",(0,r.kt)("inlineCode",{parentName:"li"},"mini_core_rf.sv"),(0,r.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")))))}p.isMDXComponent=!0}}]);