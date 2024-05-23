"use strict";(self.webpackChunkmy_docs=self.webpackChunkmy_docs||[]).push([[6623],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var i=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=i.createContext({}),s=function(e){var t=i.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=s(e.components);return i.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},f=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(n),f=o,m=p["".concat(c,".").concat(f)]||p[f]||d[f]||r;return n?i.createElement(m,a(a({ref:t},u),{},{components:n})):i.createElement(m,a({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:o,a[1]=l;for(var s=2;s<r;s++)a[s]=n[s];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}f.displayName="MDXCreateElement"},2917:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var i=n(7462),o=(n(7294),n(3905));const r={},a="advanced build options",l={unversionedId:"build_script/advanced_build_options",id:"build_script/advanced_build_options",title:"advanced build options",description:"If you examine the commands executed in the background during this stage, you will notice various parameters being defined, such as memory length, the crt0.s file, and more. You have the option to modify some of these parameters by using the -cfg` flag and providing a configuration.json file.",source:"@site/docs/build_script/advanced_build_options.md",sourceDirName:"build_script",slug:"/build_script/advanced_build_options",permalink:"/fpga_mafia_wiki/docs/build_script/advanced_build_options",draft:!1,editUrl:"https://github.com/FPGA-MAFIA/fpga_mafia_wiki/tree/main/docs/build_script/advanced_build_options.md",tags:[],version:"current",frontMatter:{},sidebar:"MAFIA_Build",previous:{title:"HW elaboration and simulation",permalink:"/fpga_mafia_wiki/docs/build_script/HW_elab_simulate"},next:{title:"The MAFIA Build Flow",permalink:"/fpga_mafia_wiki/docs/build_script/HW_gui_debug"}},c={},s=[{value:"Location of the configuration.json file",id:"location-of-the-configurationjson-file",level:3},{value:"Configuration.json file fields",id:"configurationjson-file-fields",level:3},{value:"The build command",id:"the-build-command",level:3}],u={toc:s},p="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,i.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"advanced-build-options"},"advanced build options"),(0,o.kt)("p",null,"If you examine the commands executed in the background during this stage, you will notice various parameters being defined, such as memory length, the crt0.s file, and more. You have the option to modify some of these parameters by using the `-cfg`` flag and providing a configuration.json file.\nIn case you don't provide a configuration.json file, the default configuration.json file will be used."),(0,o.kt)("h3",{id:"location-of-the-configurationjson-file"},"Location of the configuration.json file"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Open ",(0,o.kt)("inlineCode",{parentName:"li"},"/app")," folder. You will find the ",(0,o.kt)("inlineCode",{parentName:"li"},"crt0_<config_name>.json")," files. Those files represents the crt0.s file that will be used in the compilation process depending on the configuration you choose."),(0,o.kt)("li",{parentName:"ul"},"Open ",(0,o.kt)("inlineCode",{parentName:"li"},"app/cfg")," folder. You will find the ",(0,o.kt)("inlineCode",{parentName:"li"},"config_<config_name>.json")," files. Those files represents the configuration.json file that will be used in the compilation process depending on the configuration you choose.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"app_folder.png",src:n(6958).Z,width:"206",height:"371"})),(0,o.kt)("h3",{id:"configurationjson-file-fields"},"Configuration.json file fields"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'{\n    "I_MEM_OFFSET": 0,\n    "I_MEM_LENGTH": 8192,\n    "D_MEM_OFFSET": 8192,\n    "D_MEM_LENGTH": 16384,\n    "crt0_file"   : "crt0_big_rv32i.S",\n    "rv32_gcc"    : "rv32i",\n    "name"        : "rv32i"\n}\n')),(0,o.kt)("p",null,"Those are the default values of the configuration.json file. You can take a look at other configuration.json files in the ",(0,o.kt)("inlineCode",{parentName:"p"},"app/cfg")," folder to see how they differ from each other."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"I_MEM_OFFSET: The offset of the instruction memory in the memory map(usually 0)"),(0,o.kt)("li",{parentName:"ul"},"I_MEM_LENGTH: The length of the instruction memory in the memory map."),(0,o.kt)("li",{parentName:"ul"},"D_MEM_OFFSET: The offset of the data memory in the memory map."),(0,o.kt)("li",{parentName:"ul"},"D_MEM_LENGTH: The length of the data memory in the memory map."),(0,o.kt)("li",{parentName:"ul"},"crt0_file: The crt0.s file that will be used in the compilation process."),(0,o.kt)("li",{parentName:"ul"},"rv32_gcc: ISA set type."),(0,o.kt)("li",{parentName:"ul"},"name: The name of the configuration. This only effects the name of the output files.")),(0,o.kt)("h3",{id:"the-build-command"},"The build command"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Please type the following command in the terminal to compile the hardware part of the project:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"./build.py -cfg mini_rv32i -dut mini_core -test basic -app \n")),(0,o.kt)("p",null," In that case you will use the ",(0,o.kt)("inlineCode",{parentName:"p"},"mini_rv32i.json")," file and the ",(0,o.kt)("inlineCode",{parentName:"p"},"crt0_mini_rv32i.S")," file. All the other flags are the same mentioned in the previous sections."))}d.isMDXComponent=!0},6958:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/app_folder-a19b40874431d5f41edfa5e5f476eec1.png"}}]);