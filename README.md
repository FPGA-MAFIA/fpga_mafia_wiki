[![Deploy_Docusaurus_Pages](https://github.com/amichai-bd/fpga_mafia_wiki/actions/workflows/deploy.yml/badge.svg)](https://github.com/amichai-bd/fpga_mafia_wiki/actions/workflows/deploy.yml)  
# fpga_mafia_wiki
The documentation for the fpga_maifa project  
The website: https://amichai-bd.github.io/fpga_mafia_wiki/  


## Deploying the Wiki  
### Deployment
We have created a github action to deploy with every merge to main.  
See: fpga_mafia_wiki\.github\workflows\deploy.yml  

- Manually deploy from PC - using HTTPS:   
Alternatively, you can use HTTPS. When deploying this way, you may be prompted for your Git credentials in a browser pop-up:    
``` GIT_USER=amichai-bd yarn deploy ```    

### Prerequisites  
-  Starting Fresh  
If you're working with a freshly cloned repo or after having cleaned the repo with "git clean -xdf", you will first need to install the necessary dependencies:   

``` yarn install ```
### Testing local the WIKI (recommended before deployment):  
``` yarn run build ```   
``` yarn run start ```  
