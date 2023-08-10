# fpga_mafia_wiki
The documentation for the fpga_maifa project


# Deploying the Wiki  
## Prerequisites  
-  Starting Fresh  
If you're working with a freshly cloned repo or after having cleaned the repo with "git clean -xdf", you will first need to install the necessary dependencies:   
``` yarn install ```

## Deployment
- Using SSH:
If you have SSH keys set up with your Git provider, you can deploy using SSH.  This method avoids the need to manually enter credentials each time:  
``` GIT_USER=amichai-bd USE_SSH=true yarn deploy ```   

- Using HTTPS:   
Alternatively, you can use HTTPS. When deploying this way, you may be prompted for your Git credentials in a browser pop-up:    
``` GIT_USER=amichai-bd yarn deploy ```   

