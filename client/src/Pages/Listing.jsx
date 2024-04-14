import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

SwiperCore.use([Navigation]);

export default function Listing() {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5001/server/cars/get/${params.listingId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
        } else {
          setListing(data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
          <div className="">
            <div className="">
              <Swiper navigation>
                {listing.imageUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt={`Slide ${index}`}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="swiper-pagination"></div>
          </div>
          <div className="flex justify-end">
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              <FaShare className="mr-1" /> Share
            </button>
          </div>
          {copied && (
            <p className="mt-2 bg-gray-100 rounded-md p-2">Link copied!</p>
          )}
          <div className="mt-4">
            <h1 className="text-3xl font-semibold mb-2">
              {listing.make} {listing.model}
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              <span className="font-semibold text-black"> Year:</span>{" "}
              {listing.year}
            </p>
            <p className="text-xl text-gray-700 mb-4">
              <span className="font-semibold text-black">Price:</span> $
              {listing.price}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold text-black">Description:</span>{" "}
              {listing.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <HiOutlineMail className="text-2xl text-gray-600 mr-2" />
                <p className="text-lg text-gray-700">{listing.contactEmail}</p>
              </div>
            </div>
            {contact && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Contact Seller</h2>
                <div className="flex items-center">
                  <HiOutlineMail className="text-2xl text-gray-600 mr-2" />
                  <p className="text-lg text-gray-700">
                    {listing.contactEmail}
                  </p>
                </div>
              </div>
            )}
            {!contact && currentUser && (
              <button
                onClick={() => setContact(true)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
              >
                Contact Seller
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
