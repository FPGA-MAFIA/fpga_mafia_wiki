
# <a name="_toc1444127171"></a>**7. Merge Buffer Behavior** 
In this chapter we will explain the Merge Buffer behavior through different cases

The <a name="_int_nz7q838o"></a>merge\_buffer is a buffer in our TQ that will store partial data during the time we are waiting for the Cache Line Data to be filled by the Far Memory. 
Every entry in the TQ is linked to a Merge Buffer entry then we need to take care that every request to the same Cache-Line will never allocate a new entry if there already is an entry in the TQ for that specific Cache-Line.
## <a name="_toc761038880"></a>**7.1 Read After Write (same Cache Line, word hit)**
In this case, if the Write request got a Miss, it will update the Far Memory (fill request) that we need a data and update the TQ that he got a Miss. 
The partial write data (no a full CL) will be stored in the Merge Buffer until we get the fill response from FM. 
During this time, if the TQ get a Read Request to the same Cache Line + same word offset:

1. We know that the lookup will get a Miss from the pipe. 
1. TQ merge buffer will response with TQ Hit to this specific word (Word Hit).
1. It will indicate to the pipe that there is no need for a fill from Far Memory. (Cancel the fill)
1. It will read it straight from the Merge Buffer and return it to Core. Make sure the Merge buffer response will be the correct cycle (Q3) of the pipe lookup that we already know will miss.

This will happen only if the TQ is not in S\_FILL\_LU state. If it is, the data will be read from the Tag Array and not directly from the Merge Buffer.
## <a name="_toc1647958394"></a>**7.2 Read After Write (same Cache Line, word Miss)**
Just like in the last case the Write request got a Miss and is waiting for the data from Far Memory and stored the partial write to the Merge Buffer.
During this time, we are getting a Read Request to the same CacheLine but this time to another word. In this case, contrary to the last one, we cannot read the data from the Merge Buffer because we got Word Miss. 
1\. TQ will send a Stall signal to the core so it will wait for the data to be filled. 
2\. Once the TQ gets the Far Memory response for the Write request and will fill our Cache Line in the Merge Buffer, this line will be written to the Data Cache Array with an indication “rd\_fill\_rsp”.
3\. The pipe will write the fill + return the data to the TQ as if there was a read hit so it will be sent as a Read response to the Core in Q3.

## <a name="_toc1077647588"></a>**7.3 Write After Write (Same Cache Line, same/different word)**
For this case, we have already tried to Write to the same Cache Line but now we want to make another Write to a different word in that Cache Line. The first write will miss and send the fill request to FM + allocate a merge\_buffer entry.
The second Write request will enter the pipe, get a Write Miss indication but this time it will not make a Far Memory request because we have an indication from the TQ that we have a “Merge Buffer Hit” which mean we have already a Line in the Merge Buffer for this CacheLine. The partial Write data will be written to that line in the Merge buffer.
Once the Far Memory response to the Merge Buffer, the Cache Line will be filled (without overriding the `new` word writes)
The TQ entry will become a fill candidate, and eventually will win the arbitration to fill the cache though the Pipe.
## <a name="_toc854682441"></a>**7.4 Write After Read (Same Cache Line, Same/different Word)**
Currently In our architecture, there is no issue with Write after Read due to the fact the incase of a read miss, we stall any new requests from the core until the first miss is resolved. 

## <a name="_toc2125413379"></a>**7.5 Read After Read (Same Cache Line, Same/different Word)**
Currently In our architecture, there is no issue with Raed after Read due to the fact the incase of a read miss, we stall any new requests from the core. until the first miss is resolved.
