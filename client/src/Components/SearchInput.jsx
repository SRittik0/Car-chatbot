import React from "react";

function SearchInput() {
  return (
    <div className="mt-5">
      <h2 className="text-center text-[20px] text-gray-400 mb-3">
        Let's Search what you need
      </h2>
      <div className="flex flex-col items-center">
        <div className="sm:w-[40%] lg:w-[45%] xl:w-[50%] flex bg-gray-200 p-1 px-2 sm:px-4 md:px-6 lg:px-8 gap-2 rounded-full divide-x mb-[8%]">
          <div className="flex items-center flex-1">
            <input
              type="text"
              placeholder="Location"
              className="w-full p-2 outline-none bg-transparent"
            />
          </div>
          <div>
            <input
              type="date"
              className="p-2 outline-none bg-transparent text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
