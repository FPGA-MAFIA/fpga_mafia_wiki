# The Mini Core
- Mini core is a RISC-V core that supports the RV32I and RV32E instruction set. The core is pipelined and has 5 stages: IF, ID, EX, MEM, WB. The core is written in SystemVerilog. The core is written in a modular way, so it is easy to add or remove modules. 
- `mini_core.sv` is the top module of the core. It instantiates all the modules of the core and connects them together. The modules are connected by registers. The registers are named Q100H, Q101H, Q102H, Q103H, Q104H. The registers are used to pass data between the stages of the pipeline.
- The mini_core share some common files that used in other cores and includes macros, parameters and typedefs. 

- We strongly recommend to learn the mini_core architecture and code in details because its the base of all the other cores and MAFIA project.

### Mini Core Files and location

| module        | file name           |  coding style name |   description                             |  link                            | location in MAFIA  repository |  
|---------------|---------------------|--------------------|-------------------------------------------|----------------------------------|-------------------------------| 
| mini_core     | mini_core.sv        |                    | main file with all instantiations         |                                  | `/source/mini_core/`          |           
| fetch         | mini_core_if.sv     | Q100H              | fetch instruction from instruction memory | [if](rvc/common/if.md)           | `/source/mini_core/`          |
| decode        | mini_core_id.sv     | Q101H              | decode instruction and read register file | [decode](rvc/common/decode.md)   | `/source/mini_core/`          |
| execution     | mini_core_exe.sv    | Q102H              | execute instruction                       | [exe](rvc/common/exe.md)         | `/source/mini_core/`          |
| memory        | mini_core_mem.sv    | Q103H              | read/write memory                         | [mem_acs](rvc/common/mem_acs.md) | `/source/mini_core/`          |
| write_back    | mini_core_wb.sv     | Q104H              | write back to register file               | [wb](rvc/common/wb.md)           | `/source/mini_core/`          |
 

### Package files and macros locations

| file name         |  description                                                      |  location                  |                           
|-------------------|-------------------------------------------------------------------|----------------------------|
| macros.sv         |  macros file, mostly DFF types                                    | `/source/common/`          |              
| mini_core_pkg.sv  |  enums, structs & parameters for the MAFIA core                   | `/source/mini_core/`       |  
| common_pkg.sv     |  common parameters, structs, enums used in the many_core_project  | `/source/common/`          | 
| big_core_pkg.sv   |  common parameters, structs, enums used in the many_core_project  | `/source/bog_core/`        |