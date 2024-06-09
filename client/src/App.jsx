import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import Components from "./views/components/components.jsx";
import CustomComponents from "./views/custom-components/custom-components.jsx";
import HeaderComponent from "./views/custom-components/sections/headercomponent.jsx";
import Landing from "./views/components/Landing2.jsx";
import Register from "./views/components/sections/form.jsx";
import LoginForm from "./views/components/sections/login.jsx";
import BlogPost from "./views/components/sections/Blog/blog.jsx";
import Video from "./views/components/sections/videoCall/video.jsx";
import Room from "./views/components/sections/videoCall/room.jsx";
import Chat from "./components/Chat.jsx";
import AboutUs from "./views/components/sections/aboutus.jsx";
import PsychologistList from "./views/components/sections/Psys and Users/psych.jsx";
import UserList from "./views/components/sections/Psys and Users/UserList.jsx";
import AdminDashboard from "./views/components/sections/admin/AdminHome.jsx";
import PsyAdmin from "./views/components/sections/Psys and Users/PsyAdmin.jsx";
import BlogPosts from "./views/components/sections/Blog/blogPosts.jsx";
import HeaderMenu from "./components/header/HeaderMenu.jsx";
import PrescriptionForm from "./views/components/sections/Prescription/presc.jsx";
import PsyHome from "./components/banner/PsyHome.jsx";
import PrescriptionDetailsPage from "./views/components/sections/Prescription/PrescriptionDetailsPage.jsx";
import SearchPage from "./views/components/SearchPage.jsx";
import DetailPage from "./components/DetailPage.jsx";
import PrescriptionListPage from "./views/components/sections/Prescription/PresctiptionListPage.jsx";
import AppointmentList from "./views/components/sections/Psys and Users/Appointment.jsx";
import AppVideo from "./views/components/sections/videoCall/appoint.jsx";

const App = () => {
  const [auth, setAuth] = useState({ userData: {} }); // Initialize userData as an empty object
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/login")
      .then((res) => {
        setAuth(res.data);
      })
      .catch((err) => {
        setError(err);
        console.error("Error fetching session data", err);
      });
  }, []);

  // Check if userData exists before accessing psyID
  const psyID = auth.userData && auth.userData.psyID;

  console.log("psyID in App.jsx:", psyID);

  return (
    <BrowserRouter>
      <HeaderMenu />
      <Routes>
        <Route path="/custom-components" element={<CustomComponents />} />
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
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
        <Route path="/prescriptions" element={<PrescriptionListPage />} />
        <Route
          path="/prescriptions/:id"
          element={<PrescriptionDetailsPage />}
        />
        <Route path="/psyHome" element={<PsyHome />} />
        <Route path="/details/:id" element={<DetailPage />} />
        {/* Pass psyID as a prop to AppointmentList */}
        <Route path="/appoint" element={<AppointmentList psyID={psyID} />} />

        <Route path="/appVideo" element={<AppVideo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
