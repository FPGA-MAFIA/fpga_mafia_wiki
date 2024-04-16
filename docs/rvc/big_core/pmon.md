## Performance Monitor
- Performance monitoring typically involves mechanisms to observe and analyze the behavior of the processor to identify performance bottlenecks, optimize code, and improve overall system performance.

- One of the most important features of the performance monitoring is the ability to count the number of instructions executed relatively to the number of clock cycles. This is useful for measuring the efficiency of the processor and the code running on it.

- We are going to measure two metrics:
   - CPI (Cycles Per Instruction) - the average number of clock cycles per instruction.
   - IPC (Instructions Per Cycle) - the average number of instructions per clock cycle. IPC is the inverse of CPI.

- To do that we are going to use two csr counters:
   - `instret` - counts the number of instructions retired(executed completely). 
   - `cycle` - counts the number of clock cycles. 
   -  Those Csr's are read only. They sample the machine mode csr's `mcycle` and `minstret`. 

Those hard wired counters have a size of 32 bits. Its important to say that RV32 spec allows us to extend their size to 64 bits by using two more counters: `instreth` and `cycleh`. 
- In our design, we name `cycle` and `cycleh` as `CSR_CYCLE_LOW` and `CSR_CYCLE_HIGH` respectively.    
The same goes for `instret` and `instreth` which are named `CSR_INSTRET_LOW` and `CSR_INSTRET_HIGH` respectively. 

- The address of `CSR_CYCLE_LOW` is 0xC00 and the address of `CSR_CYCLE_HIGH` is 0xC80. The address of `CSR_INSTRET_LOW` is 0xC02 and the address of `CSR_INSTRET_HIGH` is 0xC82.[^1].

- The retired instructions counter (`instret`) is incremented by one every time an instruction is valid at the last stage of the pipeline(Q105H). The invalid instructions are caused by flushes, stalls and core freezes.

- After we calculate the number of valid instructions and clock cycles, we can calculate the CPI and IPC. The CPI is calculated by dividing the number of clock cycles by the number of instructions. The IPC is calculated by dividing the number of instructions by the number of clock cycles.

### realistic example
- The task that calculates the CPI and IPC is located at the `verif/big_core/tb` folder[^2] 
- We run the following test named `alive.c` on the big_core with 6 pipeline stages:
```
int sum(int x, int y){
    return x + y;
}

int main(){
    int x = 1;
    int y = 2;
  
    int z = sum(x, y); 
    return 0;
}
```
- The summary report is:
```
===========================================
PMON tracker for alive test
Monitoring IPC and CPI
==========================================

Summary report
---------------------
Number of cycles: 79
Number of valid instructions: 68
IPC(instruction per cycles) =  0.861
IPC[%] =  86.076
CPI(cycles per instruction) =  1.162

```
### results explanation
- it takes 79 clock cycles to execute the test.
- 68 valid instructions were executed. The invalid instructions are caused by flushes, stalls and core freezes.
- the IPC is 0.861 which means that on average 0.861 instructions were executed per clock cycle.






[^1] The addresses of all the csr's we use in our design located at `/source/big_core/big_core_pkg.vh` file   
[^2] Because of constant improvements the name of the core may change but it always will belong to one of the big_cores