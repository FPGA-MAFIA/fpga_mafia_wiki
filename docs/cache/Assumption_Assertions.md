
# <a name="_toc2054752113"></a>**9. Assumption & Assertions**
## <a name="_toc1951742785"></a><a name="_toc1030114760"></a>**9.1 Core Interface Assumption:**
- Core will not send Read/Write requests when Cache asserts the Stall signals
- All Reads & Writes are Word aligned
- Writes can be sb sh or sw
- Reads can be lb, lh or lw
- Core cannot Reject or Stall Read Responses
## <a name="_toc2063968789"></a><a name="_toc826535799"></a>**9.2 Far Memory Interface Assumption:**
- The FM Read response latency is not deterministic 
- FM Cannot reject/Stall
  1) “Dirty Evict” (Write modified Data to FM)
  2) Read miss. (Read Request from Cache to FM)
  This means there is no need for an "ack.accept" interface between cache <-> FM