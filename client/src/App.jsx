import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import Components from "./views/components/components.jsx";
import CustomComponents from "./views/custom-components/custom-components.jsx";
import Landing from "./views/components/landing.jsx";
import PageForm from "./views/components/sections/form.jsx";
import LoginForm from "./views/components/sections/login.jsx";
var hist = createBrowserHistory();

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/custom-components" element={<CustomComponents />} />
        <Route path="/" element={<Landing />}></Route>
        <Route path="/register" element={<PageForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
