import React from "react";
import Navbar from "../Components/Navbar";

function Contact() {
  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <div className=" max-w-md w-full mx-auto p-6 bg-gray-500 rounded-lg shadow-md">
        <h2 className="text-3xl text-center text-white font-bold mb-6">
          Contact Us
        </h2>
        <form action="">
          <div className="mb-4">
            <label
              className="block text-white text--sm font-semibold mb-2"
              htmlFor=""
            >
              Your Name
            </label>
            <input
              placeholder="Big Man"
              className="w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-blue-500"
              required
              type="text"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text--sm font-semibold mb-2"
              htmlFor=""
            >
              Your Email
            </label>
            <input
              placeholder="Jonh@example.com"
              className="w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-blue-500"
              required
              type="email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text--sm font-semibold mb-2"
              htmlFor=""
            >
              Your Message
            </label>
            <textarea
              rows="4"
              placeholder="Type your message here"
              className="w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-blue-500"
              required
              type="text"
            />
            <div className="flex float-right">
              <button
                type="submit"
                className="bg-yellow-500 text-white font-semibold px-9 py-2 rounded-lg hover:bg-pink-600 focus:outline-white"
              >
                Send{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
