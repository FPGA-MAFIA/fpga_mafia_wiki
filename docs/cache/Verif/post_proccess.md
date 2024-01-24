# Post Process and trackers

## Cache_pp

The Cache Post-Process script is designed to compare the top level tracker generated during the execution of a cache test against a reference model. It play a pivotal role in debugging and verification. The primary goal is to identify any differences between the two sets of trackers. The script will return the differences between the two files and help us fix different bugs in the code.
We can easily run the cache PP script by using the `-pp`` flag while running our build.py script
