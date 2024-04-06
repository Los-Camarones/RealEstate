#!/bin/bash
# Bash script to stop and remove Docker containers managed by docker-compose files

# Navigate to Docker configurations directory from the Scripts directory
cd '../Docker Configurations'

# Stop Docker Compose services for Jenkins
echo "Stopping Jenkins..."
docker-compose -f jenkins_docker-compose.yml down

# Stop Docker Compose services for Next.js
echo "Stopping Next.js..."
docker-compose -f nextjs_docker-compose.yml down

# Navigate back to the original Scripts directory
cd ../Scripts

echo "All services have been stopped and removed successfully."
