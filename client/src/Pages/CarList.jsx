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
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">
          Lorem ipsum dolor
        </h1>
        <p className="text-sm pb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor iure
          nemo ab?
        </p>
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {carList.map((data) => (
              <div className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group">
                <div className="w-full h-[120px]">
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${data.price}/Day</p>
                    <a href="#">Details</a>
                  </div>
                </div>
                <p className="text-xl font-semibold absolute top-0 left-3">
                  12Km
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* End of car listing */}
        <div className="grid place-items-center mt-8">
          <button className="button-outline">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default CarList;
