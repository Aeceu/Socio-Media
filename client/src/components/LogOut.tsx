import { LucideLogOut } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthStore from "@/hooks/AuthStore";

export default function LogOut() {
  const navigate = useNavigate();
  const setToken = AuthStore((state) => state.setToken);
  const handleLogout = async () => {
    await axios.get("http://localhost:3001/logout");
    setToken("");
    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="flex items-center gap-2 w-max bg-emerald-500"
    >
      Log out
      <LucideLogOut size="1rem" />
    </Button>
  );
}
