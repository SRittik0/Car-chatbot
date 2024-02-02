import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignOut from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import CreateListing from "./Pages/CreateListing";
import CarList from "./Pages/CarList";
import AboutUs from "./Pages/AboutUs";
import Footer from "./Pages/Footer";
import Chat from "./Pages/Chat";
import Bot from "./Pages/Bot";
import Contact from "./Pages/Contact";

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
        <Route path="/" element={<AboutUs />} />
        <Route path="/" element={<Footer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact" element={<Navbar />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        <Route path="/bot" element={<Bot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
