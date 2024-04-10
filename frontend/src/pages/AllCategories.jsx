import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ForYou from "../components/Route/categoriesSections/ForYou";
import Footer from "../components/Layout/Footer";

const AllCategories = () => {
  const { isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={6} />
          <br />
          <br />
          <ForYou />
          <Footer />
        </div>
      )}
    </>
  );
};

export default AllCategories;
