import React from "react";

const CategoryCard = ({ data }) => {
  const { image, name, _id } = data;
  return (
    <div className="w-full h-[280px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer border ml-4">
      <a href={`http://localhost:3000/products?categories=${_id}`}>
        <img
          className="w-full h-[170px] object-contain"
          src={image.url}
          alt={name}
        />
      </a>
      <div className="p-5">
        <a href={`http://localhost:3000/products?categories=${_id}`}>
          <h5 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base mb-2">
            {name}
          </h5>
        </a>
        <a
          href={`http://localhost:3000/products?categories=${_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          explore
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;
