import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './Createfile.css';

const InputField = ({ label, name, value, onChange }) => {
  let inputType = "text";
  if (name === "Email") {
    inputType = "email";
  } else if (name === "mobile") {
    inputType = "tel";
  } else if (name === "DOB") {
    inputType = "date";
  }
  return (
    <div className="input-wrapper">
      <label className="label">{label}</label>
      <input className="input"
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const UpdateProfile = () => {
  const { profileId } = useParams();

  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    Name: "",
    Email: "",
    mobile: "",
    DOB: "",
  });

  const [updatedProfileData, setUpdatedProfileData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/profiles/${profileId}`
        );
        setProfileData(response.data.data.attributes);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [profileId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfileData({ ...updatedProfileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      data: {
        ...updatedProfileData,
      },
    };

    console.log("Updated Profile Data:", updatedData);

    try {
      await axios.put(
        `http://localhost:1337/api/profiles/${profileId}`,
        updatedData
      );
      window.alert("Profile updated successfully!");

      // Clear updated profile data and reset to original values for a clean editing experience
      setUpdatedProfileData(profileData); // Resets to initial profile data

      // Optional: If you want to keep the original profile data intact
      // const originalProfileData = { ...profileData };
      // setProfileData(originalProfileData);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="App">
      <img className="img" src="../src/assets/Designer-removebg-preview.png" alt="image" />
      {error && <div>Error: {error.message}</div>}
      <form className="frm" onSubmit={handleSubmit}>
        <h3>Update Profile</h3>
        <InputField
          label="Name"
          name="Name"
          value={updatedProfileData.Name || profileData.Name}
          onChange={handleInputChange}
        />
        <InputField
          label="Email"
          name="Email"
          value={updatedProfileData.Email || profileData.Email}
          onChange={handleInputChange}
        />
        <InputField
          label="Mobile"
          name="mobile"
          value={updatedProfileData.mobile || profileData.mobile}
          onChange={handleInputChange}
        />
        <InputField
          label="DOB"
          name="DOB"
          value={updatedProfileData.DOB || profileData.DOB}
          onChange={handleInputChange}
        />
        <button className="button" type="submit">Update Profile</button>
        <Link to="/show-profiles">
          <button className="button" type="button">Show Profiles</button>
        </Link>
      </form>
    </div>
  );
};

export default UpdateProfile;
