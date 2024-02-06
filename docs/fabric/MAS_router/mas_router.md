# Router MAS
# 1. Overview
Brief Description:
This document outlines the micro-architecture of the router module, which is designed to route and arbitrate requests between different directions (North, East, West, South, Local) in a tile-based system. It handles request validity, transaction details, and arbitration for data exchange.

Purpose and Functionality:
The router module is responsible for routing and arbitrating data requests between various directions based on input validity and arbitration logic. It ensures efficient communication between tiles within the system.

# 2. Block Diagram
![router](/drawio/router.jpg)

# 3. Interfaces
Signal tables:

## Common Signals:
| Signal Name       | Direction | Description            |
|-------------------|-----------|------------------------|
| clk               | Input     | Clock signal.          |
| rst               | Input     | Reset signal.          |
| local_tile_id     | Input     | The ID of the current tile. |

## North Interface:
| Signal Name           | Direction | Description                                       |
|-----------------------|-----------|---------------------------------------------------|
| in_north_req_valid    | Input     | Signal indicating the validity of requests from the North direction. |
| in_north_req          | Input     | Transaction details for requests from the North direction. |
| in_north_ready        | Input     | Ready signal indicating the availability for data exchange from the North direction. |
| out_north_ready       | Output    | Ready signal indicating the availability for data exchange to the North direction. |
| out_north_req_valid   | Output    | Signal indicating the validity of requests forwarded to the North direction. |
| out_north_req         | Output    | Transaction details for requests forwarded to the North direction. |

## East Interface:
| Signal Name           | Direction | Description                                       |
|-----------------------|-----------|---------------------------------------------------|
| in_east_req_valid     | Input     | Signal indicating the validity of requests from the East direction. |
| in_east_req           | Input     | Transaction details for requests from the East direction. |
| in_east_ready         | Input     | Ready signal indicating the availability for data exchange from the East direction. |
| out_east_ready        | Output    | Ready signal indicating the availability for data exchange to the East direction. |
| out_east_req_valid    | Output    | Signal indicating the validity of requests forwarded to the East direction. |
| out_east_req          | Output    | Transaction details for requests forwarded to the East direction. |

## West Interface:
| Signal Name           | Direction | Description                                       |
|-----------------------|-----------|---------------------------------------------------|
| in_west_req_valid     | Input     | Signal indicating the validity of requests from the West direction. |
| in_west_req           | Input     | Transaction details for requests from the West direction. |
| in_west_ready         | Input     | Ready signal indicating the availability for data exchange from the West direction. |
| out_west_ready        | Output    | Ready signal indicating the availability for data exchange to the West direction. |
| out_west_req_valid    | Output    | Signal indicating the validity of requests forwarded to the West direction. |
| out_west_req          | Output    | Transaction details for requests forwarded to the West direction. |

## South Interface:
| Signal Name           | Direction | Description                                       |
|-----------------------|-----------|---------------------------------------------------|
| in_south_req_valid    | Input     | Signal indicating the validity of requests from the South direction. |
| in_south_req          | Input     | Transaction details for requests from the South direction. |
| in_south_ready        | Input     | Ready signal indicating the availability for data exchange from the South direction. |
| out_south_ready       | Output    | Ready signal indicating the availability for data exchange to the South direction. |
| out_south_req_valid   | Output    | Signal indicating the validity of requests forwarded to the South direction. |
| out_south_req         | Output    | Transaction details for requests forwarded to the South direction. |

## Local Interface:
| Signal Name           | Direction | Description                                       |
|-----------------------|-----------|---------------------------------------------------|
| in_local_req_valid    | Input     | Signal indicating the validity of requests from the Local direction. |
| in_local_req          | Input     | Transaction details for requests from the Local direction. |
| in_local_ready        | Input     | Ready signal indicating the availability for data exchange from the Local direction. |
| out_local_ready       | Output    | Ready signal indicating the availability for data exchange to the Local direction. |
| out_local_req_valid   | Output    | Signal indicating the validity of requests forwarded to the Local direction. |
| out_local_req         | Output    | Transaction details for requests forwarded to the Local direction. |

# 4. Functional Description
Operational Modes:

The router module operates in various modes depending on the input validity signals and arbitration logic. It routes and forwards requests between different directions while ensuring data integrity.

Data Flow Description:

1. The module receives requests from various directions, each with its associated validity signal, transaction details, and ready signal.
2. It performs arbitration to determine the priority of requests from different directions.
3. The selected request is then forwarded to the appropriate output direction.
4. Ready signals are asserted to indicate the availability for data exchange in the selected direction.


