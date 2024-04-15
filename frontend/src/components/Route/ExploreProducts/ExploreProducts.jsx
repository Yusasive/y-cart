import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 24);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div>
      <div className="w-full mx-auto bg-white">
        <div className={`${styles.heading}`}>
          <h1> Products</h1>
        </div>
        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-4 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-6 xl:gap-[30px] mb-12 border-0 mr-5">
          {data && data.length !== 0 && (
            <>
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
