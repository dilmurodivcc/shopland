import { Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import PrivatePage from "./PrivatePage.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";

function RoutePage() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<PrivatePage />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default RoutePage;
