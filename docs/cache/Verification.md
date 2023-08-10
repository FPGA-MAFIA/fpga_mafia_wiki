
# <a name="_toc2123724073"></a>**8. Verification** 
In this section we will write a list of scenarios and points we want to cover

- Rd after Rd to same cache-line: the first read request should miss but the second one should hit.
- Read after Write to same CL: expecting same behavior as above.
- Multiple writes then multiple reads, all to same CL: we are expecting a miss for the first write request which will send a fill, for the others they can miss but should not send a new fill request, all the read requests should hit.
- Write b2b to the same CL: we expect miss for the two write request but a fill only for the first one. Read requests after a small delay to check the write data is read. 