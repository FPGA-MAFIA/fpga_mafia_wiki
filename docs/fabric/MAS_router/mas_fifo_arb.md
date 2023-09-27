# Fifo_Arb - MAS
The fifo_arb Micro-Architecture-Specification   
A FIFO (First-In-First-Out) arbiter is a component that arbitrates between multiple FIFOs.


## General-Description
- Round Robin arbiter between 4 FIFOs
- Using the Ready signals from the target TILE to determine which FIFO to pop from


## Block Diagram


## Top level interface


## Main components:

### fifo
- parametrize FIFO (first in-first out) 
#### Motivation:
- storage requests without losing anyone.  

### arbiter
- Round Robin arbiter
#### Motivation:
- controll the output So that all the information is out. 
