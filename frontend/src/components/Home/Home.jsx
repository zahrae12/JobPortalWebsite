import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItworks from "./HowItworks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
const Home = () => {
  // const { isAuthorized } = useContext(Context);
  // if (!isAuthorized) {
  //   return <Navigate to={"/login"} />;
  // }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItworks/>
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;