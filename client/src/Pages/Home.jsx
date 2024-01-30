import React from "react";
import carPng from "../images/car1.png";
import CarList from "./CarList";
function Home() {
  return (
    <div className="bg-black text-white duration-300 relative -z-20">
      <div className="container min-h-[620px] flex">
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2">
          <div className="order-1 sm:order-2">
            <img
              src={carPng}
              alt=""
              className="relative -z-10 max-h-[600px] sm:scale-125 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="order-2 sm:order-1 space-y-5 sm:pr-32">
            <p className="text-2xl font-serif">Effortless</p>
            <h1 className="text-5xl lg:text-7xl font-semibold font-serif">
              Car rental
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam,
              eius aliquid minus sint sit fugit. Nam ipsam porro, est, rerum
              labore magnam, ex obcaecati ut dicta alias quasi minima id.
            </p>
            <button className="btn bg-yellow-300 text-black px-6 py-2 rounded-md hover:bg-yellow text-2xl">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <CarList />
    </div>
  );
}

export default Home;
