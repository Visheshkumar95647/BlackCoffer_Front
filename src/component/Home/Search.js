import React, { useContext, useEffect, useState } from "react";
import checkingComponent from "./CheckComponent";

export default function Search() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const { setCheckSearch , setCheckHome , setUsernameData , setCheckProfile } = useContext(checkingComponent);

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

  const handleClick = (id)=>{
    console.log("hii");
    getProfileByUsername(id);
    setCheckProfile(true);
    setCheckSearch(false);
    setCheckHome(false);
  }

  const searchUser = async () => {
    try {
      if (search.length == 0) {
        alert("Enter UserName");
      } else {
        const response = await fetch(
          `http://localhost:5000/search/user?search=${search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUser(data);
        } else {
          console.error("Error:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="searching">
      <div className="search-bar">
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Username"
          />
        </div>
        <div>
          <button onClick={searchUser}>Search</button>
        </div>
      </div>
      <div className="search-results">
      <br />
        {user.length > 0 ? (
          user.map((u, index) => (
            <div className="search-top">
            {console.log(u.image)}
              <div className="search-top-data">
                <div>
                  {u.image && (
                    
                    <><img
                      src={`http://localhost:5000/images/${u.image}`}
                      alt="Profile"
                    /></>
                  )}
                </div>
                <div className="proname"><a href="" onClick={()=>handleClick(u._id)}>{u.name}</a></div>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>

      </div>
    </>
  );
}
