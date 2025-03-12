import { Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import PrivatePage from "./PrivatePage.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Layout from "../components/layout/index.jsx";
import Groups from "../pages/Groups.jsx";
// import Header from "../components/layout/Header.jsx";
// import Footer from "../components/layout/Footer.jsx";

function RoutePage() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<PrivatePage />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="groups" element={<Groups/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default RoutePage;
