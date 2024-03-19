import React from "react";
import { Link, NavLink } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-black">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap text-white">
            <span className="text-orange-400">Ride</span>
            <span className="text-orange-600">Fleet</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-black"
          />
        </form>

        <ul className="flex gap-4">
          <NavLink to="/carlistingform" activeClassName="underline">
            <li className="hidden sm:inline text-white hover:underline">
              List
            </li>
          </NavLink>
          <NavLink to="/contact" activeClassName="underline">
            <li className="hidden sm:inline text-white hover:underline">
              Contact
            </li>
          </NavLink>

          <NavLink to="/profile" activeClassName="underline">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="hidden sm:inline text-white hover:underline">
                Sign In
              </li>
            )}
          </NavLink>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
