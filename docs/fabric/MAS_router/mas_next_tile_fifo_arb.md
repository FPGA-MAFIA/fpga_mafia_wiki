# Next_tile_fifo_arb MAS
# 1. Overview
Brief Description:
This document outlines the micro-architecture of the next_tile_fifo_arb module, which is designed to determine the cardinal direction for forwarding requests from the current tile to the next tile in a tile-based system. It takes into account the current tile's ID and the target address to make this decision.

Purpose and Functionality:
The next_tile_fifo_arb module is responsible for selecting the cardinal direction (NORTH, EAST, SOUTH, WEST, or LOCAL) for forwarding requests based on the current tile's ID, the target address, and the availability of requests from different directions.


# 2. Interfaces
Signal Descriptions:

| Signal Name                           | Direction | Description                                              |
|---------------------------------------|-----------|----------------------------------------------------------|
| clk                                   | Input     | Clock signal.                                            |
| local_tile_id                         | Input     | The ID of the current tile.                              |
| in_north_req_valid                    | Input     | Signal indicating the validity of requests from the North direction. |
| in_east_req_valid                     | Input     | Signal indicating the validity of requests from the East direction.  |
| in_south_req_valid                    | Input     | Signal indicating the validity of requests from the South direction. |
| in_west_req_valid                     | Input     | Signal indicating the validity of requests from the West direction.  |
| in_local_req_valid                    | Input     | Signal indicating the validity of requests from the Local direction. |
| in_north_req_address [31:24]          | Input     | Address information associated with requests from the North direction. |
| in_east_req_address [31:24]           | Input     | Address information associated with requests from the East direction.  |
| in_south_req_address [31:24]          | Input     | Address information associated with requests from the South direction. |
| in_west_req_address [31:24]           | Input     | Address information associated with requests from the West direction.  |
| in_local_req_address [31:24]          | Input     | Address information associated with requests from the Local direction. |
| in_north_next_tile_fifo_arb_card      | Output    | The selected cardinal direction for forwarding requests from the North direction. |
| in_south_next_tile_fifo_arb_card      | Output    | The selected cardinal direction for forwarding requests from the South direction. |
| in_east_next_tile_fifo_arb_card       | Output    | The selected cardinal direction for forwarding requests from the East direction.  |
| in_west_next_tile_fifo_arb_card       | Output    | The selected cardinal direction for forwarding requests from the West direction.  |
| in_local_next_tile_fifo_arb_card      | Output    | The selected cardinal direction for forwarding requests from the Local direction. |

# 3. Functional Description
Operational Modes:

The module calculates the appropriate cardinal direction for forwarding requests based on the current tile's ID, the target address, and the availability of requests from different directions.

Data Flow Description:

1. The module receives requests from various directions, each with its associated validity signal and address.
2. It calculates the next_tile_id based on the current tile's ID and the predefined NEXT_TILE_CARDINAL parameter.
3. It determines the priority of different cardinal directions based on the target address and the current tile's ID.
4. The selected cardinal direction for each request is then provided as output.

# 4. Configuration and Control
Configuration Registers:

The module is primarily configured through the `NEXT_TILE_CARDINAL` parameter, which specifies the preferred cardinal direction for forwarding requests.

# 5. Testing and Verification
In the verification sidebar.