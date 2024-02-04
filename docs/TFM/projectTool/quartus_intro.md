# General Introduction

## Quartus Prime
Quartus is a software suite developed by Intel (formerly Altera) that is used for designing, programming, and configuring Field-Programmable Gate Arrays (FPGAs)   

 - Design Environment: Quartus provides a comprehensive environment for designing these custom logic circuits. It includes tools for creating and simulating your digital designs, as well as tools for synthesizing and compiling your designs into a format that can be loaded onto the FPGA.

- Hardware Description Language (HDL): Quartus works with hardware description languages like VHDL and Verilog, which allow engineers to describe the behavior of their digital circuits. These descriptions are then used to generate the configuration files needed to program the FPGA.

- Programming and Configuration: Once your design is complete, Quartus helps you generate the bitstream or configuration file that can be loaded onto the target FPGA. This file tells the hardware how to configure itself to implement your custom logic.

- Integration with FPGA Boards: Quartus is often used in conjunction with specific FPGA development boards, which provide the physical hardware for testing and running your custom designs.

***The best way to learn Quartus is by practicing, so don't worry, we'll come back to it later.***

## FPGA

An FPGA, or Field-Programmable Gate Array, is a type of electronic device that can be programmed to perform custom digital logic functions. Unlike traditional microprocessors, which have fixed functionality, FPGAs are highly flexible and can be configured to implement a wide range of digital circuits and functions.

Here are some key points about FPGAs:

- Custom Logic: FPGAs can be used to create custom digital logic circuits tailored to specific tasks. This makes them highly versatile for applications that require specialized hardware acceleration or signal processing.

- Reprogrammable: FPGAs can be reconfigured and reprogrammed as needed, allowing for iterative development and updates to the hardware design without changing the physical chip.

- Hardware Description Languages (HDLs): FPGAs are typically programmed using hardware description languages like VHDL or Verilog. These languages allow engineers to describe the behavior of digital circuits at a low level.

- Parallel Processing: FPGAs excel at parallel processing tasks, where multiple operations can be executed simultaneously. This makes them suitable for applications like real-time signal processing and cryptography.

- Low-Level Control: FPGAs provide fine-grained control over hardware, making them useful in applications where precise timing and control are required.

- Applications: FPGAs find applications in various fields, including telecommunications, aerospace, automotive, robotics, and high-performance computing.

- In summary, an FPGA is a reprogrammable electronic device that allows engineers and developers to create custom digital logic circuits and functions, making it a valuable tool for a wide range of applications that require specialized hardware.

## DE10_lite FPGA board
The DE10-Lite is an FPGA (Field-Programmable Gate Array) development board produced by Terasic, a company that specializes in FPGA development boards and solutions. The DE10-Lite board is designed for educational and hobbyist purposes, offering a cost-effective way to learn and experiment with FPGA technology.

Key features of the DE10-Lite board typically include:

- FPGA Chip: The board features an Altera (now Intel) MAX 10 FPGA chip. This FPGA can be programmed to implement custom digital logic circuits.

- I/O Interfaces: DE10-Lite typically includes various I/O interfaces such as LEDs, switches, buttons, and GPIO (General Purpose Input/Output) pins, allowing users to interact with and test their FPGA designs.

- Onboard Components: It may have onboard components like oscillators and voltage regulators to simplify FPGA experimentation.

- Connectivity: The board often includes USB ports or other connectors for programming the FPGA and transferring data to/from a computer.

- Power Supply: DE10-Lite boards typically require an external power supply or may be powered through USB, depending on the model.

- Programming Tools: Users can program the FPGA on the DE10-Lite board using FPGA development software like Quartus (developed by Intel) or other FPGA development environments.

Overall, the DE10-Lite is a versatile FPGA development board that provides a platform for learning and prototyping digital logic circuits and FPGA-based projects. It's commonly used in educational settings and by hobbyists for experimenting with FPGA technology and creating custom hardware solutions. 
In the picture : DE10-LITE FPGA board
  
![de10-lite-image](/img/de10_lite.png)   

For more details please click [here](https://www.terasic.com.tw/cgi-bin/page/archive.pl?Language=English&No=1021). 


