import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import Components from "./views/components/components.jsx";
import CustomComponents from "./views/custom-components/custom-components.jsx";
import Landing from "./views/components/landing.jsx";
import Register from "./views/components/sections/form.jsx";
import LoginForm from "./views/components/sections/login.jsx";
import FeatureComponent from "./views/custom-components/sections/featurecomponent.jsx";
import Home from "./views/components/sections/homepage.jsx";
import BlogComponent from "./views/custom-components/sections/blogcomponent.jsx";
var hist = createBrowserHistory();

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/custom-components" element={<CustomComponents />} />
        <Route path="/" element={<Landing />}></Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/blog" element={<BlogComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
