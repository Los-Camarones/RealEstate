import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserEdit, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #007bff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const UserDetails = styled.div`
  flex-grow: 1;
  margin-left: 20px;
`;

const UserName = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const UserDetailItem = styled.p`
  margin: 5px 0;
  display: flex;
  align-items: center;
  font-size: 16px;

  svg {
    margin-right: 8px;
  }
`;

const EditButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfilePicture src="https://via.placeholder.com/120" alt="Profile" />
                <UserDetails>
                    <UserName>John Doe</UserName>
                    <UserDetailItem><FaEnvelope /> john.doe@example.com</UserDetailItem>
                    <UserDetailItem><FaMapMarkerAlt /> New York, USA</UserDetailItem>
                    <UserDetailItem><FaCalendarAlt /> Joined January 2023</UserDetailItem>
                </UserDetails>
                <EditButton onClick={toggleEdit}>{isEditing ? 'Save' : 'Edit'}</EditButton>
            </ProfileHeader>
        </ProfileContainer>
    );
};

export default ProfilePage;