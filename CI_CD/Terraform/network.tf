provider "aws" {
  region = "us-east-1" # Choose the region you want your resources to be created in
}

# Creates a new VPC
resource "aws_vpc" "ci_vpc" {
  cidr_block           = "10.0.0.0/16" # CIDR block for the VPC
  enable_dns_support   = true          # Enable DNS support in the VPC
  enable_dns_hostnames = true          # Enable DNS hostnames in the VPC

  tags = {
    Name = "ci_vpc" # Name tag for the VPC
  }
}

# Creates a subnet within the VPC
resource "aws_subnet" "ci_subnet" {
  vpc_id                  = aws_vpc.ci_vpc.id # Associates the subnet with the VPC created above
  cidr_block              = "10.0.1.0/24"     # CIDR block for the subnet
  map_public_ip_on_launch = true              # Automatically assign public IP on launch

  tags = {
    Name = "ci_subnet" # Name tag for the subnet
  }
}

# Creates an Internet Gateway for the VPC
resource "aws_internet_gateway" "ci_gw" {
  vpc_id = aws_vpc.ci_vpc.id # Associates the internet gateway with the VPC

  tags = {
    Name = "ci_gw" # Name tag for the Internet Gateway
  }
}

# Creates a route table for the VPC
resource "aws_route_table" "ci_route_table" {
  vpc_id = aws_vpc.ci_vpc.id # Associates the route table with the VPC

  route {
    cidr_block = "0.0.0.0/0"  # Specifies all traffic
    gateway_id = aws_internet_gateway.ci_gw.id # Directs all traffic to the Internet Gateway
  }

  tags = {
    Name = "ci_route_table" # Name tag for the route table
  }
}

# Associates the subnet with the route table
resource "aws_route_table_association" "ci_rta" {
  subnet_id      = aws_subnet.ci_subnet.id      # The subnet to be associated
  route_table_id = aws_route_table.ci_route_table.id # The route table to be associated
}
