# Cache HAS - High Level Specification

#### References
- presentation()
- MAS()
- Repository()
## Introduction


## Overview
This HAS (High-Level-Architecture-Specification) will describe the Cache DUT 
The cache is a 4-way associative, 16KB Cache. 
The Cache structure: 
- **Transaction Queue (TQ)** – allocates entries for each read/write transaction.  
Manage the requests life cycle until it completes in an FSM. 

- **Pipe** – manages the tag array lookup (LU) & Cache access. 

- **Tag Array** – memory structure that holds the tag information. (Tag, valid, modified, mru, fill) 
Accessible by reading the full set. {SET} as the LU address. 1 

- **Data Cache Array** – memory structure that holds the Cache Data. 
Accessible using the by reading single CL. {WAY, SET} as the Address2 

In abstract view, the cache neighboring blocks: 
- **Core** - sends read/write requests. 
- **Far Memory (FM)** – Cache read misses & modified write back (WB) for “dirty evict”. 

## Cache Block Diagram
![Cache Block Diagram](/drawio/cache_top.jpg)

### Cache Parameters
| Parameter        | Value | Description                                                                       |
|------------------|-------|-----------------------------------------------------------------------------------|
| NUM_TQ_ENTRY     | 8     |                                                                                   |
| WORD_WIDTH       | 32    |                                                                                   |
| NUM_WORDS_IN_CL  | 4     |                                                                                   |
| CL_WIDTH         | 128   | (WORD_WIDTH x NUM_WORDS_IN_CL)                                                    |
| OFFSET_WIDTH     | 4     | (CL_WIDTH = 16 Bytes)                                                             |
| SET_ADRS_WIDTH   | 8     | (address [11:4])                                                                  |
| TAG_WIDTH        | 8     | (address [19:12])                                                                 |
| ADDRESS_WIDTH    | 20    | (OFFSET_WIDTH + SET_ADRS_WIDTH + TAG_WIDTH)                                       |
| CL_ADRS_WIDTH    | 16    | (SET_ADRS_WIDTH + TAG_WIDTH)                                                      |
| NUM_WAYS         | 4     |                                                                                   |
| TAG_INDICATION   |       | (Valid + Modified + MRU)                                                          |
| REQ_ID_WIDTH     | 8     | (Up to 255 requests can be served out-of-order) The REQ_ID is assigned a value... |
| TQ_ID_WIDTH      | 3     | (Up to 8 TQ entries, outstanding FM READ requests)                                |


## Cache Size & Bits
**Address Size:**  
Address [19:0] = {tag [7:0], set [7:0], offset [3:0]}; 

### Tag Array structure 
**Tag Array Size:**	 
(#SET) x (NUM_WAYS) x (TAG_WIDTH)   
256x4x8 = 8192 bit = 1024 Byte = 2^10 = 1024 Byte of “TAG”   
(#SET) x (NUM_WAYS) x (TAG_INDICATION)   
256x4x4 = 4096 bits = 512 Byte = 2^9 = 512 Byte of “TAG_INDICATION”   
Total Tag Array size: (tags + indications)   
 1024+512 = 1536 Byte -> 1.5KB   

### Cache Data Array structure 
**Cache Line Size:**  
CL [127:0] = {word3[31:0], word2[31:0], word1[31:0], word0[31:0]}.  

**Data Cache Array Size: **
(#SET) x (NUM_WAYS) x (CL_WIDTH) 
256x4x128 = 131072 bit = 16384 Byte = 2^14 = 16KB of Cache Data 

### Figure tag & data array structure
![tag & data array structure](/drawio/tag_data_array.jpg)


## Cache within the system

### Cache<->Core interface & assumptions
The interaction between the core & the cache.
The core requests read/write - which are load/store operations.  
This is done with a valid-ready interface, where the core is sending valid request, and te cache can back-pressure the core with a ready signal.
If the core valid is high, and the cache ready is low, the core should hold the request until the cache is ready.
#### valid-ready
The 
**simple_request**
![2023-09-28-10-27-18.png](/snapshots/2023-09-28-10-27-18.png)
{
  "signal": [
    {"name": "clk", "wave": "p......."},
    {"name": "core2cache_req.valid", "wave": "01010110"},
    {"name": "core2cache_req.opcode", "wave": "x3x4x34x", "data": ["read", "write", "read", "write"]},
    {"name": "core2cache_req.address", "wave": "x3x4x34x", "data": ["0x05", "0x08", "0x0C", "0x0F"]},
    {"name": "core2cache_req.data", "wave": "xxx4xx4x", "data": ["0xA8", "0xBF"]},
    {"name": "core2cache_req.reg_id", "wave": "x3xxx3xx", "data": ["x3", "x2", "x4"]},
    {"name": "ready", "wave": "1......."}
  ]
}


**back-pressure**
![2023-09-28-10-36-57.png](/snapshots/2023-09-28-10-36-57.png)
{
  "signal": [
    {"name": "clk", "wave": "p..........."},
    {"name": "core2cache_req.valid", "wave": "0101.....0.."},
    {"name": "core2cache_req.opcode", "wave": "x3x4.....x..", "data": ["read", "write", "write", "write", "write", "write"]},
    {"name": "core2cache_req.address", "wave": "x3x4.....x..", "data": ["0x05", "0x08", "0x08", "0x08", "0x08", "0x08"]},
    {"name": "core2cache_req.data", "wave": "xxx4.....x..", "data": ["0xA8", "0xA8", "0xA8", "0xA8", "0xA8"]},
    {"name": "core2cache_req.reg_id", "wave": "x3xxxxxxx..."},
    {"name": "cache_ready", "wave": "1.0.....1..."}
  ]
}

### Cache<->Far Memory interface & assumptions