
# <a name="_toc1967356741"></a><a name="_toc1779312326"></a>**6. High level Transaction Flows**
In this chapter will describe the high-level transaction Flow.
## <a name="_toc52774757"></a><a name="_toc968886961"></a>**6.1 Evicting Cache-Line**
- **Silent Evict:** When de-allocating a non-modified CL without notifying the FM.
- **Clean Evict:** When de-allocating a non-modified CL and Writing it Back to FM.
- ***Note:** In this Cache Architecture, we do not support “Clean evict<a name="_int_qcv0rjgk"></a>”.*
- **Dirty Evict:** When de-allocating a modified CL from the Cache, and writing it back to FM.
## <a name="_toc222509515"></a><a name="_toc129901246"></a>**6.2 Core Write Hit**
core2cache\_req writes that were accepted to the TQ, and hit the tag array will result in cache write by hitting an existing CL 
## <a name="_toc1298113976"></a>**6.3 CORE WRITE MISS**
core2cache\_req writes that were accepted to the TQ, may miss the tag array, and will result in cache write by allocating a new way in the Cache.
If the allocated way (the “victim”) was modified, send a Dirty Evict Write Back (WB) to FM.
If the allocated way (the “victim”) was clean (non-modified), simply do a Silent Evict.

## <a name="_toc409398135"></a><a name="_toc762484656"></a>**6.4 Core Read Hit**
core2cache\_req read CL that **hit** the cache, will respond with data on the “cache2core\_rsp” interface in deterministic 2 Cycle Latency. There is no need to “allocate” a new way in the cache, and no “victim” to send as WB to FM.
## <a name="_toc1161000507"></a><a name="_toc1368926867"></a><a name="_ref101430185"></a>**6.5 Core Read Miss** 
core2cache\_req read CL that **misses** the cache will eventually respond with data on the “cache2core\_rsp” interface. 

1. A stall will happen, stopping new requests from the core temporarily.
2. The miss will trigger a “cache2fm\_rd\_req\_q3,” which will send the read request to the Far-Memory (FM) & eventually respond with the fm2cache\_rd\_rsp – also known as “Fill”.
   The response from FM has two destinations:
- Cache: 	The fm2cache\_rd\_rsp will “fill” the allocated Cache Way
- Core: 	The fm2cache\_rd\_rsp will be sent as a “cache2core\_rsp” to serve the origin 		core2cache\_req.
## <a name="_toc1847471893"></a><a name="_toc86425335"></a>**6.6 Stall**
Stall is a situation where we do not allow new requests from the core temporarily, causing a delay in the execution of the program. Our cache will enter stall mode in two scenarios
The first will be when our TQ is full, it will set the “stall” signal to the core, stopping new requests from being sent.
The second is in the case of a Read Miss. This will result in a stall, as the processing of the request is temporarily stopped while the data is retrieved from main memory.
## **6.7 Re-Issue buffer**
We saw that in the case of “Read Miss<a name="_int_ajpkpurn"></a>”, the Stall will be set, and this will temporarily stop the processing of request. 

This means, we support a single “outstanding” core read miss request

In case of Back2Back request, In the q2 cycle we set the Stall due to the Read miss, but Q1 already was sent from core->cache.
This Q1 request must be rejected by TQ & Pipe.
Yet, we do not want to lose That rejected request.
We Will save them and take care of them after the stall is unset. (Note: during the stall we are not expecting any new request from Core.)
For that purpose, we will use the “re-issue buffer<a name="_int_rk6wy9uj"></a>”. It will store the last request that arrived during the stall.
Once the Read fill response arrives and sent to Core, we will check if the Re-issue buffer is empty. If it is, we have nothing more to do. If it is not empty, it will mean we have a request that is waiting to be handled and we will re-issue it to our TQ & pipe from this specific buffer.

## <a name="_toc2088317011"></a><a name="_toc1574458668"></a>**6.8 FSM Errors**
Entering the “error state” in the transaction queue (TQ) State Machine is an “**uncorrectable** **error”** that can cause data corruption & coherent inconsistency.
This state is for debugging and security to ensure the Cache is not abused.
Entering the “error state” is un-recoverable and will cause a “Blue-Screen of Death<a name="_int_bbuhwfs8"></a>”.
## <a name="_toc1429789757"></a>**6.9 MRU**
In this project we will use the Pseudo Most Recently Used (P-MRU) replacement policy to determine which entry to remove when our cache is full and a new entry needs to be added. In this policy, the newest entry is placed at the head of the cache and whenever it is full, the item at the end of the cache is the one that will be replaced. It will provide an efficient way of managing our cache memory ensuring that the most frequently used data is readily available in the cache.
To be more specific we are using Bit-PLRU, it will store one status bits per way. Every access to a way in our set will set its MRU-bits to 1 indicating the way was recently used. Whenever the last 0 bit of a set’s status bits is set to 1, all other bits are reset to 0. 
## <a name="_toc73125539"></a>**6.10 FILL**
In case of miss, the cache will send a fill request to the Far Memory to bring the corresponding Cache-Line to the cache.
“<a name="_int_7l1xpihz"></a>fill\_modified” bit will inform us that the actual fill is happening because of a write miss and that the specific CL will be updated with the new word
“fill\_rd” bit will inform us that the fill is happening because of a read miss and that we need to return the value to the core after we bring it in the cache. It will also be set in case of read after write to the same CL. As we have already explained in this case the read miss will not send a new fill request so this bit will inform the <a name="_int_yzf1nbyu"></a>tq to also send the read response after the fill (of the write request) arrive.