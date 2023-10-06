# Post Process and trackers

## Cache_pp

The Cache Post-Process script is designed to compare the top level tracker generated during the execution of a cache test against a reference model. It play a pivotal role in debugging and verification. The primary goal is to identify any differences between the two sets of trackers. The script will return the differences between the two files and help us fix different bugs in the code.
We can easily run the cache PP script by using the `-pp`` flag while running our build.py script

## Cache_trk

Trackers are esential to our hardware testing. They keep an eye on what's happening inside our cache system, writing down every move it makes. Whether it's reading or writing data, or going through different stages of pipe or tq, trackers document it all.
These trackers help us catch any weird behavior or mistakes in how our system handles information, helping us understand and fix issues and making sure everything runs ad it should. The motivation behind using trackers is to have a trustworthy record-keeper that helps us improve and perfect our hardware design.
With each test execution we deploy a set of trackers, each assigned to record specific facets of our system's behavior. 

### Cache top Tracker
This tracker monitors the transactions at the top level of the cache. It observes high-level transactions within the cache, capturing information related to read and write operations.
It aids in understanding the flow of data between the core and cache, facilitating the identification of potential issues or inefficiencies in transaction handling.

**Signals Tracked:**

| Signal       | Description                                              |
| ------------ | -------------------------------------------------------- |
| Time         | Time of the cache operation                            |
| OPCODE       | Operation code                                           |
| address      | Memory address being accessed                            |
| REG/TQ_ID    | Register or Transaction Queue ID                         |
| tag          | Tag bits of the cache address                            |
| Set          | Set bits of the cache address                            |
| Data         | Data associated with the operation                     |


### Pipe I/O tracker
This tracker monitors information related to requests and circulating within the cache pipeline.
By capturing the specifics of these internal operations, it enables developers to diagnose performance bottlenecks, optimize data flow, and ensure seamless communication between different stages of the cache.

**Signals Tracked:** 

| Signal      | Description                                      |
|-------------|--------------------------------------------------|
| Time        | Timestamp of the event                         |
| REQ/RSP     | Request or Response indicator                    |
| OPCODE      | Operation code                                 |
| TQ ID       | Transaction Queue ID                           |
| Address     | Memory address involved in the operation       |
| Rd Ind      | Read indicator                                 |
| Wr Ind      | Write indicator                                |
| Data/Result | Data for a response or result of the operation. |
| CL Data     | Cache line data                                |


### Pipe Stage tracker
This tracker provides a detailed view of the cache pipeline stages. It is motivated by the need to analyze and optimize the cache's internal processing. It provides insights into hit/miss scenarios, data movement, and various stages of the pipeline, facilitating a comprehensive understanding of the cache's behavior.

**Signals tracked:**

| Signal             | Description                                        |
|--------------------|----------------------------------------------------|
| Time               | Timestamp of the event                             |           
| OPCODE             | Operation code                                     |           
| TQ ID              | Transaction Queue ID                               |           
| s_w_mru            | MRU status                                         |           
| Hit/Miss           | Hit or miss indicator                              |       
| MB Hit Cancel      | Merge Buffer hit cancel indicator                  |           
| Tag                | Cache line tag                                     |           
| Set                | Cache set                                          |           
| Offset             | Offset within the cache line                       |           
| Data               | Data involved in the operation                     |           
| s_w_valid          | Set ways valid                                     |          
| s_w_modified       | Set ways modified                                  |          
| s_w_tags           | Set ways tags                                      |  
| s_w_victim         | Set ways victim                                    |  
| s_w_hit            | Set ways hit                                       |  
| Fill Modified      | Indicate the fill is for a write op                |  
| Fill Rd            | Indicate the fill is for a read op                 |          
| Dirty Evict        | Dirty eviction bit                                 |         
| CL Data Q3         | Cache line data at Q3                              |           
| Data Array Address | Address in the data array                          |           
| CL Data            | Cache line data                                    |           


### Cache TQ tracker
This tracker focuses on the Transaction Queue (TQ) entries. His role is to monitor TQ entries to aids ensuring proper synchronization between the core and cache, tracking state changes, and identifying any anomalies in the TQ.

**Signals tracked:**

| Signal         | Description                                   |
|----------------|-----------------------------------------------|
| Time           | Timestamp of the event.                       |
| ENTRY          | TQ entry id                                   |
| State          | Current state of the entry                    |
| RD/WR          | Indicates whether it's a read or write op     |
| CL Address     | Cache line address                            |
| MB Data        | Merge Buffer data                             |
| REG ID         | Register ID                                   |
| CL Word Offset | Offset within the cache line                  |
| Rd/Wr Hit      | Indicates read or write hit                   |

### Cache ref
These tracker log transactions between the core and cache.

**Signals tracked:**

| Signal  | Description                                      |
|---------|--------------------------------------------------|
| OPCODE  | Operation code                                   |
| Address | Memory address involved in the operation.       |
| REG     | Register involved                               |
| Tag     | Cache line tag                                  |
| Set     | Cache set                                      |
| Data    | Data involved in the operation                 |


