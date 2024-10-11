import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [prodata, setProdata] = useState({});
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      // if (!token) {
      //   navigate('/');
      //   return;
      // }
      const response = await fetch("http://localhost:5000/userdetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await response.json();
      if (data) {
        setProdata(data.user);
      } else {
        alert("User Does Not Exist");
        // navigate("/");
      }
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [navigate]);

  return (
    <ProfileContext.Provider value={{ prodata, setProdata }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileContext;
