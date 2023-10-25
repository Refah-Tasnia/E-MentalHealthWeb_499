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
import Video from "./views/components/sections/videoCall/video.jsx";
import Room from "./views/components/sections/videoCall/room.jsx";
import Chat from "./components/Chat.jsx";
import AboutUs from "./views/components/sections/aboutus.jsx";

var hist = createBrowserHistory();

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/custom-components" element={<CustomComponents />} />
        <Route path="/" element={<Landing />}></Route>

        <Route path="/chat" element={<Chat />}></Route>

        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/blog" element={<BlogComponent />} />
        <Route path="/VideoHome" element={<Video />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
