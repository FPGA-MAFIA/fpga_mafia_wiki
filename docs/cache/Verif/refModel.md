# cache reference model

## table of contents




## What is a reference model?
To verify the Cache DUT, we need a reference model.   
The reference model is a behavioral model of the Cache DUT.  
It is used to generate the expected results of the DUT.  

The reference model is written in a simple as possible systemverilog memory that simple supports read and write operations.

The DUT and the reference model are connected to the same stimuli generator with the input "core2cache_req".

both the DUT and the reference model should respond to the same stimuli with the same output.
using a python Post-process script, we can compare the DUT and the reference model outputs and check if they are the same.


## Using a "memory" reference model instead of a "cache" reference model
instead of creating a cache specific reference model, we can use a simple memory reference model.
This is done to simplify the reference model and make it easier to debug.

The DUT itself is a cache, which is only the first layer of the memory hierarchy.
To be able to create a cache reference model is a very complicated task so we can use a simple memory reference model instead.

see the following diagram:
//TODO insert diagram
//
//
//
//

As you can see, the reference model is a simple memory that supports read and write operations in a "word" granularity (32 bit).

While the DUT is a cache which is the first layer of the memory space.
The full memory space is the FM (Far Memory) which in our Test-Bench is a simple memory that supports read and write operations in a CL (Cache Line) granularity.
by adding the Cache DUT, we are adding a layer of memory that communicates with the read/write requests from TB (Test-Bench) in a "word" granularity and communicates with the FM in a CL granularity.

This way, by comparing the DUT and the reference model outputs (read responses), we are actually only checking the memory coherence of the DUT - making sure that every read response is the same as the last write to the same address - regardless of the cache performance or features.

This approach simplifies the reference model and makes it easier to design and debug.
Please note: the FM is not part of the DUT, it is only part of the TB - but is also being verified by the reference model.


## Reference model implementation in systemverilog
```systemverilog
// insert the reference model code here

```


## the DUT + the FM systemverilog
As mentioned before, the DUT is a cache which is the first layer of the memory space.
But we are not testing the DUT alone, we are testing the DUT + the FM to simply the reference model and coherence verification.

```systemverilog 
// insert the DUT + FM code here

```





