"use strict";(self.webpackChunkmy_docs=self.webpackChunkmy_docs||[]).push([[9756],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var o=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=o.createContext({}),m=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=m(e.components);return o.createElement(s.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=m(n),d=i,f=c["".concat(s,".").concat(d)]||c[d]||p[d]||a;return n?o.createElement(f,r(r({ref:t},u),{},{components:n})):o.createElement(f,r({ref:t},u))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,r=new Array(a);r[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:i,r[1]=l;for(var m=2;m<a;m++)r[m]=n[m];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8243:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>m});var o=n(7462),i=(n(7294),n(3905));const a={},r=void 0,l={unversionedId:"TFM/projectTool/ModelSim",id:"TFM/projectTool/ModelSim",title:"ModelSim",description:"ModelSim",source:"@site/docs/TFM/projectTool/ModelSim.md",sourceDirName:"TFM/projectTool",slug:"/TFM/projectTool/ModelSim",permalink:"/fpga_mafia_wiki/docs/TFM/projectTool/ModelSim",draft:!1,editUrl:"https://github.com/FPGA-MAFIA/fpga_mafia_wiki/tree/main/docs/TFM/projectTool/ModelSim.md",tags:[],version:"current",frontMatter:{}},s={},m=[{value:"ModelSim",id:"modelsim",level:2},{value:"vlog",id:"vlog",level:3},{value:"vsim",id:"vsim",level:3},{value:"GUI",id:"gui",level:3}],u={toc:m},c="wrapper";function p(e){let{components:t,...n}=e;return(0,i.kt)(c,(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"modelsim"},"ModelSim"),(0,i.kt)("p",null,"ModelSim is a hardware simulation and debug environment that supports VHDL, Verilog, and SystemVerilog design languages.",(0,i.kt)("br",{parentName:"p"}),"\n","It allows users to simulate and verify the functionality and performance of their digital circuits, and is widely used in the design and verification of hardware systems.  "),(0,i.kt)("h3",{id:"vlog"},"vlog"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"vlog")," is a command-line utility in ModelSim that is used to compile Verilog files into an intermediate form that can be used for simulation.",(0,i.kt)("br",{parentName:"p"}),"\n","This step is necessary before running a simulation in ModelSim.  "),(0,i.kt)("p",null,"The basic usage of the vlog command is as follows:   "),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"vlog \\<options",">"," \\<files",">"," ")),(0,i.kt)("p",null,"Here, \\<options",">"," are various command-line options that can be used to customize the compilation process, and \\<files",">"," are the Verilog files that you want to compile.",(0,i.kt)("br",{parentName:"p"}),"\n","The vlog command outputs compiled libraries and object files that are used during simulation.    "),(0,i.kt)("h3",{id:"vsim"},"vsim"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"vsim")," is a command-line utility in ModelSim that is used to start a simulation. It allows users to load a design, run a simulation, and debug the behavior of the design using various waveforms and probes.",(0,i.kt)("br",{parentName:"p"}),"\n","The basic usage of the vsim command is as follows:",(0,i.kt)("br",{parentName:"p"}),"\n",(0,i.kt)("inlineCode",{parentName:"p"},"vsim \\<options\\> \\<top_module\\>"),(0,i.kt)("br",{parentName:"p"}),"\n","Here, \\<options",">"," are various command-line options that can be used to customize the simulation, and \\<top_module",">"," is the top-level module of the design that you want to simulate.   "),(0,i.kt)("p",null,"Once the simulation is running, you can use various commands and menus to control the simulation, display waveforms, and set breakpoints.  "),(0,i.kt)("h3",{id:"gui"},"GUI"),(0,i.kt)("p",null,"ModelSim also comes with a graphical user interface (GUI) that provides a more interactive way to perform simulation and debug tasks.",(0,i.kt)("br",{parentName:"p"}),"\n","The GUI allows users to load designs, run simulations, and analyze waveforms and data using various windows and tools.",(0,i.kt)("br",{parentName:"p"}),"\n","To start the ModelSim GUI, simply type vsim -gui on the command line. This will launch the ModelSim window, where you can perform all the same tasks as the command-line interface.",(0,i.kt)("br",{parentName:"p"}),"\n","The ModelSim GUI is particularly useful for tasks such as waveform analysis, which can be visualized more easily in the GUI than in the command-line interface.",(0,i.kt)("br",{parentName:"p"}),"\n","The GUI also provides a more intuitive way to navigate and interact with the simulation environment."))}p.isMDXComponent=!0}}]);