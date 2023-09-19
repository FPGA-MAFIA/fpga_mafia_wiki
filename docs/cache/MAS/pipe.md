# Pipe

This module represents the data cache pipelinethat efficiently handles cache operations, data hazards, tag comparisons, cache misses and communicates with other components. The pipeline consists of several stages, each responsible for specific tasks.

## Input/Output Signals

| Signal Name        | Direction | Size     | Description                               |
| -------------------| --------- | -------- | ----------------------------------------- |
| clk                | Input     | 1 bit    | Clock signal.                                    |
| rst                | Input     | 1 bit    | Reset signal.                                    |
| pipe_lu_req_q1     | Input     | 195 bits | Input request to the cache pipeline.             |
| pipe_early_lu_rsp_q2 | Output  | 13 bits  | Early response from the cache pipeline.          |
| pipe_lu_rsp_q3     | Output    | 164 bits | Final response from the cache pipeline.          |
| cache2fm_req_q3    | Output    | 154 bits | Request sent to the FM (Far Memory) interface.   |
| rd_set_req_q1      | Output    | 9 bits   | Read request to the tag array.                   |
| pre_rd_data_set_rsp_q2 | Input | 44 bits  | Previous read data response from the tag array.  |
| wr_data_set_q2     | Output    | 41 bits  | Write request to the tag array.                  |
| rd_cl_req_q2       | Output    | 10 bits  | Read request to the data array.                  |
| pre_rd_data_cl_rsp_q3 | Input  | 128 bit ss | Previous read data response from the data array. |
| wr_data_cl_q3      | Output    | 139 bits | Write request to the data array.                 |

## Components

#### Tag Array 

The tag array is a critical component that stores tag information for cache lines. It is used for tag array lookup and updating cache metadata.
#### Data Array 

The data array stores actual cache line data. It is used for data fetch operations.
#### Mafia DFF  

Mafia DFF components are used for data flip-flops, which store and synchronize data within the pipeline stages.
#### Mafia Encoder 

Mafia Encoder components are used to encode information, such as matching ways in the cache, efficiently.



## Pipe Stages

The “Pipe” is a 3-stage pipeline that manages the tag array lookup (LU) & Cache access.

### Q1 - <span style={{ fontSize: '0.9em' }}> Set Lookup / Tag Array Lookup </span>

In this stage, the module performs a set lookup and tag array lookup. It prepares the cache request by extracting relevant information from the input request.

Features and Actions:

- Extracts the set index from the input address.
- Prepares the cache request by populating various fields.
- Assigns signals to the tag array lookup request.

### Q2 - <span style={{ fontSize: '0.9em' }}>Data Hazard Resolution, Tag Comparison, Allocation of Victim </span>

Stage Q2 is critical for hazard resolution, tag comparison, and determining the victim for cache allocation.

Features and Actions:

- Detects data hazards by checking if Q2 and Q3 access the same set.
- Resolves data hazards by choosing the appropriate response.
- Compares tags to identify cache hits.
- Allocates a victim in case of cache fills.
- Updates cache metadata such as MRU, modified bits, and tags.

### Q3 - <span style={{ fontSize: '0.9em' }}>Update of Tag Array, Data Fetch, Cache Miss Handling </span>

In the third stage, the module updates the tag array, fetches data from the data array, and handles cache misses.

Features and Actions:

- Updates the tag array based on cache operations (read, write, fill).
- Fetches data from the data array.
- Handles cache misses by sending fill requests to a far memory component.
- Detects dirty eviction for modified cache lines and sends them to far memory.
