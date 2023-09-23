import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";

// * layout of page
// ? put navigationbar, header,footer and outlet here
export default function Layout() {
  return (
    <div className="w-full min-h-screen  flex max-md:flex-col-reverse flex-col justify-between">
      <NavBar />
      <div className="w-full min-h-screen flex justify-between">
        <SideBar />
        <Outlet />
        <SearchBar />
      </div>
    </div>
  );
}
