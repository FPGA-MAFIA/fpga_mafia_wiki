### run software compilation
```
./build.py -dut mini_core -test basics -app
```

### run hardware compilation
```
./build.py -dut mini_core -test basics -hw
```

### run elaboration and simulation
```
./build.py -dut mini_core -test basics -sim
```

### run elaboration and simulation using gui
```
./build.py -dut mini_core -test basics -sim -gui
```

### run all the above steps in one command
```
./build.py -dut mini_core -test basics -app -hw -sim -gui
```