"use strict";(self.webpackChunkmy_docs=self.webpackChunkmy_docs||[]).push([[9947],{3905:(A,t,e)=>{e.d(t,{Zo:()=>c,kt:()=>S});var a=e(7294);function r(A,t,e){return t in A?Object.defineProperty(A,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):A[t]=e,A}function n(A,t){var e=Object.keys(A);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(A);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(A,t).enumerable}))),e.push.apply(e,a)}return e}function i(A){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?n(Object(e),!0).forEach((function(t){r(A,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(e)):n(Object(e)).forEach((function(t){Object.defineProperty(A,t,Object.getOwnPropertyDescriptor(e,t))}))}return A}function l(A,t){if(null==A)return{};var e,a,r=function(A,t){if(null==A)return{};var e,a,r={},n=Object.keys(A);for(a=0;a<n.length;a++)e=n[a],t.indexOf(e)>=0||(r[e]=A[e]);return r}(A,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(A);for(a=0;a<n.length;a++)e=n[a],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(A,e)&&(r[e]=A[e])}return r}var o=a.createContext({}),p=function(A){var t=a.useContext(o),e=t;return A&&(e="function"==typeof A?A(t):i(i({},t),A)),e},c=function(A){var t=p(A.components);return a.createElement(o.Provider,{value:t},A.children)},d="mdxType",s={inlineCode:"code",wrapper:function(A){var t=A.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(A,t){var e=A.components,r=A.mdxType,n=A.originalType,o=A.parentName,c=l(A,["components","mdxType","originalType","parentName"]),d=p(e),u=r,S=d["".concat(o,".").concat(u)]||d[u]||s[u]||n;return e?a.createElement(S,i(i({ref:t},c),{},{components:e})):a.createElement(S,i({ref:t},c))}));function S(A,t){var e=arguments,r=t&&t.mdxType;if("string"==typeof A||r){var n=e.length,i=new Array(n);i[0]=u;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=A,l[d]="string"==typeof A?A:r,i[1]=l;for(var p=2;p<n;p++)i[p]=e[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,e)}u.displayName="MDXCreateElement"},9372:(A,t,e)=>{e.r(t),e.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>s,frontMatter:()=>n,metadata:()=>l,toc:()=>p});var a=e(7462),r=(e(7294),e(3905));const n={},i="Arbiter MAS",l={unversionedId:"fabric/MAS_router/mas_arbiter",id:"fabric/MAS_router/mas_arbiter",title:"Arbiter MAS",description:"Brief Description:",source:"@site/docs/fabric/MAS_router/mas_arbiter.md",sourceDirName:"fabric/MAS_router",slug:"/fabric/MAS_router/mas_arbiter",permalink:"/fpga_mafia_wiki/docs/fabric/MAS_router/mas_arbiter",draft:!1,editUrl:"https://github.com/FPGA-MAFIA/fpga_mafia_wiki/tree/main/docs/fabric/MAS_router/mas_arbiter.md",tags:[],version:"current",frontMatter:{},sidebar:"Fabric",previous:{title:"FIFO_arb MAS",permalink:"/fpga_mafia_wiki/docs/fabric/MAS_router/mas_fifo_arb"},next:{title:"FIFO MAS",permalink:"/fpga_mafia_wiki/docs/fabric/MAS_router/mas_fifo"}},o={},p=[],c={toc:p},d="wrapper";function s(A){let{components:t,...n}=A;return(0,r.kt)(d,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"arbiter-mas"},"Arbiter MAS"),(0,r.kt)("h1",{id:"1-overview"},"1. Overview"),(0,r.kt)("p",null,"Brief Description:\nThis document details the micro-architecture of an Arbiter module designed to manage multiple client requests and select a winner based on a predefined arbitration scheme."),(0,r.kt)("p",null,"Purpose and Functionality:\nThe Arbiter module is used to arbitrate among NUM_CLIENTS clients. It determines which client gains access based on the input signals."),(0,r.kt)("h1",{id:"2-block-diagram"},"2. Block Diagram"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"arbiter",src:e(6029).Z,width:"389",height:"124"})),(0,r.kt)("h1",{id:"3-interfaces"},"3. Interfaces"),(0,r.kt)("p",null,"Signal Descriptions:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Signal Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Direction"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"clk"),(0,r.kt)("td",{parentName:"tr",align:null},"Input"),(0,r.kt)("td",{parentName:"tr",align:null},"Clock signal.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"rst"),(0,r.kt)("td",{parentName:"tr",align:null},"Input"),(0,r.kt)("td",{parentName:"tr",align:null},"Reset signal.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"valid_candidate"),(0,r.kt)("td",{parentName:"tr",align:null},"Input"),(0,r.kt)("td",{parentName:"tr",align:null},"Array indicating valid candidates.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"winner_dec_id"),(0,r.kt)("td",{parentName:"tr",align:null},"Output"),(0,r.kt)("td",{parentName:"tr",align:null},"Decision array indicating the winner.")))),(0,r.kt)("h1",{id:"4-functional-description"},"4. Functional Description"),(0,r.kt)("p",null,"Operational Modes:"),(0,r.kt)("p",null,"The module arbitrates among NUM_CLIENTS clients.\nIt uses the valid_candidate array to determine which clients are currently requesting access.\nData Flow Description:"),(0,r.kt)("p",null,"The arbiter prioritizes clients based on a fixed scheme.\nUpon determining a winner, the winner_dec_id signal is asserted corresponding to the winning client."),(0,r.kt)("p",null,"Waveform example:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"arbiter",src:e(7454).Z,width:"1600",height:"513"})),(0,r.kt)("p",null,"In this waveform, we can observe the behavior of the arbiter through the changes in signal values. Initially, the 'valid_candidate' signal is set to 1111, indicating that all the candidates are valid and eligible for arbitration. As the arbitration process progresses, a winner is selected based on the round-robin algorithm, which ensures fair and cyclic access to resources."),(0,r.kt)("p",null,"Once the winner is determined, the 'mask_out' signal is updated to reflect the outcome of the arbitration. This signal is used to temporarily mask the winner in the next arbitration cycle, allowing other candidates an opportunity to access the resource. As a result, the 'valid_candidate' signal changes to 1101, showing that one of the candidates is now masked out."),(0,r.kt)("p",null,"The process continues in this manner, with the 'mask_out' and 'valid_candidate' signals being updated in each cycle to ensure that all candidates are granted access in a fair and orderly fashion, according to the round-robin scheme."),(0,r.kt)("h1",{id:"5-configuration-and-control"},"5. Configuration and Control"),(0,r.kt)("p",null,"NUM_CLIENTS: Defines the number of clients participating in arbitration."))}s.isMDXComponent=!0},6029:(A,t,e)=>{e.d(t,{Z:()=>a});const a="data:image/jpeg;base64,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"},7454:(A,t,e)=>{e.d(t,{Z:()=>a});const a=e.p+"assets/images/arb-bf9ea5d1781e814bae7577b7f94e7cd2.jpg"}}]);