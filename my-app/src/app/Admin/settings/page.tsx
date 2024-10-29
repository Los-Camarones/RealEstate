'use client';  
import '../../globals.css'; 
import NavBar from '../../../components/Navbar/navbar';
import React, { useState } from "react";
import useAuth from '../../hooks/useAuth';  


const updateUserSettings = async (data: any) => {
  // Replace with actual API call
  return { success: true, message: "Settings updated successfully!" };
};

const SettingsPage: React.FC = () => {
  const auth = useAuth();  // Check if user is authenticated

  // Declare hooks here to ensure they are always called
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Don't render the form until authentication is confirmed
  if (!auth) {
    return <div>Loading...</div>;  // Always return after hooks are declared
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic form validation
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      return;
    }

    // Update user settings via API
    const response = await updateUserSettings({
      username,
      currentPassword,
      newPassword,
    });

    // Handle success or error response
    if (response.success) {
      setSuccess(response.message);
      setError(null);
    } else {
      setError("Failed to update settings");
      setSuccess(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Settings</h1>

            {/* Display error messages */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-6">
                {error}
              </div>
            )}

            {/* Display success message */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-6">
                {success}
              </div>
            )}

            {/* Form for updating user settings */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-gray-700 font-medium">My Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="currentPassword" className="block text-gray-700 font-medium">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-gray-700 font-medium">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default SettingsPage;
