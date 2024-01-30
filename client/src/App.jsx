import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignOut from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import CreateListing from "./Pages/CreateListing";
import CarList from "./Pages/CarList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignOut />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/" element={<CarList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
