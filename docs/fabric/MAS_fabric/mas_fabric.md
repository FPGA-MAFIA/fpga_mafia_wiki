# Fabric MAS

## 1. Overview

**Brief Description:**
This document outlines the micro-architecture of the `fabric` module, responsible for managing data routing, arbitration, and communication between different tiles in a tile-based system.

**Purpose and Functionality:**
The `fabric` module serves as the interconnection fabric, enabling communication between tiles within the system. It handles data exchange in multiple directions (North, East, West, South) and facilitates UART communication. Local tile IDs are generated based on tile positions for routing.

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

## 5. Configuration and Control

**Configuration Registers:**
The `fabric` module does not include explicit configuration registers. Configuration and control may be implemented at a higher system level.

## 6. Testing and Verification

Specify details about testing and verification procedures in the verification sidebar.
