import React from "react";
import { createBrowserHistory } from "history";
import { Route, Routes, HashRouter } from "react-router-dom";
import Components from "./views/components/components.jsx";
import CustomComponents from "./views/custom-components/custom-components.jsx";
import Landing from "./views/components/landing.jsx";

var hist = createBrowserHistory();

const App = () => {
  return (
    <HashRouter history={hist}>
      <Routes>
        <Route path="/custom-components" element={<CustomComponents />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
