## mini_core_tasks.vh

`mini_core_tasks.vh` is a set of tasks used for check and track data. It contains tasks that tracks writes to register file of your and [reference core](/docs/rvc/core_verification/rv32i_ref_model.md). Despite its name "mini_core," these tasks can be used in any other core. You can give it a different name if you prefer.

The tasks in this file keep a record of all the information stored in the register file of your core and the `rv32i_ref`` core during the simulation and compare them after the simulation is completed. If the information stored and the number of times it's stored are the same, everything is working correctly. But if they don't match, it means there's an issue, and an error message will point out the problem.

## analyzing outputs
### Output of the data integrity test in case successful test
```
===============================
# Starting data integrity test
# ===============================
# ref_rf_write_history size = 45
# rf_write_history size     = 45
#  >> rf_write_history[0] Match: time: 200, PC: 00000014, RegDsd:  1, Data: 00000000
#  >> rf_write_history[1] Match: time: 210, PC: 00000018, RegDsd:  2, Data: 00000000
#  >> rf_write_history[2] Match: time: 220, PC: 0000001c, RegDsd:  3, Data: 00000000
#  >> rf_write_history[3] Match: time: 230, PC: 00000020, RegDsd:  4, Data: 00000000
#  >> rf_write_history[4] Match: time: 240, PC: 00000024, RegDsd:  5, Data: 00000000
#  >> rf_write_history[5] Match: time: 250, PC: 00000028, RegDsd:  6, Data: 00000000
#  >> rf_write_history[6] Match: time: 260, PC: 0000002c, RegDsd:  7, Data: 00000000
#  >> rf_write_history[7] Match: time: 270, PC: 00000030, RegDsd:  8, Data: 00000000
#  >> rf_write_history[8] Match: time: 280, PC: 00000034, RegDsd:  9, Data: 00000000
#  >> rf_write_history[9] Match: time: 290, PC: 00000038, RegDsd: 10, Data: 00000000
#  >> rf_write_history[10] Match: time: 300, PC: 0000003c, RegDsd: 11, Data: 00000000
#  >> rf_write_history[11] Match: time: 310, PC: 00000040, RegDsd: 12, Data: 00000000
#  >> rf_write_history[12] Match: time: 320, PC: 00000044, RegDsd: 13, Data: 00000000
#  >> rf_write_history[13] Match: time: 330, PC: 00000048, RegDsd: 14, Data: 00000000
#  >> rf_write_history[14] Match: time: 340, PC: 0000004c, RegDsd: 15, Data: 00000000
#  >> rf_write_history[15] Match: time: 350, PC: 00000050, RegDsd: 16, Data: 00000000
#  >> rf_write_history[16] Match: time: 360, PC: 00000054, RegDsd: 17, Data: 00000000
#  >> rf_write_history[17] Match: time: 370, PC: 00000058, RegDsd: 18, Data: 00000000
#  >> rf_write_history[18] Match: time: 380, PC: 0000005c, RegDsd: 19, Data: 00000000
#  >> rf_write_history[19] Match: time: 390, PC: 00000060, RegDsd: 20, Data: 00000000
#  >> rf_write_history[20] Match: time: 400, PC: 00000064, RegDsd: 21, Data: 00000000
#  >> rf_write_history[21] Match: time: 410, PC: 00000068, RegDsd: 22, Data: 00000000
#  >> rf_write_history[22] Match: time: 420, PC: 0000006c, RegDsd: 23, Data: 00000000
#  >> rf_write_history[23] Match: time: 430, PC: 00000070, RegDsd: 24, Data: 00000000
#  >> rf_write_history[24] Match: time: 440, PC: 00000074, RegDsd: 25, Data: 00000000
#  >> rf_write_history[25] Match: time: 450, PC: 00000078, RegDsd: 26, Data: 00000000
#  >> rf_write_history[26] Match: time: 460, PC: 0000007c, RegDsd: 27, Data: 00000000
#  >> rf_write_history[27] Match: time: 470, PC: 00000080, RegDsd: 28, Data: 00000000
#  >> rf_write_history[28] Match: time: 480, PC: 00000084, RegDsd: 29, Data: 00000000
#  >> rf_write_history[29] Match: time: 490, PC: 00000088, RegDsd: 30, Data: 00000000
#  >> rf_write_history[30] Match: time: 500, PC: 0000008c, RegDsd: 31, Data: 00000000
#  >> rf_write_history[31] Match: time: 510, PC: 00000090, RegDsd:  2, Data: 0001f090
#  >> rf_write_history[32] Match: time: 520, PC: 00000094, RegDsd:  2, Data: 0001f000
#  >> rf_write_history[33] Match: time: 530, PC: 00000098, RegDsd:  1, Data: 0000009c
#  >> rf_write_history[34] Match: time: 560, PC: 00000150, RegDsd:  2, Data: 0001efe0
#  >> rf_write_history[35] Match: time: 580, PC: 00000158, RegDsd:  8, Data: 0001f000
#  >> rf_write_history[36] Match: time: 590, PC: 0000015c, RegDsd: 15, Data: 00000001
#  >> rf_write_history[37] Match: time: 610, PC: 00000164, RegDsd: 15, Data: 00000002
#  >> rf_write_history[38] Match: time: 630, PC: 0000016c, RegDsd: 14, Data: 00000001
#  >> rf_write_history[39] Match: time: 640, PC: 00000170, RegDsd: 15, Data: 00000002
#  >> rf_write_history[40] Match: time: 670, PC: 00000174, RegDsd: 15, Data: 00000003
#  >> rf_write_history[41] Match: time: 690, PC: 0000017c, RegDsd: 15, Data: 00000000
#  >> rf_write_history[42] Match: time: 700, PC: 00000180, RegDsd: 10, Data: 00000000
#  >> rf_write_history[43] Match: time: 710, PC: 00000184, RegDsd:  8, Data: 00000000
#  >> rf_write_history[44] Match: time: 720, PC: 00000188, RegDsd:  2, Data: 0001f000
# rf_write_history size match
# Data Integrity final status: Data integrity test passed
# ===============================
```
- This is the output of the data integrity test for one of the`mini_core` tests. It shows the number of writes to the register file of your core and the reference core, at this case is the programs writes 45 into the register file. It also shows the data written to the register file (Data), the time at which it was written(time), Pc value of the instruction at which it was written(PC) and the written value(RegDsd).
- As you can see, the data written to the register file of your core and the reference core are the same and the test is passed.

### Output of the data integrity test in case of mismatch.
```
===============================
# Starting data integrity test
# ===============================
# ref_rf_write_history size = 45
# rf_write_history size     = 45
#  >> rf_write_history[0] Mismatch!!
# ** Error: ERROR: rf_write_history mismatch
#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84
#       ref_rf_write_history[0] =   {time: 150, Pc: 00000014, RegDst:  1, Data: 00000000}
#       rf_write_history    [0] =   {time: 200, Pc: 00000014, RegDst:  1, Data: 00000001}
#  >> rf_write_history[1] Mismatch!!
# ** Error: ERROR: rf_write_history mismatch
#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84
#       ref_rf_write_history[1] =   {time: 160, Pc: 00000018, RegDst:  2, Data: 00000000}
#       rf_write_history    [1] =   {time: 210, Pc: 00000018, RegDst:  2, Data: 00000002}
#  >> rf_write_history[2] Mismatch!!
# ** Error: ERROR: rf_write_history mismatch
#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84
#       ref_rf_write_history[2] =   {time: 170, Pc: 0000001c, RegDst:  3, Data: 00000000}
#       rf_write_history    [2] =   {time: 220, Pc: 0000001c, RegDst:  3, Data: 00000002}
#  >> rf_write_history[3] Mismatch!!
# ** Error: ERROR: rf_write_history mismatch
#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84
#       ref_rf_write_history[3] =   {time: 180, Pc: 00000020, RegDst:  4, Data: 00000000}
#       rf_write_history    [3] =   {time: 230, Pc: 00000020, RegDst:  4, Data: 00000002}
#  >> rf_write_history[4] Mismatch!!
# ** Error: ERROR: rf_write_history mismatch
#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84
#       ref_rf_write_history[4] =   {time: 190, Pc: 00000024, RegDst:  5, Data: 00000000}
#       rf_write_history    [4] =   {time: 240, Pc: 00000024, RegDst:  5, Data: 00000002}
#  >> rf_write_history[5] Mismatch!!
# ** Error: ERROR: rf_write_history mismatch
#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84
#       ref_rf_write_history[5] =   {time: 200, Pc: 00000028, RegDst:  6, Data: 00000000}
#       rf_write_history    [5] =   {time: 250, Pc: 00000028, RegDst:  6, Data: 00000002}
.
.
.
#  >> rf_write_history[44] Mismatch!!
# ** Error: ERROR: rf_write_history mismatch
#    Time: 730 ps  Scope: mini_core_tb.di_register_write File: ../../../verif/mini_core/tb/mini_core_tasks.vh Line: 84
#       ref_rf_write_history[44] =   {time: 630, Pc: 00000188, RegDst:  2, Data: 0001f000}
#       rf_write_history    [44] =   {time: 720, Pc: 00000189, RegDst:  2, Data: 0001f004}
# rf_write_history size match
# Data Integrity final status: Data integrity test failed - rf_write_history mismatch
# ===============================
```
- This is an output of one of the data integrity test in case of a mismatch. 
- first we observe that the number of write to rv32i_ref core and the core under test are the same at that case, second we got lots of (45) mismatches.
- lets observe the first mismatch:
```
#       ref_rf_write_history[0] =   {time: 150, Pc: 00000014, RegDst:  1, Data: 00000000}
#       rf_write_history    [0] =   {time: 200, Pc: 00000014, RegDst:  1, Data: 00000001}
```
- The first write in the `rv32i_ref model` was capture during the simulation in time of 150, and the data written to register 1 was 0. This information relates to instruction located at PC 0x00000014. You may observe the `_elf.txt` file to easier debugging.
- The first write in the `mini_core` was capture during the simulation in time of 200, and the data written to register 1 was 1. This information relates to instruction located at PC 0x00000014.  
- To fix that issue, you need to debug your core and find out why the data written to register 1 is 1 instead of 0.

### Types of mismatches and possible causes.
1. Pc is different between the two cores in the same write.[^1]
- This may indicates that your core misses some write instruction to the register file.
- If your core seems to work ok than it can be caused by the wrong Pc assignment inside the `mini_core_tasks.vh` file. For example: if you use 5 stage pipeline, you need to assign the Pc value to the write history from the `mini_core_wb.sv` stage (PcQ104H).
2. Data is different between the two cores in the same write[^1]
- This may indicates that your core writes a wrong data to the register file.
- One of the reasons for this is that your forwarding unit is not working correctly.
3. Different number of writes to the register file[^1] 
- This may indicates that your core misses some write instruction to the register file as in case 1. 
- This can caused by wrong stall (miss of instruction or perform unnecessary one).


[^1]This may indicates some other issues in your core like alu and many other possible issues.

