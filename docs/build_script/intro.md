---
sidebar_position: 1
---
## The MAFIA Build Flow
Welcome to the MAFIA: Multi-Agent-Fabric-Integration-Architecture.     
An initiative aimed at designing a System-on-a-Chip (SoC) Tile-based mesh fabric.  
For more details please visit the "MAFIA HOME PAGE"

In this part, we're using what we learned in the TFM section and applying it to the Mafia environment. We strongly recommend that you read the TFM section before continuing with this part.

In this section, we'll show you how we take a RISC-V 32I 5-stage pipeline core and go through all the steps, from writing and compiling a C program to simulating the hardware we've designed. Note that we're using the RISC-V 32I core as an example, but the same steps can be applied to any other RISC-V core or device(modification may be required).

The steps in this part are as follows:
1. **Getting Started**: A quick look at how folders and files are organized in Mafia.  
2. **Software Compilation**: Putting together the software part.  
3. **Hardware Compilation**: Assembling the hardware part.  
4. **Hardware Elaboration and Simulation**: Making sure the hardware behaves as expected.  
5. **Hardware GUI Debugging**: Fixing any issues in the hardware with a graphical interface.  
6. **Build Options and Examples**: Choices for building and some example scenarios.  
7. **Build GUI - Command Generator**: Creating commands using a graphical interface.  



