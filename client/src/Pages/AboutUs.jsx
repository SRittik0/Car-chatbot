import React from "react";
import car5 from "../images/car5.png";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-dark to-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300 ">
      <div className="p-5 sm:px-10 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div>
            <img
              src={car5}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-black">
                About Us
              </h1>
              <p className="leading-8 tracking-wide text-slate-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, magnam! Tenetur odio quo et maxime?
              </p>
              <p className="text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                tempora.
              </p>
              <button className="btn bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-400 text-xl">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
