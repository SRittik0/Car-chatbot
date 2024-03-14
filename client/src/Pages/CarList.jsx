import React from "react";
import car6 from "../images/car6.png";
import car2 from "../images/car2.png";
import car5 from "../images/car5.png";

const carList = [
  {
    name: "BMW UX",
    price: 100,
    image: car6,
    aosDelay: "0",
  },
  {
    name: "KIA UX",
    price: 140,
    image: car2,
    aosDelay: "500",
  },
  {
    name: "BMW UX",
    price: 100,
    image: car5,
    aosDelay: "1000",
  },
];

const CarList = () => {
  return (
    <div className="pb-24">
      <div className="p-5 sm:px-10 md:px-20">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3 text-black">
          Discover Our Fleet
        </h1>
        <p className="text-sm text-gray-500 pb-10">
          Explore our premium car selection for an amazing driving experience.
        </p>
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {carList.map((data, index) => (
              <div
                key={index}
                className="group overflow-hidden relative border-2 border-gray-300 hover:border-primary rounded-xl shadow-md"
              >
                <div className="w-full h-[180px] overflow-hidden">
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-full object-cover transform scale-100 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${data.price}/Day</p>
                    <a href="#" className="text-primary hover:underline">
                      Details
                    </a>
                  </div>
                </div>
                <p className="text-xl font-semibold absolute top-2 left-4 text-black">
                  12Km
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* End of car listing */}
        <div className="grid place-items-center mt-8">
          <button className="btn bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-400 text-xl">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarList;
