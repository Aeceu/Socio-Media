/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LucideLoader2, LucideMoon, LucideSun } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTheme } from "@/components/ThemeToggle";
import LoginBackground from "@/components/LoginBackground";
import LoginInfo from "@/components/LoginInfo";
import AuthStore from "@/hooks/AuthStore";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setToken = AuthStore((state) => state.setToken);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const baseUrl =
        "https://socio-media-fje1.vercel.app" || "http://localhost:3001";
      const res = await axios.post(`${baseUrl}login`, formData);
      toast.success(res.data.message, {
        className: "bg-background text-inherit border-2",
      });
      navigate("/");
      setToken(res.data.token);
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error, {
        className: "bg-background text-inherit border-2",
      });
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const { setTheme, theme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <LoginBackground />
      <div className="flex md:flex-row flex-col items-center justify-center md:gap-24 gap-4  px-8 py-16  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100/30">
        <LoginInfo />
        <h1 className={`md:hidden text-cursive text-4xl text-emerald-500`}>
          Socio Media
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" flex items-center justify-center"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-cursive text-emerald-500 flex gap-4 items-center ">
                Login your account
                <div
                  className="flex gap-2 items-center  cursor-pointer"
                  onClick={handleTheme}
                >
                  {theme === "dark" ? <LucideMoon /> : <LucideSun />}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 w-full ">
              {error && (
                <h1 className="w-full text-center font-bold text-red-500 text-xs">
                  {error}
                </h1>
              )}
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="email"
              />
              <Input
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="password"
                type="password"
                className="relative"
              />
              <Button
                disabled={loading}
                type="submit"
                className="font-bold flex items-center gap-2"
              >
                Log in
                {loading && (
                  <LucideLoader2 size="1rem" className="animate-spin" />
                )}
              </Button>
              <span className="text-muted-foreground text-xs text-center">
                Don't have account?{" "}
                <Link to="/register" className="text-blue-500">
                  Sign up
                </Link>
              </span>
            </CardContent>
            <CardFooter className="w-full flex flex-col"></CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
