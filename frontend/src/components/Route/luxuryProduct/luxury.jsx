import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import { server } from "../../../server";
import axios from "axios";
import { Link } from "react-router-dom";
const Luxury = () => {
  const [categories, setCategories] = useState([]);
  console.log(categories);

  async function fetchDataFromBackend() {
    const backendEndpoint = `${server}/category/get-all-categories`;

    try {
      const response = await axios.get(backendEndpoint);
      const data = response.data.categories;

      // Check for a successful response (2xx status codes)
      if (response.status >= 200 && response.status < 300) {
        const firstFourCategories = data.slice(0, 6);
        setCategories(firstFourCategories);
      } else {
        throw new Error("Failed to fetch data from the backend");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return [];
    }
  }
  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  return (
    <div className="mx-auto py-5 px-4 w-full  bg-gray-100">
      <div className="mx-auto max-w-sm sm:max-w-3xl lg:max-w-none">
        {/* :TITLE */}
        <h2 className={`${styles.heading}`}>Trending Categories</h2>

        {/* :CATEGORIES */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4 sm:gap-x-8">
          {categories.map((category) => (
            <div
              key={category._id}
              className="col-span-1 aspect-w-2 aspect-h-3 relative shadow-sm rounded-lg overflow-hidden bg-white hover:shadow-lg"
            >
              <Link
                to={`/products/?categories=${category._id}`}
                className="py-6 flex justify-center items-end"
              >
                {/* ::Background Image */}
                <img
                  src={category.image[0].url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* ::Overlay */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-gray-700 via-transparent" />
                {/* ::Category Name */}
                <h3 className="relative text-center text-sm sm:text-base lg:text-lg text-white font-semibold tracking-wide antialiased">
                  {category.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Luxury;
