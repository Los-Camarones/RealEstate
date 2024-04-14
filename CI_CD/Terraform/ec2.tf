resource "aws_instance" "jenkins" {
  ami           = "ami-0c55b159cbfafe1f0"  # Example AMI for Amazon Linux 2
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.ci_subnet.id
  security_groups = [aws_security_group.jenkins_sg.name]

  tags = {
    Name = "Jenkins"
  }
}
