#  Overview

This HAS (High-Level-Architecture-Specification) will describe the Cache <a name="_int_ep1dzelp"></a>DUT
The cache is a 4-way associative, 16KB Cache.
The Cache structure:

- **Transaction Queue (TQ)** – allocates entries for each read/write transaction. 
  Manage the requests life cycle until it completes in an FSM.
- **Pipe** – manages the tag array lookup (LU) & Cache access.
- **Tag Array** – memory structure that holds the tag information. (Tag, valid, modified, mru, fill)
  Accessible by reading the full set. {SET} as the LU address. [^1]
- **Data Cache Array** – memory structure that holds the Cache Data.
  Accessible using the by reading single CL. {WAY, SET} as the Address[^2]

In abstract view, the cache neighboring blocks:

- Core - sends read/write requests.
- Far Memory (FM) – Cache read misses & modified write back (WB) for “dirty evict<a name="_int_whspgelr"></a>”.
##  Top Level Cache diagram {#section-4-1}

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img alt="Image Alt Text" src="/img/Fig1.png" />
</div>


<p align="center">Figure 1 - Top Level DC_CACHE Diagram</p>

## Cache Parameters {#section-4-2}

|**Parameters**|**Value**|
| :-: | :-: |
|**NUM\_TQ\_ENTRY**|8|
|**WORD\_WIDTH**|32|
|**NUM\_WORDS\_IN\_CL**|4|
|**CL\_WIDTH**|128 (WORD\_WIDTH x NUM\_WORDS\_IN\_CL)|
|**OFFSET\_WIDTH**|4 (CL\_WIDTH = 16 Bytes)|
|**SET\_ADRS\_WIDTH**|8 (address [11:4])|
|**TAG\_WIDTH**|8 (address [19:12])|
|**ADDRESS\_WIDTH**|20 (OFFSET\_WIDTH + SET\_ADRS\_WIDTH + TAG\_WIDTH)|
|**CL\_ADRS\_WIDTH**|16 (SET\_ADRS\_WIDTH + TAG\_WIDTH)|
|**NUM\_WAYS**|4|
|**TAG\_INDICATION**|(Valid + Modified + MRU)|
|**REQ\_ID\_WIDTH**|8 (Up to 255 requests can be served out-of-order) The REQ\_ID is assigned a value according to order with wrap-around.|
|**TQ\_ID\_WIDTH**|3 (Up to 8 TQ entries, outstanding FM READ requests)|

<p align="center"> Table 2- cache parameters</p>



## Cache Size & Address bits {#section-4-3}
**Address Size:** 
Address [19:0] = {tag [7:0], set [7:0], offset [3:0]};
  ### Tag Array structure 
**Tag Array Size:**	
(#SET) x (NUM\_WAYS) x (TAG\_WIDTH)
256x4x8 = 8192 bit = 1024 Byte = 2^10 **= 1024 Byte of “TAG”**

(#SET) x (NUM\_WAYS) x (TAG\_INDICATION)
256x4x4 = 4096 bits = 512 Byte = 2^9 = **512 Byte of “TAG\_INDICATION”**

**Total Tag Array size:** (tags + indications))**
1024+512 = 1536 Byte -> 1.5KB
### Cache Data Array structure
**Cache Line Size:**
CL [127:0] = {word3[31:0], word2[31:0], word1[31:0], word0[31:0]}. 

**Data Cache Array Size:**
(#SET) x (NUM\_WAYS) x (CL\_WIDTH)
256x4x128 = 131072 bit = 16384 Byte = 2^14 = **16KB of Cache Data**



<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img alt="Image Alt Text" src="/img/Fig2-3.png" />
</div>



##  Top-Level-Interface {#section-4-4}

|**Adhoc interface**|
| :- |
|input   logic       clk,|
|input   logic       rst,|

## Core Interface {#section-4-5}

|**Output stall**||
| :- | :- |
|logic  stall,              |TQ is full, cannot accept new request|
|**input core2cache\_req**||
|logic         valid;||
|t\_req\_id      req\_id;||
|t\_opcode      opcode; |RD\_OP & WR\_OP|
|t\_address     address;||
|t\_word        data;||
|**output cache2core\_rsp**||
|logic        valid;||
|t\_adress     address;||
|t\_word       data;||
|t\_req\_id     req\_id;  ||
|||

##  FM Interface {#section-4-6}

|**output  cache2fm\_req\_q3**||
| :- | :- |
|logic           valid; ||
|t\_tq\_id         tq\_id ;||
|t\_address       address;||
|t\_cl            data;||
|t\_fm\_req\_op     opcode ;||
|**input fm2cache\_rd\_rsp**    ||
|logic       valid;||
|t\_tq\_id     tq\_id; |// must match the original rd\_req tq\_id|
|t\_cl        data;||


##  Pipe Interface {#section-4-7}

|**output  pipe\_lu\_req\_q1**||
| :- | :- |
|logic            valid;||
|t\_lu\_opcode      lu\_op ;||
|t\_tq\_id          tq\_id;||
|t\_address        address;||
|t\_cl             cl\_data        ||
|t\_word           data||
|**input pipe\_lu\_rsp\_q3**||
|logic            valid;||
|t\_lu\_result      lu\_result;||
|t\_lu\_opcode      lu\_opcode;||
|t\_tq\_id          tq\_id;||
|t\_cl             data;||
|// t\_offset      offset;||
|t\_address        address;||


[^1]: When accessing the tag array, we read/write full set, which has 4 ways. Each with Tag + indication.
[^2]: When accessing the Data cache array, we read/write single CL – which is a single way in the Set.