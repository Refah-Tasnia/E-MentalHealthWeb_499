import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import Components from "./views/components/components.jsx";
import CustomComponents from "./views/custom-components/custom-components.jsx";
import HeaderComponent from "./views/custom-components/sections/headercomponent.jsx";
// import Landing from "./views/components/landing.jsx";
import Landing from "./views/components/Landing2.jsx";
import Register from "./views/components/sections/form.jsx";
import LoginForm from "./views/components/sections/login.jsx";
import FeatureComponent from "./views/custom-components/sections/featurecomponent.jsx";
import Home from "./views/components/sections/homepage.jsx";
import BlogPost from "./views/components/sections/Blog/blog.jsx";
import Video from "./views/components/sections/videoCall/video.jsx";
import Room from "./views/components/sections/videoCall/room.jsx";
import Chat from "./components/Chat.jsx";
import AboutUs from "./views/components/sections/aboutus.jsx";
//import { Toaster } from "react-hot-toast";
import PsychologistList from "./views/components/sections/Psys and Users/psych.jsx";
import UserList from "./views/components/sections/Psys and Users/UserList.jsx";
import AdminDashboard from "./views/components/sections/admin/AdminHome.jsx";
import HomeRedirect from "./components/banner/redirect.jsx";
import PsyAdmin from "./views/components/sections/Psys and Users/PsyAdmin.jsx";
import BlogPosts from "./views/components/sections/Blog/blogPosts.jsx";

import HeaderMenu from "./components/header/HeaderMenu.jsx";
import PrescriptionForm from "./views/components/sections/Prescription/presc.jsx";
import PsyHome from "./components/banner/PsyHome.jsx";

var hist = createBrowserHistory();

const App = () => {
  return (
    <BrowserRouter>
      <HeaderMenu />
      <Routes>
        <Route path="/custom-components" element={<CustomComponents />} />
        <Route path="/" element={<Landing />}></Route>

        <Route path="/chat" element={<Chat />}></Route>

        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/homepage" element={<Home />} />

        <Route path="/nav" element={<HeaderComponent />} />

        <Route path="/adminHome" element={<AdminDashboard />} />

        <Route path="/psychologists" element={<PsychologistList />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/VideoHome" element={<Video />} />
        <Route path="/room/:roomId" element={<Room />} />

        <Route path="/blog" element={<BlogPost />} />
        <Route path="/psyAdmin" element={<PsyAdmin />} />
        <Route path="/blogPost" element={<BlogPosts />} />
        <Route path="/presc" element={<PrescriptionForm />} />
        <Route path="/psyHome" element={<PsyHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
