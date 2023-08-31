# Common examples
## Mux
In System Verilog, there are many ways to code a mux.  
We will show a couple of examples and what are the implications of them

Lets use this as the signals:
```systemverilog
logic [3:0] in [3:0];
logic [1:0] enc_sel;
logic [3:0] out ;
```

### Most compact:
```systemverilog
assign out = in[enc_sel];
```
### Naive If else
```systemverilog
always_comb begin
  if      (enc_sel == 2'b00) out =in[0];
  else if (enc_sel == 2'b01) out =in[1];
  else if (enc_sel == 2'b10) out =in[2];
  else if (enc_sel == 2'b11) out =in[3];
end
```

### compact if else - "? : "
```systemverilog
assign out = (enc_sel == 2'b00) ? in[0] : 
             (enc_sel == 2'b01) ? in[1] : 
             (enc_sel == 2'b10) ? in[2] : 
                                  in[3] ; // (enc_sel == 2'b11) 
```

### using case
```systemverilog
always_comb begin
  unique case (enc_sel) 
  2'b00   : out = in[0];
  2'b01   : out = in[1];
  2'b10   : out = in[2];
  2'b11   : out = in[3];
  default : out = in[0];
  endcase 
end
```
### AND_OR mux
```systemverilog
logic [MSB:0] in [3:0];
logic [MSB:0] dec_sel;
logic [MSB:0] out ;


 out  = ({MSB{dec_sel[0]}} & in[0] ) |
        ({MSB{dec_sel[1]}} & in[1] ) |
        ({MSB{dec_sel[2]}} & in[2] ) |
        ({MSB{dec_sel[3]}} & in[3] ) ;

```


## Counter
using macro:
``` systemverilog
assign next_count = count +1;
`DFF(count, next_count,clk)
```
alternatively can write smaller - but I do not recommend it. 
We like using the ```next_<name>``` with FF
``` systemverilog
`DFF(count, (count + 1) , clk)
```

The macro translates into:
``` systemverilog
assign next_count = count +1;
always_ff  @(posedge clk) begin
      count <= next_count; 
end
```

## State-Machine
Guidelines:
- Use an Enumerate value for the state
- Have a simple Flip-Flop to sample the state.   
Example:
```systemverilog
`RST_VAL_DFF(state, next_sate, clk, rst, IDLE)
```
- in an 'always_comb' block, calculate the next_state as a function of the current state + other condition.  
  - Use a ```unique casez```
  - May use ```priority casez``` if appropriate)
  - Make sure to have a default value
  - 
```systemverilog
//==========================
// The state Machine:
//==========================
always_comb begin
next_state = state;
unique casez (state)
    IDLE: begin
        if( condition == CONDITION_MET) begin
            next_state = FIRST_STATE;
        end // if
    end // IDLE
...
    default: begin
            next_state = state;
    end
endcase // casez
end // always_comb
```
See the example of traffic_light state_machine
https://github.com/amichai-bd/fpga_mafia/discussions/27


## Find_First

## Shift register
This is a compact and nice way to code a Shift register:
```systemverilog
logic [MSB_DATA:0] shift_register [MSB_SHFT:0]

assign shift_register[0] = data_in[MSB_DATA:0];
`DFF(shift_register[MSB_SHFT:1] , shift_register[MSB_SHFT-1:0] , clk)
```

## Register-File
example of a duel read single write register file:  
```systemverilog
logic [31:0] Register [31:0]; 
//logic [31:0][31:0] Register ; //this is valid option to.
logic [4:0] RegDst;
logic [4:0] RegSrc1;
logic [4:0] RegSrc2;
//---- The Register File  ------
`EN_DFF(Register[RegDst] , RegWrData , Clk , CtrlRegWrEn)
// --- read Register File --------
assign RegRdData1 = Register[RegSrc1];
assign RegRdData2 = Register[RegSrc2];

```

## Pipe-Line

For a pipe where we accumulate & calculate different attributes we can use a "struct" with relevant fields, and keep adding/overriding then down the pipe:
 lu_valid, lu_set,lu_tag,hit, miss, mb_hit_cancel, set_ways_mru[3:0], set_ways_valid[3:0], set_ways_victim[3:0],set_ways_hit[3:0], set_ways_enc_hit[2:0], fill_cl_data[127:0], fill_valid, lu_opcode[1:0] // RD_LU, WR_LU,FILL_LU

- Each cycle has the sampled version and the updated version (cache_pipe_lu_q2 ,pre_cache_pipe_lu_q2)
- Make sure that the assignments all match the correct suffix (q1,q2,q3...)
- The suffix (pipe stage) should change only when it goes through a Fli-Flop 
``` `DFF(pre_cache_pipe_lu_q2, cache_pipe_lu_q1, clk) ```
```systemverilog
//====================
//    Pipe stage 1
//====================
always_comb begin
  cache_pipe_lu_q1 ='0; //this is the default value
  cache_pipe_lu_q1.valid     = ...q1 ;
  cache_pipe_lu_q1.opcode    = ...q1 ;
  cache_pipe_lu_q1.set       =  ...q1 ;
  cache_pipe_lu_q1.tag       =  ...q1 ;
  cache_pipe_lu_q1.fill_data =  ...q1 ;
end //always_comb


//====================
//    Pipe stage 2
//====================
`DFF(pre_cache_pipe_lu_q2, cache_pipe_lu_q1, clk)
always_comb begin
  cache_pipe_lu_q2                         =pre_cache_pipe_lu_q2; //this is the default value
  cache_pipe_lu_q2.set_ways_valid = ...q2;
  cache_pipe_lu_q2.set_ways_tags = ...q2;
  cache_pipe_lu_q2.set_ways_mru  = ...q2;
  cache_pipe_lu_q2.set_ways_hit    = ...q2;
  cache_pipe_lu_q2.hit                    = ...q2;
  cache_pipe_lu_q2.miss                = ...q2;
  cache_pipe_lu_q2.data_array_address   = {pre_cache_pipe_lu_q2.set , pre_cache_pipe_lu_q2.set_ways_enc_hit};

end //always_comb

//====================
//    Pipe stage 3
//====================
`DFF(pre_cache_pipe_lu_q3, cache_pipe_lu_q2, clk)
always_comb begin
  cache_pipe_lu_q3                        =pre_cache_pipe_lu_q3; //this is the default value
  .. 
end
```

