import React from "react";
import PropTypes from "prop-types";

// core components
import Header2 from "../../../components/header/header2.jsx";
import BannerHome from "../../../components/banner/bannerHome.jsx";
import Footer from "../../../components/footer/footer.jsx";
import BlogComponent from "../../custom-components/sections/blogcomponent.jsx";

const Landing = () => {
  return (
    <div id="main-wrapper">
      <Header2 />
      <div className="page-wrapper">
        <div className="container-fluid">
          <BannerHome />
        </div>
      </div>

      <Footer />
    </div>
  );
};

Landing.propTypes = {
  classes: PropTypes.object,
};

export default Landing;
