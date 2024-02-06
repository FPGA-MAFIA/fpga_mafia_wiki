# Mini_core_tile MAS

## 1. Overview

**Brief Description:**
This document outlines the micro-architecture of the `mini_core_tile` module, which serves as a tile within a tile-based system. It manages data communication with neighboring tiles in multiple directions (North, East, West, South) and includes a local interface.

**Purpose and Functionality:**
The `mini_core_tile` module facilitates inter-tile communication and routing of data within a tile-based system. It supports UART communication, interfaces with neighboring tiles, and includes a local interface for communication with the mini core.

## 2. Block Diagram
![mini_core_tile](/drawio/mini_core_tile.jpg)

## 3. Interfaces

## North Interface

| Signal Name            | Description                              |
|------------------------|------------------------------------------|
| in_north_req_valid     | Validity of incoming North requests.     |
| in_north_req           | Incoming North requests.                 |
| in_north_ready         | Ready signal for incoming North requests.|
| out_north_req_valid    | Validity of outgoing North requests.     |
| out_north_req          | Outgoing North requests.                 |
| out_north_ready        | Ready signal for outgoing North requests.|

## East Interface

| Signal Name            | Description                              |
|------------------------|------------------------------------------|
| in_east_req_valid      | Validity of incoming East requests.      |
| in_east_req            | Incoming East requests.                  |
| in_east_ready          | Ready signal for incoming East requests. |
| out_east_req_valid     | Validity of outgoing East requests.      |
| out_east_req           | Outgoing East requests.                  |
| out_east_ready         | Ready signal for outgoing East requests. |

## West Interface

| Signal Name            | Description                              |
|------------------------|------------------------------------------|
| in_west_req_valid      | Validity of incoming West requests.      |
| in_west_req            | Incoming West requests.                  |
| in_west_ready          | Ready signal for incoming West requests. |
| out_west_req_valid     | Validity of outgoing West requests.      |
| out_west_req           | Outgoing West requests.                  |
| out_west_ready         | Ready signal for outgoing West requests. |

## South Interface

| Signal Name            | Description                              |
|------------------------|------------------------------------------|
| in_south_req_valid     | Validity of incoming South requests.     |
| in_south_req           | Incoming South requests.                 |
| in_south_ready         | Ready signal for incoming South requests.|
| out_south_req_valid    | Validity of outgoing South requests.     |
| out_south_req          | Outgoing South requests.                 |
| out_south_ready        | Ready signal for outgoing South requests.|

## Local Interface

| Signal Name            | Description                              |
|------------------------|------------------------------------------|
| in_local_req_valid     | Validity of incoming local requests.     |
| in_local_req           | Incoming local requests.                 |
| in_local_ready         | Ready signal for incoming local requests.|
| OutFabricValidQ505H    | Validity of outgoing local requests.     |
| OutFabricQ505H         | Outgoing local requests.                 |
| out_local_ready        | Ready signal for outgoing local requests.|




## 4. Functional Description

**Operational Modes:**
The `mini_core_tile` module operates in a single mode, facilitating data routing and communication with neighboring tiles.

**Data Flow Description:**
1. The module receives clock (`clk`) and reset (`rst`) signals for control.
2. It manages data communication in all four cardinal directions (North, East, West, South) with neighboring tiles using the specified input and output signals.
3. Local requests are received and processed via the `in_local_req_valid`, `in_local_req`, and `in_local_ready` signals.
4. It interfaces with the `router` module for routing data between directions.

## 5. Configuration and Control

**Configuration Registers:**
The `mini_core_tile` module does not include explicit configuration registers. Configuration and control may be implemented at a higher system level.

## 6. Testing and Verification

Specify details about testing and verification procedures in the verification sidebar.
