import React, { useState } from "react";

const CarListingForm = () => {
  const [carInfo, setCarInfo] = useState({
    image: "",
    make: "",
    model: "",
    year: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarInfo({
      ...carInfo,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCarInfo({
          ...carInfo,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission (e.g., API call or state update)
    console.log("Car information submitted:", carInfo);
  };

  return (
    <div className="m-11 max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">List Your Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Car Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
          />
          {carInfo.image && (
            <img
              src={carInfo.image}
              alt="Car Preview"
              className="mt-2 max-h-40 object-cover w-full"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="make"
              className="block text-sm font-medium text-gray-600"
            >
              Make
            </label>
            <input
              type="text"
              id="make"
              name="make"
              value={carInfo.make}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-600"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={carInfo.model}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-600"
            >
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={carInfo.year}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price (USD)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={carInfo.price}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={carInfo.description}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 cursor-pointer"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default CarListingForm;
