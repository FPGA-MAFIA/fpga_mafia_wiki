## Strategy
We devided our goal into 3 main topics.
1. Creating meaningful sequences that will assure that our design is robust and can handle pressure.
2. Creating reliable checkers.
3. Creatung a lot of robust tests that will push the design to his limits.
Note - we made here an assamption that if the FIFO_arb will be good then the FIFO and the Arbiter will be good as well. 

### Code
Our FIFO_arb verification created with the least amount of pre assumptions like size of FIFO, depth of FIFO and even the amount of FIFO's in the FIFO_arb (even though it was not in our design, we wnated to ensure the most robust DUT).
The module of the TB called "router_tb" and it is also contains one basic test for the router.
The important signals and parameters in the TB are:
```systemverilog
parameter V_REQUESTS   = 10;
parameter V_FIFO_DEPTH = 4;
parameter V_NUM_FIFO   = 4;  // number of fifos to exercise in the test (HW is always 4, simulation may stimuli only some of them)
parameter V_NO_BACK_PRESSURE = 0; // used to disable back pressure in the test which will cause a failure in the test
parameter V_MAX_DELAY  = 5; // max delay in the test
parameter V_BACK_PRESURE = 10;
logic              clk;
logic              rst;
static t_tile_trans ref_fifo_Q [3:0][$];
static t_tile_trans ref_outputs_Q [$];  
```
We created the fifo_arb inputs and outputs, the inputs are 4 FIFO's (can be less then 4) that are creatd in software (to be used as RM), they are type of dynamic array in SV that called queue.The output is the winner of each transaction. the type of the FIFO's is t_tile_trans.
we also created some parameters that can change by user definition.
The main sequence is:
``` systemverilog
  fork 
      run_fifo_arb_test(test_name);
      fifo_arb_get_inputs();
      fifo_arb_get_outputs();
  join
```
We are activating three tasks in parallel, run the test and two collectors that will collect the input and the output of the FIFO_arb (for each FIFO obviousley).

 - run_fifo_arb_test(test_name);
 ```systemverilog
 task run_fifo_arb_test(input string test);
  delay(30);
  // ====================
  // fifo_arb tests:
  // ====================
  if (test == "fifo_arb_simple") begin
     `include "fifo_arb_simple.sv"
  end else if(test == "fifo_arb_single_fifo_full_BW")begin
    `include "fifo_arb_single_fifo_full_BW.sv"
  end else if(test == "fifo_arb_all_fifo_full_BW")begin
    `include "fifo_arb_all_fifo_full_BW.sv"
  end else if(test == "fifo_arb_Assertion_test")begin
    `include "fifo_arb_Assertion_test.sv"
  end else if(test == "fifo_arb_back_pressure")begin
    `include "fifo_arb_back_pressure.sv"
  end else begin
    $error(" [ERROR] : test %s not found",test);
  end
