

# High Level Block Description
## Transaction Queue (TQ) 
The transaction Queue has <NUM\_TQ\_ENTRY> entries. 
Each entry has Buffer & FSM (Finite State Machine).
Buffer - Holds the Data, Address, req\_id of each request.
FSM 	- will manage the requests life cycle.
Common Finite State Machine Flow:

- **Write Hit:**          S\_IDLE -> S\_LU\_CORE->S\_ IDLE
- **Write Miss:**       S\_IDLE -> S\_LU\_CORE->S\_MB\_WAIT\_FILL -> S\_MB\_FILL\_READY -> S\_ IDLE
- **Read Hit:****    	      S\_IDLE -> S\_LU\_CORE->S\_ IDLE
- **Read Miss:** 	       S\_IDLE -> S\_LU\_CORE->S\_MB\_WAIT\_FILL -> S\_MB\_FILL\_READY -> S\_ IDLE
## Pipe
The “Pipe” is a 3-stage pipeline that manages the tag array lookup (LU) & Cache access.

- Stage 1: Tag Array Look up (Read)
- Stage 2: Tag Compare, Tag-Array Update, Cache Read
- Stage 3: Cache Write, FM Write Back [(Dirty evict)](#_evicting_cache-line) & FM Read - Fill [(Cache miss)](#_core_read_miss. ), LU results to TQ.
## Tag Array
The Tag Array is a memory structure that holds the Tags & Indication – Valid, Modified, MRU, Fill.
The “Set” (Index) is the Tag Array read pointer. 
A Lookup will return the entire “Set”.
Each “set” is 4-ways, meaning each Lookup will compare 4 TAG & their Indications with the Tag we are looking up.
The Tag Indication will update according to the Lookup request.

- MRU – A tag hit will update the Way MRU indication.
  ` `Micro architecture decision for the exact MRU arbitration scheme.
- Modified – A Write request will update the Modified indication
- Fill – A Read miss will set the “Fill” Indication. A Fill Hit with LU\_FILL opcode will reset the “Fill” Indication.
## Data Cache Array
The Data Cache is a memory structure that holds the Cache-Line (CL) Data.
Each access reads a “single” CL - Meaning reading a single “way”. 
The exact location in the Cache is determined by the ‘Way hit’ in the Tag Array Lookup.
Data Array pointer = {Set[7:0],Way[1:0]}
