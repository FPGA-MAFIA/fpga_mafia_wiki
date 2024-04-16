### sanity_check.py
- When pushing the local repo to the main branch, the build script will run a sanity check on github server. This will check all the tests defined in fpga_mafia folder in `./github/workflows/mafia_sanity.yml` file. For more details about the content of that file [Click here](/docs/TFM/projectTool/GitHubActions.md).

- You have the option to conduct the test on your local machine rather than immediately pushing it to the main branch and having the test executed on the GitHub server.
It's not mandatory, but we highly recommend doing so, especially when implementing significant code alterations, such as modifications to packages utilized by other cores or instances.   
Running this test helps prevent errors when you merge your branch with the main codebase.

- To run a sanity test on your local machine, please opne Git Bash at `fpga_mafia` folder and execute the command
```
./scripts/sanity_check.py -yml mafia_sanity
```
The `-yml` flag is used to specify the name of the test file. In this case, it is `mafia_sanity.yml`. If you want to run a different test, you can change the name of the file accordingly or create your own test file. 

### gen_parameter_list.py
- This script is used to generate a list of parameters for a specific core inside `verif/<core_name>` directory. The list of the parameters will be located in `/target` directory.
For example:
```
./scripts/gen_parameter_list.py big_core
``` 
Will generate file name `big_core_parameter_list.csv` in `/target`

### ovrd_params.py
- This script overrides the default parameters of a specific core. The override parameters will be located in `/verif/<core_name>` directory.
- The list of the parameters we wish to override and their new values will be located in `/scriprs/ovrd_params` directory.
For example, assume we would like to override the default parameters of `big_core` core. We will need to create a file named `new_params_list.csv` in `/scripts/ovrd_params` directory. The file will contain the list of the parameters we wish to override and their new values and then run the command
```
./scripts/ovrd_params.py -dut big_core -ovrd_file new_params_list
```
- Suppose we want to override `RF_NUM_MSB` parameter, then the format of `new_params_list.csv` file will be:
```
RF_NUM_MSB, 15
```

**important** The script changes the old parameters to the new parameters so, don't forget to commit the changes to the git.


