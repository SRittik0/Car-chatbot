import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    Petrol: true,
    Diesel: false,
    Manual: false,
    Automatic: false,
    Electric: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const ManualFromUrl = urlParams.get("Manual");
    const AutomaticFromUrl = urlParams.get("Automatic");
    const PetrolFromUrl = urlParams.get("Petrol");
    const DieselFromUrl = urlParams.get("Diesel");
    const ElectricFromUrl = urlParams.get("Electric");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      ManualFromUrl ||
      AutomaticFromUrl ||
      PetrolFromUrl ||
      DieselFromUrl ||
      ElectricFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        Manual: ManualFromUrl === "true" ? true : false,
        Automatic: AutomaticFromUrl === "true" ? true : false,
        Petrol: PetrolFromUrl === "true" ? true : false,
        Diesel: DieselFromUrl === "true" ? true : false,
        Electric: ElectricFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `http://localhost:5001/server/cars/get?${searchQuery}`
      );
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [window.location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "Manual" ||
      e.target.id === "Automatic" ||
      e.target.id === "Electric"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "Petrol" ||
      e.target.id === "Diesel" ||
      e.target.id === "Electric"
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    // urlParams.set("Manual", sidebardata.Manual);
    // urlParams.set("Automatic", sidebardata.Automatic);
    const fuelType = {
      Petrol: sidebardata.Petrol,
      Diesel: sidebardata.Diesel,
      Electric: sidebardata.Electric,
    };
    let fuelTypeString = "";
    for (let key in fuelType) {
      if (fuelType[key] === true) {
        fuelTypeString += key + ",";
      }
    }
    fuelTypeString = fuelTypeString.replace(/,\s*$/, "");
    console.log(fuelTypeString);

    if (fuelTypeString.length != 0) {
      urlParams.set("fuelType", fuelTypeString);
    }

    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md: min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
              <span>All</span>
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
                checked={sidebardata.Petrol}
              />
              <span>Petrol</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Diesel"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.Diesel}
              />
              <span>Diesel</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Electric"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.Electric}
              />
              <span>Electric</span>
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
              <option value={"regularPrice_asc"}> Price low to high</option>
              <option value={"createdAt_desc"}> Latest</option>
              <option value={"createdAt_asc"}> Oldest</option>
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
