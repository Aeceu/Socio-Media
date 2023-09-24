import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserPost } from "./pages/UserPost";
import axios from "axios";
import { ProtectedRoutes, PublicRoutes } from "./hooks/ProtectedRoutes";

const App = () => {
  axios.defaults.baseURL = "https://socio-media-fje1.vercel.app";
  axios.defaults.withCredentials = true;
  return (
    <Routes>
      {/* private routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<UserPost />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Route>
      {/* public routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
