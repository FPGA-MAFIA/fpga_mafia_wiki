## Strategy
In order to create a good env for the fabric we seperated the fabric into two conceptual components, the first one is the traffic, this part only checks if the data is moving as expected inside the fabric.
the second part will be a mini_cores_fabric which include also the mini_cores, so the fabric_mini_cores_tb is an extension of the fabric_tb.
- we also have trackers that it is a log that including all the transactions and the time of the transaction sample.
### Code
## fabric_tb
The fabric_tb is created from 3 main parts. 
1. Interface - the interface is where we connect from the software to the hardware, we are not using UVM so everything is a bit different then normal. the fabric is a 3x3 mini_core_tile that created using generate inside the fabric. This fact make it very difficult to get a signal in a generic way like signal[col][row] because of the generate. so we created those signals (i.e. interface) using generate.
```systemverilog
genvar row, col;
generate
  for (col = 1; col <= V_COL; col = col + 1) begin : gen_col
    for (row = 1; row <= V_ROW; row = row + 1) begin : gen_row
    // fabric to if 
      assign fabric.col[col].row[row].mini_core_tile_ins.mini_core_top.mini_mem_wrap.C2F_ReqValidQ103H = valid_tile[col][row]; // input to req_fifo 
      assign fabric.col[col].row[row].mini_core_tile_ins.mini_core_top.mini_mem_wrap.C2F_ReqQ103H = origin_trans[col][row];     
    // if to fabric
      assign origin_trans_fab[col][row] = fabric.col[col].row[row].mini_core_tile_ins.mini_core_top.mini_mem_wrap.C2F_ReqQ103H;   // input_data to req_fifo    
      assign tile_rsp_trans[col][row] = fabric.col[col].row[row].mini_core_tile_ins.mini_core_top.mini_mem_wrap.F2C_OutFabricQ504H;// input_data to rd_rsp fifo
      assign valid_tile_rsp[col][row] = fabric.col[col].row[row].mini_core_tile_ins.mini_core_top.mini_mem_wrap.F2C_OutFabricValidQ504H;// valid input_data to rd_rsp fifo
      assign valid_local[col][row] = fabric.col[col].row[row].mini_core_tile_ins.out_local_req_valid;
      assign target_trans[col][row] = fabric.col[col].row[row].mini_core_tile_ins.out_local_req;
      assign requestor_id_ref[col][row] = fabric.col[col].row[row].mini_core_tile_ins.pre_in_local_req.requestor_id;
      assign tile_ready[col][row] = fabric.col[col].row[row].mini_core_tile_ins.out_local_ready;
    end
  end
endgenerate
```
We created for each signal a 2D array that is connected to its relevant tile.

2. sequence - the sequence is creating the traffic for the fabric, collect the data from each tile and then actiate a DI checker.
- traffic - The data is random but it has more fields, we randomize the source tile and the target tile while making sure that it is not the same tile. then we are randomize the opcode if it is WR or RD. we can read only after write.

