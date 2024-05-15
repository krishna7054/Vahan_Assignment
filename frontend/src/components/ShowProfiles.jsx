import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'; 
import UpdateProfile from './UpdateProfile'; // Import the UpdateProfile component
import './ShowProfiles.css'

// Inside Profile component
const Profile = ({ id, name, email, mobile, dob, onDelete, onUpdate }) => {
  return (
    <div className="smcart">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Mobile: {mobile}</p>
      <p>Date of Birth: {dob}</p>
      <button className="button" onClick={() => onDelete(id)}>Delete</button>
      {/* Redirect to update page with ID */}
      {/* {setUpdateId(id)} */}
      {console.log(id)}
      <Link to={`/update-profile/${id}`}>
        <button className="button">Update</button>
      </Link>
    </div>
  );
};

const ShowProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [updateId, setUpdateId] = useState(null); // State to hold the id for update

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/profiles");
      setProfiles(response.data.data);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/profiles/${id}`);
      fetchProfiles();
      window.alert("Profile delete successfully!");
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdate = async (id) => {
    // Set the id for update
    await setUpdateId(id);
    console.log(id);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div >
      <h3>Profiles</h3>
      <div className="cart">
      {profiles.map((profile) => (
        <Profile
          key={profile.id}
          id={profile.id}
          name={profile.attributes.Name}
          email={profile.attributes.Email}
          mobile={profile.attributes.mobile}
          dob={profile.attributes.DOB}
          onDelete={handleDeleteProfile}
          onUpdate={handleUpdate}
        />
      ))}
</div>
      {/* Conditional rendering of UpdateProfile component */}
      {updateId !== null && <UpdateProfile profileId={updateId} />}
      
      {/* Button to navigate to the createfile page */}
      <Link to="/">
        <button className="button">Back</button>
      </Link>
    
    </div>
  );
};

export default ShowProfiles;
