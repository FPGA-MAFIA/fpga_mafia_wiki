
# Github actions
## Overview of Actions and Workflows
GitHub Actions is a flexible, powerful platform for automating software development workflows.  
With GitHub Actions, we can define custom workflows that run automated tasks whenever specific events occur in your repository.  
Workflows are defined in a YAML file and can be triggered by a variety of events, such as pushes to a branch, pull requests, or issue comments.

We have set up a custom workflow in our project using GitHub Actions to automate the build and test process.  
Whenever a new Pull request is issued or a Push to the main repository branch. 
The workflow runs a series of steps, which currently simply runs the build per DUT:  
- Compile the C Sofware (GCC, link, generate inst/data sv files)   
- Compile the Verilog code  
- Run the tests, and report the results   
We have configured the workflow to run on a local host to ensure that the environment is consistent and can be easily reproduced.

** The benefits of using GitHub Actions for our project include: **
 
- Automated testing: By automating the build and test process, we can catch issues earlier and reduce the risk of introducing bugs.
- Consistent environment: Running the workflow on a local host ensures that the environment is consistent and can be easily reproduced, making it easier for other contributors to get up and running quickly.
- Customization: GitHub Actions allows us to define customized workflows that meet our specific needs and integrate with other tools and services we use in our project.  
  
In the following sections, we'll provide more details on how we set up and configured the workflow for our project.  

## Setting up Actions and Workflows
To set up the workflow for our Verilog project, we followed these steps:
1. Create a .github/workflows directory in the root of the repository.
1. Create a YAML file in the .github/workflows directory. We named ours build-test.yml, but you can use any name you like, as long as it ends in .yml.
1. Define the events that should trigger the workflow. For our project, we chose to trigger the workflow on push events to the main branch:
1. Define the steps of the workflow. In our case, we have three steps: checkout, build, and test. Here's the complete YAML file:
```yaml
# this is a github action that runs the python build

name: mafia_sanity

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: [self-hosted , windows, x64]
    steps:
      - uses: actions/checkout@v2
      - name: Run build BIG_CORE -all -app -hw -sim
        run: python build.py -proj_name 'big_core' -debug -all -app -hw -sim
      - name: Run build MINI_CORE -all -app -hw -sim
        run: python build.py -proj_name 'mini_core' -debug -all -app -hw -sim
      - name: Run build SC_CORE -all -app -hw -sim 
        run: python build.py -proj_name 'sc_core' -debug -all -app -hw -sim
      - name: Run build CACHE -all -app -hw -sim 
        run: python build.py -proj_name 'cache' -debug -all -hw -sim
```
1. Let's break down the important parts of this YAML file:
- The ```name``` field provides a descriptive name for the workflow. This is displayed in the Actions tab of the repository.
- The ```on``` field defines the events that should trigger the workflow. In our case, we're triggering the workflow on push events to the main branch.
- The ```jobs``` field defines the jobs that make up the workflow. We have one job, called build-test, that runs on an ubuntu-latest virtual environment.
- The ```steps``` field defines the steps that make up the build-test job. We have three steps: checkout, build, and test.
- The ```uses``` field in the checkout step specifies that we're using the actions/checkout action to check out the code from the repository.
- The ```run``` field in the build and test steps specifies the commands that should be run to build and test the code.

## Running the Project Build and Tests
To run the build and tests for your project, trigger the event specified in your workflow YAML file.  
This is done by a Pull-Request or manually on your branch in the action tab.
GitHub Actions will create a virtual environment and run the steps you defined.

Our workflow checks out the code, builds it, and runs the tests.   
If any step fails, the job will fail.  
You can see the build and test results in your repository's "Actions" tab.  

GitHub Actions makes it easy to reproduce the build and tests on different environments, catch issues early, and get feedback on the results directly in the GitHub UI.  
***

# 
setting your personal PC as a server to run sanity action - gate keeper for Submit

1. cd ~/../..
1. mkdir actions-runner
1. cd actions-runner
1. curl -o actions-runner-win-x64-2.301.1.zip -L https://github.com/actions/runner/releases/download/v2.301.1/actions-runner-win-x64-2.301.1.zip
1. if [ "$(shasum -a 256 actions-runner-win-x64-2.301.1.zip | awk '{print $1}')" != "e83b27af969cb074ca53629b340f38d20e528071f4d6f9d4ba7819dace689ece" ]; then throw 'Computed checksum did not match'; fi
1. ./config.cmd --url https://github.com/amichai-bd/fpga_mafia --token ATKK63ZZDRXTGTP3DHJQ233D5NQJI
    1. Would you like to run the runner as service? (Y/N) [press Enter for N] N  /Press "N"
1. ./run.cmd



still WIP to get this to run on pull request & push