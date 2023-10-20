# decode

- The decode stage is the second stage in the pipeline also know as Q101H stage (in our coding style). The goal of that stage is to decode the instruction and read the register file.
- One module of the decode stage is the control module: `mini_core_ctrl.sv` and second one is the register file module: `mini_core_rf.sv`.
- 1) Control module: The control module is responsible for decoding the instruction and determine the control signals. Please  [click here](rvc/common/ctrl.md) for more information about the .
- 2) Register file module: The register file has two read ports and one write port. Please  [click here](rvc/common/rf.md) for more information about the register file.

- Due to the fact that both the PC register and the Instruction memory have a latency of 1 clock cycle, the output of the instruction memory is directly connected to that stage. This connection eliminates the need for an additional cycle within the core.

