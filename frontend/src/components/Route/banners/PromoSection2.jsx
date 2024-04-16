import React from "react";

const PromoSection2 = () => {
  const promos = [
    {
      id: 1,
      href: "#link",
      name: "New Women's Collection",
      category: "Special Collection",
      imageSrc:
        "https://fancytailwind.com/static/model-woman8-4e92921383ab2888528ffdc9f566eafb.jpg",
      imageAlt: "description of the image",
    },
    {
      id: 2,
      href: "#link",
      name: "Fashion Men's Collection",
      category: "New Collection",
      imageSrc:
        "https://fancytailwind.com/static/model-man4-1a58d69f5a66b84cef1c0e0898302c83.jpg",
      imageAlt: "description of the image",
    },
    {
      id: 3,
      href: "#link",
      name: "Summer 21/22 Collection",
      category: "Summer Sales",
      imageSrc:
        "https://fancytailwind.com/static/model-woman9-b1d407159c1fb46b4b69d7567ca302b0.jpg",
      imageAlt: "description of the image",
    },

    {
      id: 4,
      href: "#link",
      name: "Summer 21/22 Collection",
      category: "Summer Sales",
      imageSrc:
        "https://fancytailwind.com/static/model-woman9-b1d407159c1fb46b4b69d7567ca302b0.jpg",
      imageAlt: "description of the image",
    },
  ];

  return (
    <div className="relative mx-auto py-8 px-4 w-full mb-5 bg-white">
      {/* :BACKGROUND IMAGE */}
      <div>
        <img
          src="https://fancytailwind.com/static/clothes1-cfbdfc4c90e7616b28ed14c338e6e17e.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
        />
        <div className="absolute inset-0 w-full h-full bg-gray-300 bg-opacity-5 backdrop-filter backdrop-blur-sm" />
      </div>

      {/* :TITLE */}
      <h2 className="relative mb-5 text-center text-4xl text-gray-700 font-medium">
        Discover Waka Brand
      </h2>

      {/* :PROMO COLLECTION CARDS */}
      <div className="relative mx-auto max-w-sm md:max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="col-span-1 group relative aspect-w-3 md:aspect-w-2 aspect-h-3 shadow rounded overflow-hidden"
          >
            <a
              href={promo.href}
              className="py-5 pl-8 pr-4 w-full flex flex-col justify-end items-start"
            >
              {/* ::Picture */}
              <img
                src={promo.imageSrc}
                alt={promo.imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-top transition duration-200 ease-in transform group-hover:scale-110"
              />
              {/* ::Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-90" />
              {/* ::Collection Infos */}
              <div className="relative py-5 space-y-3 text-white text-opacity-90 group-hover:text-opacity-100">
                {/* :::category */}
                <p className="text-sm font-medium">{promo.category}</p>
                {/* :::name */}
                <h3 className="text-xl lg:text-2xl font-bold">{promo.name}</h3>
                {/* :::discover */}
                <p className="text-sm font-semibold underline">Discover</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoSection2;
