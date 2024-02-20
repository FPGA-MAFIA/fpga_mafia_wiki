# Fabric MAS

## 1. Overview

**Brief Description:**
This document outlines the micro-architecture of the `fabric` module, responsible for managing data routing, arbitration, and communication between different tiles in a tile-based system.

This general architecture that can facilitate many types of tiles, which are all connected in a mesh fashion.
It can scale to as many tiles as you want
Each tile has its own to its Memory Map and all memory are accessible using "Direct Memory Access (DMA)" by the fabric different aganets.
Will be used for distributed computation, AI, image process, all any type of "pipe-line" computation across different cores that move data from one to another

**Purpose and Functionality:**
- The `fabric` module serves as the interconnection fabric, enabling communication between tiles within the system
- It handles data exchange in multiple directions (North, East, West, South).
- Local tile IDs are generated based on tile positions for routing.
- Each tile has an "endpoint" component (CPU, accelerator or other IO component such as uart) that pass through the fabric.

## 2. Block Diagram
![fabric](/drawio/fabric.jpg)

## 3. Interfaces

### Signal Descriptions:

| Signal Name            | Direction | Description                                             |
|------------------------|-----------|---------------------------------------------------------|
| clk                    | Input     | Clock signal.                                           |
| rst                    | Input     | Reset signal.                                           |
| RstPc                  | Input     | Reset for the program counter.                          |
| InUartValid            | Input     | Valid signal for UART read/write requests.              |
| InUart                 | Input     | UART transaction details (read/write).                  |
| OutUartValid           | Output    | Valid signal for UART responses.                        |
| OutUart                | Output    | UART response details.                                  |


## 4. Functional Description

**Operational Modes:**
The `fabric` module operates in a single mode, facilitating data routing and communication between tiles.

**Data Flow Description:**
1. The module receives clock (`clk`) and reset (`rst`) signals for control.
2. It handles UART read/write requests through `InUartValid` and `InUart` and provides UART responses via `OutUartValid` and `OutUart`.
3. For tile-to-tile communication, it manages data exchange in all four cardinal directions (North, East, West, South) using arrays of signals (`in_` and `out_` signals) for request validity, transaction details, and ready signals.
4. Local tile IDs are generated based on tile positions for routing.

## 5. different configuration

In future we will be able to cange the size of the fabric by changing the ROW and COL paramters, we will also be able to connect different tiles and not just the mini_core_tile.

## 6. Testing and Verification
 We wanted to test some crutial points, the verification is in the [fabric verification tab](../verification/verification_fabric.md).

The testing and verification of the fabric module were conducted to ensure its functionality, performance, and robustness. Several key tests were performed:

1. **All Tiles Tests:** This test demonstrated that each tile within the fabric could successfully send data to any other tile. It included operations with opcodes for write (WR) and read (RD), as well as read responses (RD_RSP).

2. **Stress Test:** This test put the fabric under high stress by injecting data at a rapid rate. The purpose was to evaluate the fabric's performance and stability under extreme load conditions.

3. **Back Pressure (BP) Test:** In this test, all the FIFOs in the fabric were filled to capacity, simulating a scenario where the fabric is under maximum load. The test verified that the fabric could handle this situation without losing transactions and that once the fabric reached full capacity, it properly halted further transactions.

These tests, along with others detailed in the fabric verification documentation, ensured that the fabric module met the required specifications and performance expectations.

