import React from "react";
import PropTypes from "prop-types";

// core components
import Header2 from "../../../components/header/header2.jsx";
import HeaderBanner from "../../../components/banner/banner.jsx";
import Footer from "../../../components/footer/footer.jsx";
import Header from "../../../components/header/header.jsx";
import BannerHome from "../../../components/banner/bannerHome.jsx";
const Home = () => {
  return (
    <div id="main-wrapper">
      <div className="page-wrapper">
        <Header2 />
        <div className="container-fluid">
          <BannerHome />
        </div>
      </div>

      <Footer />
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object,
};

export default Home;
