import { Switch } from "./ui/switch";
import { useTheme } from "./ThemeToggle";
import { LucideMoon } from "lucide-react";

export default function ThemeButton() {
  const { setTheme, theme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex gap-2 items-center py-2">
      <LucideMoon size="1.1rem" className="text-emerald-500" />
      <p className="lg:text-base md:text-sm text-xs sm:flex hidden text-muted-foreground">
        DarkMode
      </p>
      <Switch onClick={handleTheme} className="outline-none" />
    </div>
  );
}
