# Pipe

This module represents the data cache pipeline that efficiently handles cache operations, data hazards, tag comparisons, cache misses and communicates with other components. The pipeline consists of several stages, each responsible for specific tasks.
### The pipe Stages
- Q1 - Set Lookup / Tag Array Lookup
- Q2 - Data Hazard Resolution, Tag Comparison, Allocation of Victim
- Q3 - Update of Tag Array, Data Fetch, Cache Miss Handling

## Pipe Block Diagram
TODO: Add block diagram

## IO
### General IO
| Signal Name        | Direction | Size     | Description                               |
| -------------------| --------- | -------- | ----------------------------------------- |
| clk                | Input     | 1 bit    | Clock signal.                                    |
| rst                | Input     | 1 bit    | Reset signal.                                    |

### pipe<->tq IO
| Signal Name               | Direction | Size     | Description                                      |
| --------------------------| --------- | -------- | -------------------------------------------------|
| pipe_lu_req_q1            | Input     | 195 bits | Input request to the cache pipeline.             |
| pipe_lu_req_q1.valid      | Input     | 1 bit    | Valid bit for the input request.                 |
| pipe_lu_req_q1.reg_id     | Input     | 5 bits   | Register ID of the input request.                |
| pipe_lu_req_q1.addr       | Input     | 64 bits  | Address of the input request.                    |
| pipe_lu_req_q1.lu_op      | Input     | 2 bits   | Lookup operation of the input request.           |
| pipe_lu_req_q1.cl_data    | Input     | 128 bits | Cache line data of the input request.            |
| pipe_early_lu_rsp_q2      | Output    | 13 bits  | Early response from the cache pipeline.          |
| pipe_lu_rsp_q3            | Output    | 164 bits | Final response from the cache pipeline.          |
| cache2fm_req_q3           | Output    | 154 bits | Request sent to the FM (Far Memory) interface.   |

### pipe<->tag_array IO
| Signal Name        | Direction | Size     | Description                               |
| -------------------| --------- | -------- | ----------------------------------------- |
| rd_set_req_q1      | Output    | 9 bits   | Read request to the tag array.                   |
| wr_data_set_q2     | Output    | 41 bits  | Write request to the tag array.                  |
| pre_rd_data_set_rsp_q2 | Input | 44 bits  | Previous read data response from the tag array.  |

### pipe<->data_array IO
| Signal Name        | Direction | Size     | Description                               |
| -------------------| --------- | -------- | ----------------------------------------- |
| rd_cl_req_q2       | Output    | 10 bits  | Read request to the data array.                  |
| wr_data_cl_q3      | Output    | 139 bits | Write request to the data array.                 |
| pre_rd_data_cl_rsp_q3 | Input  | 128 bit ss | Previous read data response from the data array. |


## Strategy
We created a struct that represents the cache pipeline.  
In every pipe stage, we can access the struct to get the relevant information for the current stage + update the struct with the relevant information that was calculated in the current stage.

##### The struct contains the following fields:
| Field Name        | Size     | Description                               |
| ------------------| -------- | ----------------------------------------- |
TODO - add the fields



## Pipe Stages
The “Pipe” is a 3-stage pipeline that manages the tag array lookup (LU) & Cache access.

### Q1 - Set Lookup / Tag Array Lookup 
In this stage, the module performs a set lookup and tag array lookup. It prepares the cache request by extracting relevant information from the input request.
Features and Actions:
- Extracts the set index from the input address.
- Prepares the cache request by populating various fields.
- Assigns signals to the tag array lookup request.

### Q2 - Data Hazard Resolution, Tag Comparison, Allocation of Victim 
Stage Q2 is critical for hazard resolution, tag comparison, and determining the victim for cache allocation.
Updating the tag array.

#### Hazard Resolution
In the case of valid access b2b to the same set, we need to forward a sampled version (Q3) of te previous tag array write, to be used as override of the read response from tag array.
This is due to the fact that the tag array write is not yet visible to the tag array read which took place in Q1.

TODO - insert a diagram of the hazard resolution
- Detects data hazards by checking if Q2 and Q3 access the same set.
  ths is important due to the data being written to the  in Q3
- Resolves data hazards by forwarding the data from Q3 to Q2.
```systemverilog
assign hazard_detected_q2 = (cache_pipe_lu_q2.lu_set == cache_pipe_lu_q3.lu_set) && cache_pipe_lu_q3.lu_valid && cache_pipe_lu_q2.lu_valid;
...

assign rd_data_set_rsp_q2 = hazard_detected_q2 ? hazard_rd_data_set_rsp_q3 : pre_rd_data_set_rsp_q2;
```
  
#### Tag Comparison and Victim Allocation  
After we have the "final" result of the tag lookup, we compares tags to identify if cache hits & which way.
```systemverilog
always_comb begin
    for( int WAY =0; WAY<NUM_WAYS; WAY++) begin
        way_tag_match_q2[WAY] = (rd_data_set_rsp_q2.tags[WAY] == cache_pipe_lu_q2.lu_tag)  && 
                                 rd_data_set_rsp_q2.valid[WAY] &&
                                 cache_pipe_lu_q2.lu_valid ;
    end
end
```
#### choose victim in case of cache fills.
In case of a fill, we need to allocate a victim.
We prioritize "free" ways.
When all ways are occupied, we use a bit-flip pseudo MRU (Most Recently Used) policy to allocate a victim.



### Update tag array
In this stage, the module updates the tag array.
#### Read hit


#### Write hit


#### Fill


##### All are MRU - bit-flip pseudo MRU (Most Recently Used) policy
Link to the wiki pseudo MRU policy: https://en.wikipedia.org/wiki/Pseudo-LRU#Bit-PLRU
Bit-PLRU stores one status bit for each cache line. These bits are called MRU-bits. Every access to a line sets its MRU-bit to 1, indicating that the line was recently used. Whenever the last remaining 0 bit of a set's status bits is set to 1, all other bits are reset to 0. At cache misses, the leftmost line whose MRU-bit is 0 is replaced.

```systemverilog
    //-----------------------------
    // if all are MRU - need to bit flip and set the new allocation/ last hit
    //-----------------------------
    if(&(set_ways_mru_q2)) begin        
        set_ways_mru_q2 = cache_pipe_lu_q2.hit ? cache_pipe_lu_q2.set_ways_hit    : //reset all, and set only the WR/RD Hit location
                                                 cache_pipe_lu_q2.set_ways_victim ; //reset all, and set only the WR/RD Hit location
    end
```


### Data fetch
Now we determine if and where there was a cache hit, we can fetch the data from the data array.

### Q3 - Update of Tag Array, Data Fetch, Cache Miss Handling 

In the third stage, the module updates the tag array, fetches data from the data array, and handles cache misses.

Features and Actions:

- Updates the tag array based on cache operations (read, write, fill).
- Fetches data from the data array.
- Handles cache misses by sending fill requests to a far memory component.
- Detects dirty eviction for modified cache lines and sends them to far memory.
