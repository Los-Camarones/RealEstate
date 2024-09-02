resource "aws_instance" "jenkins" {
  ami           = "ami-0900fe555656695a2"  # AMI ID for Amazon Linux 2023
  instance_type = "t2.micro"
  key_name                = "CI_CD"                  # The key pair name
  vpc_security_group_ids  = [aws_security_group.jenkins_sg.id]
  subnet_id     = data.aws_subnet.default.id
  security_groups = [aws_security_group.jenkins_sg.name]
  associate_public_ip_address = true

  root_block_device {
    volume_type = "gp3"
    volume_size = 8
  }

  tags = {
    Name = "Jenkins"
  }

}

