import React from "react";
import PropTypes from "prop-types";

// core components
import Header from "../../components/header/header.jsx";
import HeaderBanner from "../../components/banner/banner.jsx";
import Footer from "../../components/footer/footer.jsx";
import BlogComponent from "../custom-components/sections/blogcomponent.jsx";

const Landing = () => {
  return (
    <div id="main-wrapper">
      <Header />
      <div className="page-wrapper">
        <div className="container-fluid">
          <HeaderBanner />
        </div>
      </div>
      <BlogComponent />
      <Footer />
    </div>
  );
};

Landing.propTypes = {
  classes: PropTypes.object,
};

export default Landing;
