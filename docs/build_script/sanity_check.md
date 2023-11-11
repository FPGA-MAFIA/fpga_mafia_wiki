- When pushing the local repo to the main branch, the build script will run a sanity check on github server. This will check all the tests defined in fpga_mafia folder in `./github/workflows/mafia_sanity.yml` file. For more details about the content of that file [Click here](/docs/TFM/projectTool/GitHubActions.md).

- You have the option to conduct the test on your local machine rather than immediately pushing it to the main branch and having the test executed on the GitHub server.
It's not mandatory, but we highly recommend doing so, especially when implementing significant code alterations, such as modifications to packages utilized by other cores or instances.   
Running this test helps prevent errors when you merge your branch with the main codebase.

- To run a sanity test on your local machine, please opne Git Bash at `fpga_mafia` folder and execute the command
```
./sanity_check.py -yml mafia_sanity
```
The `-yml` flag is used to specify the name of the test file. In this case, it is `mafia_sanity.yml`. If you want to run a different test, you can change the name of the file accordingly or create your own test file. 


