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


### 3. Functional Description

#### Operational Modes:
The `next_tile_fifo_arb` module operates using an "x,y" approach in its routing algorithm, determining the next cardinal direction for forwarding requests based on the current tile's ID and the target address. Here's how the "x,y" approach typically works:

1. **Current Tile's ID (x, y):** Each tile in the system has a unique identifier represented as (x, y), where 'x' represents the column number and 'y' represents the row number.

2. **Target Address (x_target, y_target):** When a request arrives at a tile, it contains the target address it needs to reach, represented as (x_target, y_target).

3. **Calculating Next Cardinal Direction:**
   - **Priority:** The "x,y" approach prioritizes reaching the 'x' coordinate (column) before the 'y' coordinate (row).
   - **Horizontal Movement (x-axis):** If the current tile's 'x' coordinate is not equal to the target's 'x' coordinate, the routing algorithm selects the cardinal direction (EAST or WEST) that moves the request closer to the target's 'x' coordinate.
   - **Vertical Movement (y-axis):** Once the request reaches the target's 'x' coordinate, the routing algorithm then selects the cardinal direction (NORTH or SOUTH) that moves the request closer to the target's 'y' coordinate.

4. **Forwarding the Request:** Based on the calculations, the routing algorithm determines the next cardinal direction (NORTH, SOUTH, EAST, or WEST) and forwards the request to the neighboring tile in that direction.

5. **Reaching the Target:** This process continues until the request reaches the tile with the target address (x_target, y_target).

#### Future Improvements:
While the current routing algorithm uses the "x,y" approach, there is potential for future enhancements to the routing scheme. One possibility is to explore a different routing approach, such as a "y,x" scheme, where requests would reach the 'y' direction before the 'x' direction. Implementing such changes would require modifying the algorithm to prioritize reaching the row before the column, potentially improving the efficiency and performance of request forwarding in specific scenarios.

Another possible improvement to the routing scheme could be the use of adaptive routing. Adaptive routing algorithms dynamically select the path for each packet based on the network conditions and traffic load at the time of routing. This approach can potentially optimize the routing path to avoid congested or faulty areas in the network, leading to better overall performance and reliability. Implementing adaptive routing would involve monitoring network conditions and updating the routing decisions accordingly, which could be achieved through additional logic and decision-making mechanisms in the routing algorithm.

# 4. Testing and Verification
- In the tests we had to make sure that we get to a sevearl coverage points to ensure the reliability of this module.
### 1. Determining Next Tile ID:

- The module calculates the next tile ID based on the current tile ID and the specified cardinal direction (NORTH, SOUTH, EAST, WEST, or LOCAL).
- Coverage point: Ensure that each cardinal direction is covered and correctly assigns the next tile ID based on the current tile ID.

### 2. Setting Terms for Calculating Next Cardinal:

- Terms are set to calculate the next cardinal direction based on the request addresses and request valid signals.
- Coverage point: Validate that the terms are correctly set for each direction and that the calculation considers valid requests.

### 3. Translating Back to Cardinal Terms:

- The module translates the terms used for calculating the next cardinal direction back to the cardinal terms required for the output.
- Coverage point: Verify that the translation accurately maps terms to the corresponding cardinal directions.

### 4. Setting the Next Cardinal According to Algorithm:

- The module determines the next cardinal direction according to the specified algorithm. It prioritizes reaching the row (north or south) before reaching the column (east or west).
- Coverage point: Ensure that the algorithm correctly sets the next cardinal direction based on the conditions specified, including priority for row or column traversal.