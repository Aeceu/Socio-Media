import { useNavigate } from "react-router-dom";
import {
  LucideHome,
  LucideUser,
  LucideMoon,
  LucideSearch,
  LucideSun,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DataStore from "@/hooks/DataStore";
import ProfileSheet from "./ProfileSheet";
import { useTheme } from "./ThemeToggle";

const NavBar = () => {
  const navigate = useNavigate();
  const userdata = DataStore((state) => state.userdata);
  const { setTheme, theme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <nav className="fixed md:hidden w-full h-[50px] flex items-center justify-between px-24  border-y-[1px] text-inherit z-50 bg-background ">
      {/* Mobile view */}
      <div className="w-full  flex gap-4 items-center justify-between ">
        <Avatar className="w-[30px] h-[30px] cursor-pointer">
          <AvatarImage src={userdata?.profile.url} alt="userlogo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <LucideHome onClick={() => navigate("/")} className="cursor-pointer" />
        <ProfileSheet side="bottom">
          <LucideUser className="cursor-pointer" />
        </ProfileSheet>
        <div
          className="flex gap-2 items-center py-2 cursor-pointer"
          onClick={handleTheme}
        >
          {theme === "dark" ? <LucideMoon /> : <LucideSun />}
        </div>
        <LucideSearch className="cursor-pointer" />
      </div>
    </nav>
  );
};

export default NavBar;
