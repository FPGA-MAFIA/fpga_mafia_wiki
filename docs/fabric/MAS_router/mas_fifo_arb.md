# FIFO_arb MAS
# 1. Overview
Brief Description:
This document outlines the micro-architecture of a fifo_arb module designed to manage multiple client requests and select a winner based on a predefined arbitration scheme. It interfaces with multiple fifos, arbitrates among them, and selects a winner to transmit data to the next tile.

Purpose and Functionality:
The fifo_arb module arbitrates among NUM_CLIENTS clients connected to different fifos. It uses an arbiter module to determine a winner based on the availability of data in the fifos and the readiness of the next tile to accept data.

# 2. Block Diagram
![fifo_arb](/drawio/fifo_arb.jpg)

# 3. Interfaces
Signal Descriptions:

| Signal Name                   | Direction | Description                                                        |
|-------------------------------|-----------|--------------------------------------------------------------------|
| clk                           | Input     | Clock signal.                                                      |
| rst                           | Input     | Reset signal.                                                      |
| valid_alloc_req0, 1, 2, 3      | Input     | Signals indicating valid allocation requests from different clients (0 to NUM_CLIENTS-1). |
| alloc_req0, 1, 2, 3            | Input     | Transaction details of allocation requests from different clients (0 to NUM_CLIENTS-1). |
| out_ready_fifo0, 1, 2, 3       | Output    | Signals indicating whether the corresponding fifo (0 to NUM_CLIENTS-1) is ready to accept data. |
| winner_req                    | Output    | Transaction details of the winning request to be sent to the next tile. |
| winner_req_valid              | Output    | Signal indicating the validity of the winning request.              |
| in_ready_north_arb_fifo       | Input     | Signal indicating the readiness of the arbiter fifo in the North direction. |
| in_ready_east_arb_fifo        | Input     | Signal indicating the readiness of the arbiter fifo in the East direction.  |
| in_ready_south_arb_fifo       | Input     | Signal indicating the readiness of the arbiter fifo in the South direction. |
| in_ready_west_arb_fifo        | Input     | Signal indicating the readiness of the arbiter fifo in the West direction.  |
| in_ready_local_arb_fifo       | Input     | Signal indicating the readiness of the arbiter fifo in the Local direction. |

# 4. Functional Description
The fifo_arb module utilizes a complex Round Robin scheme to prioritize allocation requests from multiple clients. This scheme involves masking the Round Robin candidates with two conditions:

1. Valid Request Waiting to Pop: The Round Robin candidates are masked to exclude any clients whose allocation requests are not valid or ready to be processed. This ensures that only requests that are eligible for processing are considered in the Round Robin selection.

2. Target Readiness: Additionally, the Round Robin candidates are masked based on the readiness of the target FIFO arbiter to accept new requests. This means that even if a client has a valid request, it will only be considered if the target FIFO arbiter is ready to receive new requests. This condition optimizes the allocation process by ensuring that requests are processed efficiently and without unnecessary delays.

The combination of these masking conditions in the Round Robin scheme enhances the overall efficiency and fairness of request allocation in the fifo_arb module, allowing it to effectively manage multiple client requests and select winners based on predefined criteria.

# 5. Configuration and Control
Configuration Registers:

NUM_CLIENTS: Defines the number of clients participating in arbitration.  
FIFO_ARB_FIFO_DEPTH: Defines the depth of each fifo in the fifo_arb module.

# 6. Performance and Characteristics
Throughput:
Dependent on the clock frequency.

Latency:
Dependent on the arbitration scheme and fifo availability.

# 7. Error Handling and Exceptions
The module does not explicitly include error handling mechanisms in this design.

# 8. Testing and Verification
In the verification sidebar.
