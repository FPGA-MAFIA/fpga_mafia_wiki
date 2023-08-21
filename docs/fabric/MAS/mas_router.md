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


## Main components:

### next_tile_fifo_arb
#### Motivation:

#### IO Table:


### fifo_arb
#### Motivation:

#### IO Table:


