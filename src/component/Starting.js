import React, { useContext, useEffect, useState } from "react";
import ProfileContext from "./Home/ProfileContext";
import checkingComponent from "./Home/CheckComponent";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./Home/Home";
import Post from "./Home/Post";
export default function Starting() {
  const { prodata } = useContext(ProfileContext);
  const {
    setCheckHome,
    setCheckSearch,
    setCheckProfile,
    setCheckPost,
    setUsernameData,
  } = useContext(checkingComponent);

  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Want to Log Out?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1500,
      easing: "ease-in-sine",
      delay: 50,
      once: true,
      mirror: false,
      anchorPlacement: "top-center",
    });

    AOS.refresh();
  }, []);

  return (
    <>
      <div className="start">
        <div className="left-sidebar">
          <div className="img">
            <img src="l-markethub.png" alt="Market Logo" />
          </div>
          <div className="list">
            <div
              className="nav"
              onClick={() => {
                setCheckHome(true);
                setCheckSearch(false);
                setCheckProfile(false);
                setCheckPost(false);
              }}
            >
              <div className="icon">
                <img src="h.png" alt="Home" />
              </div>
              <div>
                <h3>Home</h3>
              </div>
            </div>
            <br />
            <br />
            <div
              className="nav"
              onClick={() => {
                setCheckHome(false);
                setCheckSearch(true);
                setCheckProfile(false);
                setCheckPost(false);
              }}
            >
              <div className="icon">
                <img src="sea.png" alt="Search" />
              </div>
              <div>
                <h3>Search</h3>
              </div>
            </div>
            <br />
            <br />
            <div
              className="nav"
              onClick={() => {
                setUsernameData(prodata);
                setCheckHome(false);
                setCheckSearch(false);
                setCheckProfile(true);
                setCheckPost(false);
              }}
            >
              <div className="icon">
                <img src="pro.png" alt="Search" />
              </div>
              <div>
                <h3>Profile</h3>
              </div>
            </div>
            <br />
            <br />
            <div className="nav">
              <div className="icon">
                <img src="msg.png" alt="Message" />
              </div>
              <div>
                <h3>Message</h3>
              </div>
            </div>
            <br />
            <br />
            <div
              className="nav"
              onClick={() => {
                setUsernameData(prodata);
                setCheckHome(false);
                setCheckSearch(false);
                setCheckProfile(false);
                setCheckPost(true);
              }}
            >
              <div className="icon">
                <img src="upload.png" alt="Post" />
              </div>
              <div>
                <h3>Post</h3>
              </div>
            </div>
            <br />
            <br />
            <div className="nav">
              <div className="icon">
                <img src="setting.png" alt="Setting" />
              </div>
              <div>
                <h3>Setting</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="middle-bar">
          <div className="logo-img" data-aos="zoom-in">
            <img src="l-markethub.png" alt="" />
          </div>
          <div>{<Home />}</div>
        </div>

        <div className="right-sidebar">
          {prodata && (
            <>
              <div className="profileimg">
                {prodata.image && (
                  <img
                    src={`http://localhost:5000/images/${prodata.image}`}
                    alt="Profile"
                  />
                )}
              </div>
              <div className="proname">{prodata.name}</div>
              <div className="prousername">{prodata.username}</div>
              <div className="proaddress">
                <div>
                  <img src="location.png" alt="Location" />
                </div>
                <div>
                  <div>{prodata.address}</div>
                  <div className="procity">{prodata.city && prodata.city}</div>
                  <div className="pin">{prodata.pin}</div>
                </div>
              </div>
              <div>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
