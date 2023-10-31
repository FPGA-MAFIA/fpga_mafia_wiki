# Dedicated Test Intro

We conduct a series of  tests in our test bench to validate specific features and verify various cases that the cache might encounter during operation.

The diverse test suite covers scenarios such as back to back writes or reads requests to the same CL to check for data error or ensuring that fill requests are not sent unnecessarily.
We simulate scenarios with loaded data to emulate cache hits, verifying that the cache responds correctly to expected hits and that any misses are flagged.

Then we started to create random tests to evaluate the behavior of the cache or memory subsystem by randomly generating read and write requests. The goal is to explore extreme cases and identify potential bugs that may not be uncovered in deterministic test scenarios.
Our test will be composed of three key tasks

**create_addrs_pull**:
Generates a diverse set of tag and set combinations.

```systemverilog
task create_addrs_pull(input int local_num_tag_pull = V_MAX_NUM_TAG_PULL, // default values
                       input int local_num_set_pull = V_MAX_NUM_SET_PULL, // default values
                       output logic [7:0] tag_pull [V_MAX_NUM_TAG_PULL:0],
                       output logic [7:0] set_pull [V_MAX_NUM_SET_PULL:0]);
    int i;
    for (i = 0; i < local_num_tag_pull+1; i = i + 1) begin
        tag_pull[i] = $urandom_range(8'h00, 8'hFF);
    end
    for (i = 0; i < local_num_set_pull+1; i = i + 1) begin
        set_pull[i] = $urandom_range(8'h00, 8'hFF);
    end
endtask
```
**random_wr / random_rd:** Generates random write/read requests to stress-test the system.

```systemverilog
task random_wr(input int local_min_req_delay = V_MIN_REQ_DELAY, // default values
               input int local_max_req_delay = V_MAX_REQ_DELAY, // default values
               input int local_num_tag_pull  = V_NUM_TAG_PULL, // default values
               input int local_num_set_pull  = V_NUM_SET_PULL  // default values
              ); 
    logic [19:0] addr;
    logic [31:0] data;
    logic [4:0]  id;
    int i;
    create_addrs(.local_num_tag_pull(local_num_tag_pull), 
                 .local_num_set_pull(local_num_set_pull), 
                 .addr(addr)
                 );
    data = $urandom_range(0, 32'hFFFFFFFF);
    id = $urandom_range(0, 5'd31);
    wr_req(addr, data, id);
    i = $urandom_range(local_min_req_delay, local_max_req_delay);
    delay(i);
endtask

//=======================================================
//=======================================================
task random_rd(
                input int local_min_req_delay = V_MIN_REQ_DELAY, // default values
                input int local_max_req_delay = V_MAX_REQ_DELAY, // default values
                input int local_num_tag_pull  = V_NUM_TAG_PULL, // default values
                input int local_num_set_pull  = V_NUM_SET_PULL  // default values
              ); 
    logic [19:0] addr;
    logic [4:0]  id;
    int i;
    create_addrs(.local_num_tag_pull(local_num_tag_pull), 
                 .local_num_set_pull(local_num_set_pull), 
                 .addr(addr)
                 );
    id = $urandom_range(0, 5'd31);
    rd_req(addr, id);
    i = $urandom_range(local_min_req_delay, local_max_req_delay);
    delay(i);
endtask
```
**Exemple of usage**

In this test, a total of 50 random read and write requests are sent to the design.
Back-to-back requests and a mix of read and write operations are included to simulate real-world usage scenarios.
The script aims to stress-test the design by introducing random delays and varying request types to uncover any corner cases or unexpected behavior.

```systemverilog
LOCAL_NUM_TAG_PULL = 10;
LOCAL_NUM_SET_PULL = 1;
create_addrs_pull(.local_num_tag_pull(LOCAL_NUM_TAG_PULL),//input
                  .local_num_set_pull(LOCAL_NUM_SET_PULL),//input
                  .tag_pull(tag_pull),  //output
                  .set_pull(set_pull)   //output
                  );

// send 50 rd/wr request according to the RD_RATIO parameter
for(int i = 0; i<50; i++) begin
    if(V_RD_RATIO > $urandom_range(0, 100)) begin
        random_rd(.local_min_req_delay(15), //input
                  .local_max_req_delay(16), //input
                  .local_num_tag_pull(LOCAL_NUM_TAG_PULL),   //input
                  .local_num_set_pull(LOCAL_NUM_SET_PULL)    //input
                  );
    end else begin
        random_wr(.local_min_req_delay(15),  //input
                  .local_max_req_delay(16),  //input
                  .local_num_tag_pull(LOCAL_NUM_TAG_PULL),    //input
                  .local_num_set_pull(LOCAL_NUM_SET_PULL)     //input
                  );
    end
end

```