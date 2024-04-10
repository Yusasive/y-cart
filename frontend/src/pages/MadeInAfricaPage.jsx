import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import MadeInAfricaFilterPage from "../components/MadeInAfricaProductFilterPage/MadeInAfricaFilters";

const MadeInAfricaPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {allProducts,isLoading} = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [allProducts]);

  return (
  <>
  {
    isLoading ? (
      <Loader />
    ) : (
      <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <MadeInAfricaFilterPage/>
      <Footer />
    </div>
    )
  }
  </>
  );
};

export default MadeInAfricaPage;










  // useEffect(() => {
  //   const allProductsData = allProducts ? [...allProducts] : [];
  //   const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
  //   setData(sortedData);
  // }, [allProducts]);