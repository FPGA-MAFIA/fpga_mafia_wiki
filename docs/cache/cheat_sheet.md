## A
- **Allocation** : The transaction(request) that enters the transaction queue (TQ). In our cache design allocate can also mean allocating a set (way allocation). Sometimes this allocation includes choosing a valid victim or allocating free way  

## B

## C
- **Cache line (CL)** :  A block of contiguous memory addresses that are fetched from main memory and stored together in the cache. In our cache line its 128bits. 
## D

## E
- **Evict** : The process of erasing data from the cache to fill with new one.
- **Evict(dirty evict)** : The remove data is not in the far memory(FM) yet and it must be updated there before it will be removed.
- **Evict(silent/clean evict)** : The removed data has not been changed or already been updated in the far memory(FM). So it can be removed without any need to update thefar memory(FM).

## F
- **Fill** : Process of bringing data from far memory(FM) into the Cache.
- **FM** : Far memory. Refers to main memory storage. Mostly slow and big.
- **Free** : A cache line (CL) that is either currently unoccupied or contains data that can be safely overwritten, usually because it has been evicted or invalidated.    
## G

## H
- **Hit** : Requested data is in the cache. In our design a Hit can have many meanings:  it can be a CL hit which takes place on the pipe. It can be a "hit on existing tq entry" where a new request overlaps with tq that being processed.

## I

## J

## K

## L

## M
- **MB** : Merge buffer. Buffer that located inside the Transaction queue entry(TQ) used to merge CL of 128 width with shorter data like word, half word and bytes. The merge buffer merges the data from the fill (from the FM) and from the different writes (store) from the core. 
- **Modified** : Modified data is data that been changed inside the cache and it's an indication that means this data eventually must be dirty evicted. 
- **Miss(Read)** : Requested data is not in the cache
- **Miss(Write)** : Core refers to an address that its data not in the cache meaning that we have to fill it first.

## N

## O
- **Offset** : The position of the data within a cache line, indicating the exact byte or word location.
## P

## Q

## R
- **Re-issue** : Action taken when an instruction or a data request cannot be immediately completed due to a cache miss or some other delay, and must be attempted again later. In that situation We are "stalling" the request on the re-issue buffer until we finish handling the other requests that caused the backpressue. (Tq full, read miss).
- **Read modify write** : Process of modifying data by first reading it, update (modify) and write back. The read modified write takes place within the pipe for updating attributes in the tag array, and updating data in the cache array.

## S
- **Set** : A group of cache lines where data from any given block of main memory can be placed, according to the cache's set-associativity. It's actually specific bit's within the address which are used to group the entire memory space into groups that can potentially be allocated next to each other (in the same "set").
## T
- **Tag** : A portion of the physical memory address used to indicate the memory chunk ID from the far memory(FM). To be more precise: the tag is the portion of the PA (physical address), but each cl has a unique set+tag. So the 'cl' Id is actually both. Different cl can have the same rag. Different cl can have the same set. If both set and tag are the same for 2 cl - it's actually the same cl.

- **Transaction queue (TQ)** : Mechanism used to manage and sequence the interactions (transactions) between the cache, the main memory and the core.  
 A buffer or list that holds pending memory operations (such as reads, writes) that need to be executed by the cache system. This queue helps organize the order in which memory transactions should be processed, optimizing the cache's performance and ensuring consistency and efficiency in data handling.

## U

## V
- **Valid** :  Data inside the cache (CL) that not a garbage. For example: When access a CL in the first time for read before its been written the data there is not valid yet.
- **Victim** : When the cache set is full and we need to store new data,  we have to erase "old" data from it. The erased data is called victim. 
## W

## X

## Y

## Z


