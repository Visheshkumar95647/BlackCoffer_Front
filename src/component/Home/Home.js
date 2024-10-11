import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import ProfileContext from "./ProfileContext";
import { useNavigate } from "react-router-dom";
import checkingComponent from "./CheckComponent";


import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ProfileSection from "./ProfileSection";
import Search from "./Search";
import Post from "./Post";

export default function Home() {
  const {checkHome , setCheckHome ,checkSearch , setCheckSearch , checkProfile , setCheckProfile,  setUsernameData , checkPost , setCheckPost} = useContext(checkingComponent);
  const { prodata } = useContext(ProfileContext);

  // const {setUsername} = useContext(ProfileSec);

  const navigate = useNavigate();
  
  const [allProfile, setallProfile] = useState([]);
  const [allUpload, setallUpload] = useState([]);

  //SET Username for Profile section
  const getProfileByUsername = async (id) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch(`http://localhost:5000/inspect/${id}`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        setUsernameData(result); 
      } else if (response.status === 404) {
        console.log("User not found");
      } else {
        console.log("Failed to fetch profile data");
      }
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };
  
  const handleClick = (e, id) => {
    e.preventDefault();
    // setComponent(false);
    getProfileByUsername(id);
    setCheckHome(false);
    setCheckProfile(true);
    setCheckSearch(false);
  };
  const fetchAllProfile = async () => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/mar");
    // }
    try {
      const res = await fetch("http://localhost:5000/allprofile", {
        method: "GET",
      });
      if (res.ok) {
        const result = await res.json();
        if (result) {
          setallProfile(result.alluser);
        } else {
          alert("Profile Data not Fetched Properly ");
        }
      } else {
        alert("Response is not Ok");
      }
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };



  const getAllProduct = async () => {
    const token = localStorage.getItem("token");
    if(token){
      try {
        const response = await fetch("http://localhost:5000/getallproduct", {
          method: "GET",
        });
        if (response.ok) {
          const result = await response.json();
          if (result) {
            setallUpload(result.uploadData);
          } else {
            console.log("No data returned from API");
          }
        } else {
          console.log("Response not OK", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching product data:", error);
      }
    }
  };



  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllProfile();
    getAllProduct();
  }, []);



  return (
    <>
      { !checkProfile && !checkSearch && checkHome && allUpload.map((product, i) => {
        const users = allProfile.filter(
          (profile) => profile._id === product.id
        );
        const images = product.Productimages.map((img) => ({
          url: `http://localhost:5000/product/${img}`,
        }));

        return (
          <div key={i} className="uploads">
            {users.map((user, j) => (
              <div key={j}>
                <div className="top">
                  <div className="top-data">
                    <div>
                      {user.image && (
                        <><img
                          className="profileimage"
                          src={`http://localhost:5000/images/${user.image}`}
                          alt="Profile"
                        /></>
                      
                      )}
                    </div>
                    <div className="proname"><a href="" onClick={ (e) =>handleClick(e ,user._id)}>{user.name}</a></div>
                  </div>
                </div>
              </div>
            ))}
            <div className="middle">
                <div className="slide-container">
                  <Slide>
                    {images.map((image, index) => (
                      <div key={index}>
                        <div>
                          <img src={image.url} alt="" />
                        </div>
                      </div>
                    ))}
                  </Slide>
                </div>
            </div>

            <div className="bottom">
              <div className="feed">
                <button className="like">
                  
                  <img src="like.png" alt="Like" />
                </button>
                <button className="comment">
                  <img src="comment.png" alt="Comment" />
                </button>
              </div>
              <button className="feed">
                <img src="share.png" alt="Share" />
              </button>
            </div>
          </div>
        );
      })}
      {!checkSearch && !checkHome && checkProfile && !checkPost && <ProfileSection/>}
      {!checkHome && !checkProfile && checkSearch && !checkPost && <Search/>}
      {!checkSearch && !checkHome && !checkProfile && checkPost && <Post/> }
    </>
  );
}



