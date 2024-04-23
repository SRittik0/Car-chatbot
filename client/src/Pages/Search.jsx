import React, { useState } from "react";

export default function Search() {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    Petrol: false,
    Diesel: false,
    Manual: false,
    Automatic: false,
    sort: "created_at",
    order: "desc",
  });
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "Manual" ||
      e.target.id === "Automatic"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md: min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2 ">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center ">
            <label className="font-semibold">Transmission:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Manual & Automatic</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Manual"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "Manual"}
              />
              <span>Manual</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Automatic"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "Automatic"}
              />
              <span>Automatic</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center ">
            <label className="font-semibold">Fuel type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Petrol"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "Petrol"}
              />
              <span>Petrol</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Diesel"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "Diesel"}
              />
              <span>Diesel</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value={"regularPrice_desc"}> Price high to low</option>
              <option value={"regularprice_asc"}> Price low to high</option>
              <option value={"created_at_desc"}> Latest</option>
              <option value={"created_at_asc"}> Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results:
        </h1>
      </div>
    </div>
  );
}