endtask

 ```
 This task is running the relevant test that was chosen by the user. 

 - fifo_arb_get_inputs();
 ```systemverilog
 task automatic fifo_arb_get_inputs();
 for(int i = 0; i<4; i++) begin
  automatic int index = i;
  fork begin
    forever begin
      wait(valid_alloc_req[index] == 1'b1);
      #0;
      cnt_in = cnt_in + 1;
      $display("input of fifo number %0d and CNT_IN = %0d",index,cnt_in);
      ref_fifo_Q[index].push_back(alloc_req[index]);
      wait(valid_alloc_req[index] == 1'b0);  
    end
  end 
  forever begin
    wait(fifo_arb_ins.arb.winner_dec_id[index] == 1'b1);
    if(winner_req_valid == 1'b0) $display("problem in fifo %0d at time %0t",index,$time);
    cnt_fifo_pop = cnt_fifo_pop + 1;
    $display("cnt_fifo_pop = %0d in fifo %0d at time %0t winner_valid is %0b and fifo_pop is %4b",cnt_fifo_pop,index,$time,winner_req_valid,fifo_arb_ins.arb.winner_dec_id);
    wait(fifo_arb_ins.arb.winner_dec_id[index] == 1'b0);
  end
  join_none
end
endtask
 ```
 This task is using a technique that creating all the fifo's at the same time in parallel, we are using fork - join_none to put the process in the background so the code will continue to run. in this way we created a for loop that generates 4 software fifo's in parallel.
 Each FIFO is getting a thread of his own that including two sub threds that runs in parallel as well.The first sub thread is collecting all the transaction inputs of the relevant FIFO, the second sub thread is collecting the output of each FIFO, this way we can know where was an issue in a more specific way.

 - fifo_arb_get_outputs();
 ```systemverilog
 task automatic fifo_arb_get_outputs();
int fifo_pop_cnt = 0;
fork
forever begin
  @(winner_req);
  #0;
  if(winner_req_valid == 1'b1)begin
  cnt_out = cnt_out + 1;
  ref_outputs_Q.push_back(winner_req);
  $display("CNT OUT = %0d",cnt_out);
  end
end
join_none
endtask
 ```
 This task, also run's in the bacground, simply collect all the output transactions from the fifo_arb and save them in a queue for post process.

 - Post process.
 The last part of the verification is the DI_checker (Data Integrity).
after the sequence is finished we are activating a checker that will compare the data from the inputs and the  output.

```systemverilog
task fifo_arb_DI_checker(); // pseudo SB
automatic bit check = 0;
repeat(5000)begin
  foreach(ref_fifo_Q[i,j])begin
    foreach(ref_outputs_Q[k])begin
      if(ref_fifo_Q[i][j] == ref_outputs_Q[k])begin
        ref_fifo_Q[i].delete(j);
        ref_outputs_Q.delete(k);
      end
     end
    end
   end
  if(ref_outputs_Q.size()!= 0)begin
    $error("output list not empty ,data is and size %0d",ref_outputs_Q.size());
    check = 1'b1;
  end
  for(int i=0;i<4;i++)begin
    if(ref_fifo_Q[i].size() != 0)begin
      check = 1'b1;
       $error("input list not empty for fifo %0d , and size %0d",i,ref_fifo_Q[i].size());
    end   
  end
  if(check == 1'b0)
    $display("DI CHECKER: DATA IS CORRECT");
endtask
```
This task is simply checks if all the inputs did got out from the fifo_arb. it iterates all the arrays and compare the input array to the output array, if there is a mismatch then the checker will allert in which fifo and whuch transaction we had this issue.

# Tests 
We wanted to create the strongest tests that will push our design to its limits. 
We have 5 tests that can be paramtrize. 
1. fifo_arb_simple.
2. fifo_arb_single_fifo_full_BW.
3. fifo_arb_all_fifo_full_BW.
4. fifo_arb_Assertion_test.
5. fifo_arb_back_pressure.

Tests 1 and 2 are very simple and created as first step just to see the flow of the design.

Test 3 is a very powerfull test, it activating all fifo's in the same time and pushes random data in random times to each one of them.
```systemverilog
int cycle_delay;
int cycle_delay_arb;
int delay_test;
static int fifo_finish;
for(int i = 0; i<V_NUM_FIFO; i++) begin
  automatic int fifo = i;
  fork begin 
    $display("this is fifo %d at time %t",fifo,$time);
    for(int j = 0; j < V_REQUESTS; j++)begin
        wait(fifo_arb_ins.full[fifo] == '0);
        cycle_delay = $urandom_range(0, V_MAX_DELAY);
        delay(cycle_delay);  
        $display("fifo %d and request %0d at time: %0t and full[%0d] is %0b and full is %4b",fifo,j,$time,fifo,fifo_arb_ins.full[fifo],fifo_arb_ins.full );
        fifo_arb_gen_trans(fifo);
    end
  fifo_finish = fifo_finish + 1;
  $display("############# this is FIFO_FINISH %0d in fifo %0d at time %t",fifo_finish,fifo,$time);

  end 
  join_none
end
fork : in_ready_arb_fifo_fork
    begin
    forever begin
    cycle_delay_arb = $urandom_range(2, V_MAX_DELAY + 15);
    rand_in_ready = $urandom_range(0,15);
    delay(cycle_delay_arb);
    in_ready_arb_fifo = {5{rand_in_ready}};
    end
  end
  begin
    delay_test = V_REQUESTS/V_NUM_FIFO;
    delay(delay_test);
  end
join_any
disable in_ready_arb_fifo_fork;
in_ready_arb_fifo = 5'b11111;
wait(fifo_finish == (V_NUM_FIFO));
$display("############# this is empty %4b at time %t befote wait",fifo_arb_ins.empty,$time);
wait(fifo_arb_ins.empty == 4'b1111);
$display("############# after wait FIFO_FINISH %0d at time %0t",fifo_finish,$time);
$display("############# this is empty %4b at time %t after wait",fifo_arb_ins.empty,$time);
```
This test is activating all FIFO's using fork - join_none and randomize the data and the delay.
the number of transaction is defined by the user as long as the number of FIFO's and the depth of each FIFO. We created a lot of tests that changes those parameters.

The assertion_test is not in the GK, it is only a test that will violate the rule of our assertion so we can verify that out assertions are correct.

and the last test is a back_pressure_test. In this test we wanted to check a real scenario that the fifo_arb will need to handle with. in this case we fill the fifo_arb completley and we didnt allow the transaction to get out of the fifo_arb. we expect that the fifo_arb wont take any new request until the pressure is down. we did it by blocking (using XMR) the ready signal that get into the fifo_arb so the transactions wont be able to get out. 

# Conclusion
- our sequence is a generic one that all our tests are using it.
- our DI checker is a simple yet a powerfull one, we found a lot of issues that were fixed and it assure us a reliable GK.
In order to verify smaller parts or protocols we added assertions and not a checkers, for instanse we use an assertion that checks if we are trying to read from an empty FIFO, our assertion_test verify that.
- Those tests are very robust and we changed the parameter to get into lot of corners in our design.
- All in all this env helped us to find a lot of bugs and issues that were in the origin design and it gave us some confident about the reliability of our design.


 
