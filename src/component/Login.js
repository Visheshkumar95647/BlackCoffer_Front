import React, { useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const validateuser = async ()=>{
    try{
      const response = await fetch("http://localhost:5000/login" , {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
          },
        body : JSON.stringify({
          username:username,
          password:password
        })
      })
      const result = await response.json();
      console.log(result);
        if (result) {
          localStorage.setItem("token" , result.token);
          navigate("/markethub");
        } else {
          alert("Invalid credentials"); 
        }
      
    }catch (error) {
      console.log({"Error fetching profile data:": error});
    }
  }
  
  return (
    <>
      <div className="front">
        <img
          loading="lazy"
          src="/l-markethub.png"
          alt="Market Logo"
          className="image"
          data-aos="zoom-in"
        />
      </div>


    <main>
        <div className="input">
          <div><input type="text" value = {username} onChange={((e)=>{setUsername(e.target.value)})} placeholder="Enter Username" /></div>
          <div><input type="password" value = {password} onChange={((e)=>{setPassword(e.target.value)})} placeholder="Enter Your Password"/></div>
        <button onClick={validateuser}>Login</button>
        </div>
    </main>
    </>
  );
}
