import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="car cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.make}
            {listing.model}
          </p>
          <div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {listing.description}
            </p>
            <p className="text-slate-500 mt-2 font-semibold flex items-center">
              £{listing.price} / Day
            </p>
            <div className="text-slate-700 flex gap-4 mt-2">
              <div className="font-bold text-xs">{listing.fuelType}</div>
              <div className="font-bold text-xs">{listing.transmission}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
