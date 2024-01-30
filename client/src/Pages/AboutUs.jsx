import React from "react";
import car5 from "../images/car5.png";

const AboutUs = () => {
  return (
    <div className="bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
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
                About us
              </h1>
              <p className="leading-8 tracking-wide text-black">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, magnam! Tenetur odio quo et maxime?
              </p>
              <p className="text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                tempora.
              </p>
              <buttton className="btn bg-yellow-300 text-black px-6 py-2 rounded-md hover:bg-yellow text-xl">
                Get Started
              </buttton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
