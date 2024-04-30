import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CarListingForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    make: "",
    model: "",
    year: "",
    description: "",
    price: "",
    fuelType: "",
    transmission: "",
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(
        `http://localhost:5001/server/cars/get/${listingId}`
      );
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      setLoading(true);
      setError(false);
      const res = await fetch(
        `http://localhost:5001/server/cars/update/${params.listingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    console.log("Car information submitted:", formData);
  };

  const handleChange = (e) => {
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "checkbox"
    ) {
      setFormData({
        ...formData,

        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Update Listing</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="make"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Make
            </label>
            <input
              type="text"
              id="make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Price (GBP)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="fuelType"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Fuel Type
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fuelType"
              name="fuelType"
              value="Petrol"
              onChange={handleChange}
              className="mr-2"
              checked={formData.fuelType === "Petrol"}
            />
            <label htmlFor="fuelType" className="mr-4">
              Petrol
            </label>
            <input
              type="checkbox"
              id="fuelType"
              name="fuelType"
              value="Diesel"
              onChange={handleChange}
              className="mr-2"
              checked={formData.fuelType === "Diesel"}
            />
            <label htmlFor="fuelType">Diesel</label>
            <input
              type="checkbox"
              id="fuelType"
              name="fuelType"
              value="Electric"
              onChange={handleChange}
              className="mr-2"
              checked={formData.fuelType === "Electric"}
            />
            <label htmlFor="fuelType" className="mr-4">
              Electric
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="transmission"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Transmission:
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="transmission"
              name="transmission"
              value="Automatic"
              onChange={handleChange}
              className="mr-2"
              checked={formData.transmission === "Automatic"}
            />
            <label htmlFor="transmission" className="mr-4">
              Automatic
            </label>
            <input
              type="checkbox"
              id="transmission"
              name="transmission"
              value="Manual"
              onChange={handleChange}
              className="mr-2"
              checked={formData.transmission === "Manual"}
            />
            <label htmlFor="fuelType">Manual</label>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Car Image
          </label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:border-blue-500"
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              disabled={uploading}
              className=" border border-orange-700 text-orange-700 py-2 px-4 rounded uppercase hover:shadow-lg disabled:opacity-80 cursor-pointer"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                  delete
                </button>
              </div>
            ))}
        </div>
        <div className="flex justify-between mb-5">
          <button
            disabled={loading || uploading}
            type="submit"
            className="bg-slate-700 text-white py-2 px-4 rounded-lg uppercase hover:bg-yellow-500 cursor-pointer"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default CarListingForm;
