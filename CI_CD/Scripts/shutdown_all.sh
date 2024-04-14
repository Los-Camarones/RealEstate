#!/bin/bash
# Bash script to stop and remove Docker containers, including orphan containers, and clean up networks

# Navigate to Docker configurations directory from the Scripts directory
cd '../Docker Configurations'

# Stop Docker Compose services for Jenkins and remove orphan containers
echo "Stopping Jenkins..."
docker-compose -f jenkins_docker-compose.yml down --remove-orphans

# Stop Docker Compose services for Next.js and remove orphan containers
echo "Stopping Next.js..."
docker-compose -f nextjs_docker-compose.yml down --remove-orphans

# Attempt to remove the network if it wasn't removed. This is usually not necessary
# because `down` should remove the network unless there are containers outside of
# Docker Compose that are connected to it.
echo "Removing any remaining networks..."
docker network prune -f

# Navigate back to the original Scripts directory
cd ../Scripts

echo "All services have been stopped and removed successfully."
