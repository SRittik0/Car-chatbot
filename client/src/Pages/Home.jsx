// Update the Home component

import React from "react";
import carPng from "../images/car1.png";
import CarList from "./CarList";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import SearchInput from "../Components/SearchInput";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-black duration-300 relative z-0">
      <div className="container min-h-[620px] flex p-5 sm:px-10 md:px-20 relative z-10">
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2">
          <div className="order-1 sm:order-2">
            <img
              src={carPng}
              alt=""
              className="relative z-0 max-h-[600px] sm:scale-125 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="order-2 sm:order-1 space-y-5 sm:pr-32">
            <h1 className="text-5xl lg:text-7xl font-semibold font-serif">
              Premium Car rental
            </h1>
            <p className="text-gray-400">
              Book the selected car effortlessly, Pay for driving only, Book the
              Car Now
            </p>

            <button className="btn bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-400 text-xl cursor-pointer">
              Explore
            </button>
          </div>
        </div>
      </div>
      <SearchInput />
      <CarList />
      <AboutUs />
      <Footer />

      <Link to="/bot" className="fixed bottom-10 right-10 z-50">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-yellow text-xl cursor-pointer">
          Chat
        </button>
      </Link>
    </div>
  );
}

export default Home;
