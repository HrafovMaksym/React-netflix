import React from "react";
import Header from "../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import { isAllMoviePage } from "../redux/Slices/Filtrarion/Pagination";

const Headerlayout = () => {
  const isCurrentPage = useSelector(isAllMoviePage);

  const location = useLocation();
  return (
    <>
      {isCurrentPage > 500 ? "" : <Header />}
      <Outlet />
      {location.pathname == "/Home/MyList" ? "" : <Footer />}
    </>
  );
};

export default Headerlayout;
