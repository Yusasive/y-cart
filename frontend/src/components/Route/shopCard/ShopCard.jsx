import React from "react";

const ShopCard = ({ data }) => {
  return (
    <>
      <div className="mb-4 p-0 sm:p-4 w-full flex">
        {/* Card container */}
        <div className="flex-1 group border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-lg">
          {/* :CARD IMAGE & CATEGORY */}
          <div className="relative w-full h-40 overflow-hidden">
            {/* ::Image */}
            <img
              src={data.avatar[0].url}
              alt=""
              className="w-full h-full object-cover object-center transition-all duration-300 transform group-hover:scale-110"
            />
            {/* ::Category */}
            <h2 className="absolute top-6 left-6 inline-block pt-0.5 pb-1.5 px-2 rounded-md text-sm text-gray-100 subpixel-antialiased font-medium bg-gradient-to-br from-green-500 to-blue-500 cursor-pointer">
              {data.industry} {data.classification}
            </h2>
          </div>

          {/* :CARD BODY */}
          <div className="my-6 py-1 px-8 flex flex-col justify-around items-center">
            {/* ::Title */}
            <h1 className="title-font text-2xl text-center font-bold text-gray-800 antialiased">
              {data.name}
            </h1>
            {/* ::Excerpt */}
            <p className="line-clamp-8 py-5 overflow-hidden leading-relaxed text-sm text-gray-500 text-left font-medium cursor-pointer">
              {data.classification}
            </p>
            {/* ::Visit shop */}
            <a
              href="#link"
              className="self-start p-2 bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent font-medium no-underline transform hover:scale-105"
            >
              Visit shop
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCard;
