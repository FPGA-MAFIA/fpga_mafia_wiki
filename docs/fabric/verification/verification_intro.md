---
sidebar_position: 1
---

# Fabric Verification Intro
This chapter will describe the verification agenda of the Fabric.
 - In the fabric we have verified three main components - FIFO_arb, Fabric and Mini_core_tile.
 - Each one of those components have its own uniqe enviroment that include TB, flow tasks, verification tasks and test lists.

 ## Terms that will be used.
  -  sequence - a sequence is a flow of activating a DUT.
  -  test - a test is a scenario that we want to check, a test can contain more then one sequence.
  - TB - test bench - will activate our DUT and will connect it to the verification enviroment.
  - Checkers - objects or components that will ensure the reliabilty of our design like data integrity checker and protocol checkers etc.
  - RM - reference model - a software object that will calculate the expected output of a DUT for each transaction that the DUT is getting.
  - fork join/join_any/join_none - a fork will create a number of threads that will run in parallel. The ending can be join i.e exit the fork only when all of the threads are over. join_any i.e exit the fork when one or more threads done. join_none - exit the fork even if no thred is done.
  

