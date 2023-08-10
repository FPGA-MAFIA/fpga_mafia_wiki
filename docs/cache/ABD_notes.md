
# <a name="_toc1529489236"></a>**11. ABD Notes:**
I gave some thought in to how to resolve the back2back request and this is what I produced:

- Each tq entry can serve multiple writes that are to the same CL by writing the writes in order into the merge buffer.
- In case the CL hits in the pipe, there is no issue – forwarding units & read modify write will make sure the tag array & the data array will have the correct cohirent data.
- In case the second write was Back2Back, we don’t want to deallocate the TQ entry after the first write, so we can add a counter that count how many writes are merged into the same CL, and the counter decrements with every lu hit response from pipe, as long as the State is in S\_LU\_CORE & the counter is not back to 0, the entry will not go back to IDLE.

Once the Entry is set as a Read Request entry, (due to a read lookup hit the same address), We will not merge any new request to the same entry.

This is why this would work:

The new Read request enters the cache in Cycle Q1.

In Q2 the TQ allocation in visable + we have the tag array results from the lookup.

Incase Q2 is a tag miss, the new request in Q1 will be canceled and stored in the “re-issue-buffer" - and will not affect any existing entries.
Only once the read miss is resolved with the fill, the “re-issue-buffer" will re-send the new lookup and allocate the tq array / merge into an existing TQ entry.

Need to make sure we correctly handle the case of a read after write back2back with Cacheline miss. - make sure we send a single FM fill request.(TODO)

A read request that has the same CL as existing TQ entry that is also marked as read will NOT merge!!! And will allocate a new TQ entry. (a TQ entry can serve multiple writes, but a single READ!)


Need to think about this: Once an entry is set as “Read<a name="_int_ypnewna7"></a>”, writes cannot merge more writes into it?

- If the read missed, we will cancel the write, and re-issue it once the read miss is resolved.
- If the read hit, the pipe lookup will return the data, will dealloc the entry.
  In parallel a different entry will handle the write. (which we expect to hit – just like the read before it)
- Not expecting to have 2 entries with the same cl & both are wait fill.. we can have 2 entries with same CL if we know that there was cache hit.
- The order is promised due to the request intering the pipe in order. And if they all hit there is no issue. One there is a miss, no new request is being served in the pipe. So again- order is preserved.