- data collection - the data collectors are created like this:
```systemverilog
static t_tile_trans_v monitor_source_trans [V_ROW:1] [V_COL:1] [$];
```
this is a V_ROWxV_COL queue array from t_tile_trans type. each element is collecting the data for a specific tile, in this case as a source tile.
```systemverilog
task automatic fabric_get_source_from_tile();
t_tile_trans_v [V_COL:1][V_ROW:1] temp_trans_req;
t_tile_trans_v [V_COL:1][V_ROW:1] temp_trans_rsp;
  for(int i = 1; i<= V_COL; i++) begin
    for(int j = 1; j<= V_ROW; j++) begin
      automatic int col = i;
      automatic int row = j;
      fork forever begin
        t_tile_id source_id;
        wait(valid_tile[col][row] == 1'b1);
        source_id[7:4] = col;
        source_id[3:0] = row;
        #0;
        temp_trans_req[col][row].trans.data                  = origin_trans_fab[col][row].data;
        temp_trans_req[col][row].trans.opcode                = origin_trans_fab[col][row].opcode;
        temp_trans_req[col][row].trans.address               = origin_trans_fab[col][row].address;
        temp_trans_req[col][row].trans.next_tile_fifo_arb_id = NULL_CARDINAL;
        temp_trans_req[col][row].trans.requestor_id = '0;
        temp_trans_req[col][row].source = source_id;
        temp_trans_req[col][row].target = origin_trans_fab[col][row].address[31:24];
        monitor_source_trans[col][row].push_back(temp_trans_req[col][row]);
        cnt_trans_source = cnt_trans_source + 1;
        wait(valid_tile[col][row] == 1'b0);
      end forever begin // RD_RSP
       t_tile_id source_id_rsp;
       wait(valid_tile_rsp[col][row] == 1'b1);
        source_id_rsp[7:4] = col;
        source_id_rsp[3:0] = row;
        #0;
        temp_trans_rsp[col][row].trans.data = '0;
        temp_trans_rsp[col][row].trans.address = '0;
        temp_trans_rsp[col][row].trans.opcode  = tile_rsp_trans[col][row].opcode; // input to fifo of RD_RSP in mem_wrap
        temp_trans_rsp[col][row].trans.requestor_id = '0;
        temp_trans_rsp[col][row].trans.next_tile_fifo_arb_id = NULL_CARDINAL;
        temp_trans_rsp[col][row].source = source_id_rsp;
        temp_trans_rsp[col][row].target = tile_rsp_trans[col][row].address[31:24];
        monitor_source_trans_rsp[col][row].push_back(temp_trans_rsp[col][row]);
        cnt_trans_source_rsp = cnt_trans_source_rsp + 1;
        wait(valid_tile_rsp[col][row] == 1'b0);
      end
      join_none
    end
  end
```
we have 2 collectors in this env:
- the source collector that collect the data from the source tile it can be a regular data or RD_RSP which is the data that is the data that coming back to the source tile after a read request.
- the target collector is collecting the data that finish its traffic through the fabric.
The collectors wait for the relevant signals to be valid and then collect the data into a queue.
at the end we are activating a DI_checker that checks the data.

3. Tests:
```systemverilog
task run_fabric_test(input string test);
  if (test == "fabric_alive") begin
     `include "fabric_alive.sv"
  end else if(test == "fabric_all_tiles") begin
     `include "fabric_all_tiles.sv"
  end else if(test == "fabric_wr_rd_data") begin
     `include "fabric_wr_rd_data.sv"
  end else if(test == "fabric_BP_test") begin
     `include "fabric_BP_test.sv"
  end else begin
    $error(" [ERROR] : test %s not found",test);
  end
endtask
```
The 2 main tests are the fabric_all_tiles_test and fabric_BP_test.
The fabric_all_tiles_test is activating all tiles in parallel, it ensure that the fabric is reliable when it has all kind of traffic like stress or very low traffic.
the fabrc_BP_test is a test that creating a lot of pressure on each tile, we fill all the fifo of all tiles in transactions and we want to see how the fabric is handling the pressure, if he decline new transactions or if after the release of the pressure the fabric is handling it correctley.

## fabric_mini_cores_tb
This tb is taking the fabric_tb that test the fabric traffic alone and adding to it the actual mini_cores.
in this part we compile a C program that can run on each one of our mini cores. the traffic is verified like before but now we are checking if the program do what it suppose to. 
to do it we created 9 IRAM and DRAM kike this:
```systemverilog
logic  [7:0] IMem  [V_ROW:1] [V_COL:1]   [I_MEM_SIZE_MINI + I_MEM_OFFSET_MINI - 1 : I_MEM_OFFSET_MINI];
logic  [7:0] DMem  [V_ROW:1] [V_COL:1]   [D_MEM_SIZE_MINI + D_MEM_OFFSET_MINI - 1 : D_MEM_OFFSET_MINI];
```
In order to connect them to the design we assigned them by generate like before and then load each one of the core seperatly like this:
```systemverilog
`MAFIA_DFF(IMem, IMem, clk)
task load_mem(input int col, input int row);
    $readmemh({"../../../target/fabric/tests/",test_name,"/gcc_files/inst_mem.sv"} , IMem[col][row]);
    ...
```
this task is reading the i_mem that created from the linker after compiliation.
next we loaded each imem into the relevant mini core like this:
```systemverilog
    ...
    for(int i = 1; i<= V_COL; i++) begin
      for(int j = 1; j<= V_ROW; j++) begin
        automatic int col = i;
        automatic int row = j;
        fork begin 
          load_mem(col,row);
          $display("time is %0t for tile [%0d,%0d]",$time,col,row);
        end join
        ...
        end
        end
```
In this way we can load for each tile a different program to run in parallel to the other tiles.



# TODO - add DRAM explanation and add c tests explanation. 