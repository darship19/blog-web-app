import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { updateProfile } from 'firebase/auth';

function UserProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user data from Firebase
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const [first, last] = user.displayName ? user.displayName.split(' ') : ['', ''];
      setFirstName(first);
      setLastName(last);
      setEmail(user.email);
      setDisplayName(user.displayName);
    }
  }, []);

  // Handle profile update
  const handleUpdateProfile = () => {
    if (firstName === '' || lastName === '') {
      setErrorMessage('First name and last name cannot be empty');
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    
    // Update the display name in Firebase
    updateProfile(auth.currentUser, {
      displayName: fullName,
    })
      .then(() => {
        setDisplayName(fullName);
        setSuccessMessage('Profile updated successfully');
        setIsEditing(false); // Exit edit mode after successful update
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="UserProfilePage">
      <h2>User Profile</h2>

      {!isEditing ? (
        <div>
          <p><strong>First Name:</strong> {firstName}</p>
          <p><strong>Last Name:</strong> {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button onClick={handleUpdateProfile}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default UserProfile;
