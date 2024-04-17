# PowerShell script to build and run Docker containers from docker-compose files and check their status

function Check-Service {
    param (
        [string]$name,
        [int]$port,
        [string]$serviceHost = "localhost",
        [string]$path = ""
    )
    for ($i = 0; $i -lt 10; $i++) {
        $tcpClient = New-Object System.Net.Sockets.TcpClient
        try {
            $tcpClient.Connect($serviceHost, $port)
            if ($tcpClient.Connected) {
                Write-Host "$name service is accessible at http://$serviceHost`:$port$path"
                return $true
            }
        } catch {
            Write-Host "Waiting for $name to be accessible at http://$serviceHost`:$port$path..."
            Start-Sleep -Seconds 5
        } finally {
            $tcpClient.Close()
        }
    }
    Write-Host "$name service failed to start. It is not accessible at http://$serviceHost`:$port$path"
    return $false
}

# Navigate to Docker configurations directory from the Scripts directory
Set-Location -Path "../Docker Configurations"

# Attempt to retrieve the host machine's IP address
$serviceHostIP = (Get-NetIPAddress -AddressFamily IPv4).IPAddress | Select-Object -First 1

# Assuming Jenkins is running on the default HTTP port 8080 with a context path of /jenkins
$JENKINS_PORT = 8080
$JENKINS_CONTEXT_PATH = "/jenkins"

# Assuming Next.js app is running on port 3000
$NEXTJS_PORT = 3000

# Start Jenkins
Write-Host "Starting Jenkins..."
docker-compose -f jenkins_docker-compose.yml build --no-cache
docker-compose -f jenkins_docker-compose.yml up -d
# Check Jenkins service
$jenkins_status = Check-Service -name "Jenkins" -port $JENKINS_PORT -serviceHost $serviceHostIP -path $JENKINS_CONTEXT_PATH

# Space between services
Write-Host " "

# Start Next.js
Write-Host "Starting Next.js..."
docker-compose -f nextjs_docker-compose.yml up -d --build
# Check Next.js service
$nextjs_status = Check-Service -name "Next.js" -port $NEXTJS_PORT -serviceHost $serviceHostIP -path ""

# Navigate back to the original Scripts directory
Set-Location -Path "../Scripts"

# Check if all services started successfully
if ($jenkins_status -and $nextjs_status) {
    Write-Host "All services have been started successfully."
} else {
    Write-Host "One or more services failed to start."
}
