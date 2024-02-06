# FIFO MAS
# Overview
Brief Description:
This document describes the micro-architecture specification of a FIFO (First-In-First-Out) module, designed to temporarily store and manage data in a sequential manner.

Purpose and Functionality:
The FIFO module is intended for buffering data. It supports basic operations such as push (insert data), and pop (remove data). The module also includes flags for full, almost full, and empty states.

# Block Diagram
Placeholder for Block Diagram
[Insert High-Level Block Diagram of the FIFO here]
![2024-01-31-11-44-31.png](/snapshots/2024-01-31-11-44-31.png)
![test2.png](/drawio/test2.jpg)

# Configuration FIFO parameters:
DATA_WIDTH: Defines the width of the data in the FIFO.
FIFO_DEPTH: Defines the depth of the FIFO.

# Interfaces
Signal Descriptions:
| Signal Name | Direction | Description                                   |
|-------------|-----------|-----------------------------------------------|
| clk         | Input     | Clock signal.                                 |
| rst         | Input     | Reset signal.                                 |
| push        | Input     | Signal indicating a push operation.           |
| push_data   | Input     | Data to be pushed into the FIFO.              |
| pop         | Input     | Signal indicating a pop operation.            |
| pop_data    | Output    | Data to be popped out of the FIFO.            |
| full        | Output    | Indicates that the FIFO is full.              |
| almost_full | Output    | Indicates that the FIFO is almost full.       |
| empty       | Output    | Indicates that the FIFO is empty.             |


# Timing Diagrams - Latency:
Placeholder for Timing Diagrams
[Insert Timing Diagrams showing the interaction between inputs and outputs]

# Functional Description
Operational Modes:

Push Operation: Stores push_data into the FIFO when push is asserted.
Pop Operation: Retrieves data from the FIFO when pop is asserted.
Data Flow Description:

The FIFO stores data in a first-in-first-out manner with parametrizable depth (FIFO_DEPTH) and data width (DATA_WIDTH).

# Control Signals:
push: Controls the data insertion.
pop: Controls the data removal.

# Data path
FIXME

# Performance and Characteristics
Throughput:
Dependent on the clock frequency.

# Latency:
One clock cycle for push and pop operations.
Resource Utilization (FPGA specific):
Depends on DATA_WIDTH and FIFO_DEPTH.

# Error Handling and Exceptions
The module includes assertions (MAFIA_ASSERT) for simulation purposes to check for invalid states like pushing data when the FIFO is full and popping data when the FIFO is empty.
