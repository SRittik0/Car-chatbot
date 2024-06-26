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
import Contact from "./Pages/Contact";
import B from "./Pages/B";
import SearchInput from "./Components/SearchInput";
import CarListingForm from "./Pages/CarListingForm";
import PrivateRoute from "./Components/PrivateRoute";
import UpdateListing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";
// import ListingItem from "./Components/ListingItem";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignOut />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>

        <Route path="/" element={<CarList />} />
        <Route path="/" element={<AboutUs />} />
        <Route path="/" element={<Footer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact" element={<Navbar />} />
        <Route path="/bot" element={<B />} />
        <Route path="/searchInput" element={<SearchInput />} />
        <Route path="/carlistingform" element={<CarListingForm />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/listingItem" element={<ListingItem />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
