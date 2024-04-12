import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import MadeInAfricaFilterPage from "../components/MadeInAfricaProductFilterPage/MadeInAfricaFilters";
import ForYou from "../Route/categoriesSections/ForYou";
import axios from "axios";
import { server } from "../../server";

const AllCategories = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${server}/category/get-all-categories`
        );
        setData(response.data.categories);
        console.log("Categories Data:", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  //    window.scrollTo(0,0);

  return (
    <>
      <ForYou />
    </>
  );
};

export default AllCategories;

// useEffect(() => {
//   const allProductsData = allProducts ? [...allProducts] : [];
//   const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out);
//   setData(sortedData);
// }, [allProducts]);
