import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "./Footer";

function Contact() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-100">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl text-center text-black font-bold mb-6">
          Contact Us
        </h2>
        <form action="">
          <div className="mb-4">
            <label
              className="block text-black text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Your Name
            </label>
            <input
              id="name"
              placeholder="Mark"
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:border-blue-500"
              required
              type="text"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Your Email
            </label>
            <input
              id="email"
              placeholder="Mark@example.com"
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:border-blue-500"
              required
              type="email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-semibold mb-2"
              htmlFor="message"
            >
              Your Message
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Type your message here"
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:border-blue-500"
              required
              type="text"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-slate-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-white"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
