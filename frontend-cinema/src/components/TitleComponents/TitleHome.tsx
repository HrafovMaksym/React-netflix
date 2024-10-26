import React from "react";
import Header from "./TitleHeader/Header";
import Footer from "./TitleFooter/Footer";
import Main from "./TitleMain/Main";

const TitleHome: React.FC = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default TitleHome;
