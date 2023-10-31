# advanced build options
If you examine the commands executed in the background during this stage, you will notice various parameters being defined, such as memory length, the crt0.s file, and more. You have the option to modify some of these parameters by using the `-cfg`` flag and providing a configuration.json file.
In case you don't provide a configuration.json file, the default configuration.json file will be used.

### Location of the configuration.json file
- Open `/app` folder. You will find the `crt0_<config_name>.json` files. Those files represents the crt0.s file that will be used in the compilation process depending on the configuration you choose.
- Open `app/cfg` folder. You will find the `config_<config_name>.json` files. Those files represents the configuration.json file that will be used in the compilation process depending on the configuration you choose.

![app_folder.png](/snapshots/app_folder.png)

### Configuration.json file fields
```
{
    "I_MEM_OFFSET": 0,
    "I_MEM_LENGTH": 8192,
    "D_MEM_OFFSET": 8192,
    "D_MEM_LENGTH": 16384,
    "crt0_file"   : "crt0_big_rv32i.S",
    "rv32_gcc"    : "rv32i",
    "name"        : "rv32i"
}
```

Those are the default values of the configuration.json file. You can take a look at other configuration.json files in the `app/cfg` folder to see how they differ from each other.

- I_MEM_OFFSET: The offset of the instruction memory in the memory map(usually 0)
- I_MEM_LENGTH: The length of the instruction memory in the memory map.
- D_MEM_OFFSET: The offset of the data memory in the memory map.
- D_MEM_LENGTH: The length of the data memory in the memory map.
- crt0_file: The crt0.s file that will be used in the compilation process.
- rv32_gcc: ISA set type.
- name: The name of the configuration. This only effects the name of the output files.

### The build command
- Please type the following command in the terminal to compile the hardware part of the project:
```
./build.py -cfg mini_rv32i -dut mini_core -test basic -app 
```
 In that case you will use the `mini_rv32i.json` file and the `crt0_mini_rv32i.S` file. All the other flags are the same mentioned in the previous sections.