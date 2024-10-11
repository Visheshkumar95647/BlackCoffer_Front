import React, { useEffect } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
export default function Dash() {
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
      <div className="front">
        <img
          loading="lazy"
          src="/l-markethub.png"
          alt="Market Logo"
          className="image"
          data-aos="zoom-in"
        />

          <button><Link to="/login">Login</Link></button>
      
          <button><Link to="/signup">SignUp</Link></button>
        
      </div>

      <main>
        <div className="part1">
          <div data-aos="zoom-in" data-aos-mirror="true" data-aos-easing="ease-out">
            <img className="loc" src="pin.png" alt="" />
          </div>
          <div>
            <p data-aos="flip-right">
              We offer a robust routing system using the Google Maps API,
              providing clear paths between sellers and buyers. Our solution
              ensures efficient, real-time navigation, enhancing connectivity
              and ease of transaction for all users.
            </p>
          </div>
        </div>
        <div className="part1">
          <div>
            <p data-aos="flip-left">
              We provide an integrated feedback system where users can easily
              share their experiences with sellers. Additionally, our platform
              features a detailed seller rating system with a maximum of 6 stars,
              allowing buyers to make informed decisions based on comprehensive
              and nuanced evaluations.
            </p>
          </div>
          <div data-aos="zoom-in">
            <img className="loc" src="feed.png" alt="" />
          </div>
        </div>
        <div className="part1">
          <div data-aos="zoom-in">
            <img className="loc" src="lik.png" alt="" />
          </div>
          <div>
            <p data-aos="flip-right">
              We provide a robust product liking system that allows users to
              easily express their preferences. Additionally, our platform
              features a comment section where users can share their thoughts and
              feedback. This helps identify the most popular and best-selling
              products, enabling sellers to understand market trends and meet
              customer demand effectively.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
