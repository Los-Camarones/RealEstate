resource "aws_vpc" "ci_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "ci_vpc"
  }
}

resource "aws_subnet" "ci_subnet" {
  vpc_id            = aws_vpc.ci_vpc.id
  cidr_block        = "10.0.1.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "ci_subnet"
  }
}

resource "aws_internet_gateway" "ci_gw" {
  vpc_id = aws_vpc.ci_vpc.id

  tags = {
    Name = "ci_gw"
  }
}

resource "aws_route_table" "ci_route_table" {
  vpc_id = aws_vpc.ci_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ci_gw.id
  }

  tags = {
    Name = "ci_route_table"
  }
}

resource "aws_route_table_association" "ci_rta" {
  subnet_id      = aws_subnet.ci_subnet.id
  route_table_id = aws_route_table.ci_route_table.id
}
