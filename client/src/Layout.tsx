import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import { Toaster } from "react-hot-toast";

// * layout of page
// ? put navigationbar, header,footer and outlet here
export default function Layout() {
  return (
    <div className="w-full min-h-screen  flex max-md:flex-col-reverse flex-col justify-between">
      <Toaster />
      <NavBar />
      <div className="w-full min-h-screen flex justify-between">
        <SideBar />
        <Outlet />
        <SearchBar />
      </div>
    </div>
  );
}
