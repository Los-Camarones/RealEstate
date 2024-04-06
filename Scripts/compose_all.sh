#!/bin/bash
# Bash script to build and run Docker containers from docker-compose files and check their status

# Function to check if a service is running on its port
check_service() {
  local name=$1
  local port=$2
  local host=${3:-"localhost"}
  local path=$4
  for i in {1..10}; do
    nc -z "$host" "$port" > /dev/null 2>&1
    result=$?
    if [ $result -eq 0 ]; then
      echo "$name service is accessible at http://$host:$port$path"
      return 0
    else
      echo "Waiting for $name to be accessible at http://$host:$port$path..."
      sleep 5
    fi
  done
  echo "$name service failed to start. It is not accessible at http://$host:$port$path"
  return 1
}

# Navigate to Docker configurations directory from the Scripts directory
cd '../Docker Configurations'

# Attempt to retrieve the host machine's IP address
HOST_IP=$(hostname -I | awk '{print $1}')

# Assuming Jenkins is running on the default HTTP port 8080 with a context path of /jenkins
JENKINS_PORT=8080
JENKINS_CONTEXT_PATH="/jenkins"

# Assuming Next.js app is running on port 3000
NEXTJS_PORT=3000

# Start Jenkins
echo "Starting Jenkins..."
docker-compose -f jenkins_docker-compose.yml build --no-cache
docker-compose -f jenkins_docker-compose.yml up -d
# Check Jenkins service
check_service "Jenkins" $JENKINS_PORT $HOST_IP $JENKINS_CONTEXT_PATH
jenkins_status=$?

# Space between services
echo " "

# Start Next.js
echo "Starting Next.js..."
docker-compose -f nextjs_docker-compose.yml up -d --build
# Check Next.js service
check_service "Next.js" $NEXTJS_PORT $HOST_IP ""
nextjs_status=$?

# Navigate back to the original Scripts directory
cd ../Scripts

# Check if all services started successfully
if [ $jenkins_status -eq 0 ] && [ $nextjs_status -eq 0 ]; then
  echo "All services have been started successfully."
else
  echo "One or more services failed to start."
fi
