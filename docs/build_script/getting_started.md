### Setting Git user name and email (only if it is your first time using Git)
```
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

### 1. Cloning the repository
```
mkdir mafia_project   # Choose any reasonable PATH and name
cd mafia_project
git clone https://github.com/amichai-bd/fpga_mafia.git
```

### 2. Creating a new branch
```
git checkout -b <branch_name>
```
- use `git status` command to verify you are on the new branch you have just created.

### 3. Open the project in VSCode and lets observe the folder structure
![mafia_folders1.png](/snapshots/mafia_folders1.png)


**app folder** - contains the `crt0.S` file and the linker file `link.common.ld`   

**source folder** - contains the RTL files of the core + other files that are needed for the build process to work like `*.f` files.
Please open `mini_core folder` and try to understand the folder structure.

![mafia_folders2.png](/snapshots/mafia_folders2.png)

**target folder** - contains the files after building the project. Note that this folder may be empty at this point because we didn't build anything yet.

**verif folder** - contains the test-bench files simulation scripts and test files like initial C program and more.
- Open the `verif` folder and try to understand intuitively the content of `tb` and `test` sub folders.

![mafia_folder3.png](/snapshots/mafia_folders3.png)

The folders we have just mentioned are the main folders in the *mafia_build" section but we encourage you to dedicate at most 5 minutes to explore the other folders and the files in each folder even if it is not that necessary for understanding this section.