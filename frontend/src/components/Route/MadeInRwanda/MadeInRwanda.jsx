import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const MadeInRwanda = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 6);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div className="pb-5 mb-5">
      <div className="w-full flex flex-col mx-auto py-auto ">
        <div className={`${styles.heading}`}>
          <h1>Made in Rwanda</h1>
        </div>

        <div className="flex overflow-x-scroll pb-16 hide-scroll-bar ">
          {data && data.length !== 0 && (
            <div className="flex gap-5">
              {data.map((product, index) => (
                <div
                  key={index}
                  className=" sm:w-40 md:w-60 lg:w-60 h-80  whitespace-normal"
                >
                  <ProductCard data={product} key={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MadeInRwanda;
