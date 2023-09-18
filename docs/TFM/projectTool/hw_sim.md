### Elaboration & simulation  
During this phase, we perform both the elaboration and simulation processes.

Simulate the Design without gui:  
`vsim.exe work.test_tb -c -do 'run -all'`

Simulate the Design with gui    
`vsim.exe -gui work.test_tb` 


Now, you can view the waveforms. If you're not familiar with ModelSim, you can proceed to the next section where we'll explain how to observe the waveforms 