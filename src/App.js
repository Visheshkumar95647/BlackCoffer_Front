import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Starting from "./component/Starting";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { ProfileProvider } from "./component/Home/ProfileContext";
import Dash from "./component/Dash";
import { CheckComponent } from "./component/Home/CheckComponent";
export default function App() {
  return (
    <Router>
          <ProfileProvider>
          <Routes>
            <Route path="/" element={<Dash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/markethub"
              element={
                <CheckComponent>
                
                  <Starting />
                </CheckComponent>
              }
            />
          </Routes>
          </ProfileProvider>
      
    </Router>
  );
}
