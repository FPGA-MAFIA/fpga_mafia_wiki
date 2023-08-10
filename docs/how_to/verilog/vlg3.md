# Coding Style
## Signal declaration
- implicit declaration & declaration type
In SystemVerilog declaring types are optional, but it is recommended to use them for better readability.
If you do not explicitly declare a signal type, the default type is a single bit `logic`.


- Module IO



## Naming convention
- `Module:`     
lower case, and use underscores to separate words.
```systemverilog 
  module my_module ( 
    input logic Clock,
    input logic Reset,
    ...
    );
```
- `signal:`    
Option 1: lower case, and use underscores to separate words
```systemverilog 
    logic [1:0] my_signal,
```
Option 2: CamelCase, may use underscore for specific cases
```systemverilog 
    logic [1:0] MySignal,
    logic [1:0] A2F_MySignal,
```
- `instance:`    
lower case, and use underscores to separate words
```systemverilog 
    my_module my_module_inst (
      .Clock(Clock),
      .Reset(Reset),
      ...
    );
```
- `parameters:`  
HIGH CASE, and use underscores to separate words
```systemverilog 
    parameter MY_PARAM = 10;
```
- `typedef:`    
lower case, prefix "t_", and use underscores to separate words
```systemverilog 
    typedef logic [1:0] t_my_typedef;
```
- `Pipe staging:`  
Option 1: lower case, suffix underscore "_<pipe_letter><pipe_number>" example: singal_q1, signal_q2,
```systemverilog 
    `DFF(signal_q2, signal_q1, clk)
```
Option 2: CamelCase, Suffixed PipeLetter and PipeNumber, example: SignalQ1, SignalQ2
```systemverilog 
    `DFF(SignalQ2, SignalQ1 , Clk)
```
