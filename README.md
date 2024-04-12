# Los Camarones
## Project Domus: Real Estate

## Welcome to Los Camarones' GitHub! This project is aimed to deliver a high functioning real estate website

###  - Julian Flores
###  - Julian Pulido
###  - Wendy Le 
###  - xuanxuan Miao 
###  - Kumar Priyanshu Raj
###  - Eric Delgado
###  - Mohamed Ahmed
###  - Elizabeth Hernandez

hey

############################################## DOCKER INSTRUCTIONS ####################################################

Before running Docker commands, ensure that Docker Desktop is installed on your system and that WSL 
(Windows Subsystem for Linux) is set up properly, as Docker on Windows relies on WSL to run Linux containers.

-> TO START DOCKER SERVICES:

1. Open PowerShell as an Administrator.
   
2. Temporarily adjust your execution policy to allow scripts to run with this command: <Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process>
    - This command is necessary because, by default, PowerShell restricts running scripts to prevent unintended execution of potentially harmful scripts. 
    - The `RemoteSigned` policy allows you to run scripts that you have created on your local computer and scripts signed by a trusted publisher.

3. Navigate to the directory containing your scripts using the `cd` command: <cd \Scripts>

4. Run the `compose_all.ps1` script to start your services: <.\compose_all.ps1>
   - This script will build and start all the Docker containers defined in your Docker Compose files.

-> TO STOP SERVICES:

1. Ensure you're still in the PowerShell window with the adjusted execution policy. 

2. Navigate to the directory (if your not already in it) containing your scripts if you're not already there: <cd \Scripts>

3. Run the `shutdown_all.ps1` script to stop your services and clean up: <.\shutdown_all.ps1>
   - This script will stop all running Docker containers and remove any networks or orphan containers created by Docker Compose.
