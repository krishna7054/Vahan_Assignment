import axios from "axios";
import { useCallback, useEffect, useState, useId } from "react";
import { Link } from 'react-router-dom'; 
import './Createfile.css';

const InputField = ({ label, name, value, onChange }) => {
  const id = useId();

  // Determine input type based on name prop
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
      <label className="label" htmlFor={id}>{label}</label>
      <input className="input"
        type={inputType}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Createfile = () => {
  const [error, setError] = useState(null);
  const [modifiedData, setModifiedData] = useState({
    Name: "",
    Email: "",
    mobile: "",
    DOB: "",
  });

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setModifiedData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!modifiedData.Name.trim() || !modifiedData.Email.trim() || !modifiedData.mobile.trim() || !modifiedData.DOB.trim()) {
      window.alert("Please fill in all the fields.");
      return;
    }

    const formData = {
      Name: modifiedData.Name.trim(),
      Email: modifiedData.Email.trim(),
      mobile: modifiedData.mobile.trim(),
      DOB: modifiedData.DOB.trim(),
    };

    await axios
      .post("http://localhost:1337/api/profiles", { data: formData })
      .then((response) => {
        console.log(response);
        window.alert("Profile created successfully!");
        window.location.reload();
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/profiles")
      .catch((error) => setError(error));
  }, []);

  if (error) {
    // Print errors if any
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className="App" >
      <img className="img" src="../src/assets/Designer-removebg-preview.png" alt="image" />
     
      <form className="frm" onSubmit={handleSubmit}>
        <h3>Create Profile</h3>
      
        <InputField
          label="Name:"
          name="Name"
          value={modifiedData.Name}
          onChange={handleInputChange}
        />
        <InputField
          label="Email:"
          name="Email"
          value={modifiedData.Email}
          onChange={handleInputChange}
        />
        <InputField
          label="Mobile (Format:1234567890):"
          name="mobile"
          value={modifiedData.mobile}
          onChange={handleInputChange}
        />
        <InputField
          label="Date of Birth:"
          name="DOB"
          value={modifiedData.DOB}
          onChange={handleInputChange}
        />
        <br />
        <button className="button" type="submit">Submit</button>

        {/* Button to navigate to the show-profile page */}
        <Link to="/show-profiles">
          <button className="button" type="button">Show Profiles</button>
        </Link>
      </form>
    </div>
  );
};

export default Createfile;
