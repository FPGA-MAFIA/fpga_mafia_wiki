---
sidebar_position: 1
---

# Router - MAS
The router Micro-Architecture-Specification

## General-Description
- What is the functionally of the component?
    - A 4-way router with a single IO from each cardinal direction
    - The router has a "local" endpoint connection
    - for each direction, the router has has dedicated Ready signals to prevent HOL blocking
       - each direction has its own "FIFO Arbiter" which has output that arbitrate between the 4 FIFOs using the Ready signals + Round Robin
- What is the component's role in the system?
    - Traffic management, ordering and arbitration
    - Prevent HOL blocking by using XY routing and dedicated Ready signals per next tile final destination




## Block Diagram


## Top level interface
### General IO: 
| name          | width | direction | description |
|---------------|-------|-----------|-------------|
| clk           | 1     | in        | Clock signal|
| rst           | 1     | in        | Reset signal|
| local_tile_id | 8     | in        | The location of the TILE inside the FABRIC |
### for each direction [North, East, South, West, Local]:
#### North input Request & Ready: 
 - in_north_req_valid- Validity of the request to this router interface.
 - in_north_req- The request to this router interface. 
 - out_north_ready- The readiness of this router interface to receive requests.
#### North output Request & Ready: 
 - in_north_ready- The readiness of the destination to receive the request.  
 - out_north_req_valid- Validity of the request from this router interface.
 - out_north_req- The request from this router interface.
    
## Main components:
The main components of the router are:
- next_tile_fifo_arb x 4
- fifo_arb x 5


### next_tile_fifo_arb
- Overrides the NEXT_TILE direction in order to instruct the next TILE in which direction to go

#### Motivation:
- When moving from TILE to TILE there is a need to update the destination for the next TILE in order to reach the final destination.
#### IO Table:


### fifo_arb 
- Round Robin arbiter between 4 FIFOs
#### Motivation:
- Receiving requests from different directions and responding to everyone according to the algorithm.
#### IO Table:


