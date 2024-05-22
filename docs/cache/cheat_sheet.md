## A
- **Allocation** : The transaction(request) that enters the transaction queue (TQ) 

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
- **Hit** : Requested data is in the cache.

## I

## J

## K

## L

## M
- **MB** : Merge buffer. Buffer that located inside the Transaction queue entry(TQ) used to merge CL of 128 width with shorter data like word, half word and bytes. 
- **Modified** : Modified data is data that been changed inside the cache and has not been stored back into far memory(FM) causing the far memory(FM) to be not updated. 
- **Miss(Read)** : Requested data is not in the cache
- **Miss(Write)** : Core refers to an address that its data not in the cache meaning that we have to fill it first.

## N

## O
- **Offset** : The position of the data within a cache line, indicating the exact byte or word location.
## P

## Q

## R
- **Re-issue** : Action taken when an instruction or a data request cannot be immediately completed due to a cache miss or some other delay, and must be attempted again later. In that situation the request temporary removed from pipeline for other requests.
- **Read modify write** : Process of modifying data by first reading it, update (modify) and write back. For example: If we want to update word in a cache line than we first read the cache line and merge it using merge buffer with the write data.

## S
- **Set** : A group of cache lines where data from any given block of main memory can be placed, according to the cache's set-associativity.
## T
- **Tag** : A portion of the physical memory address used to indicate the memory chunk ID from the far memory(FM). 
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


