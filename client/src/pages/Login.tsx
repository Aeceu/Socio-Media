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
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useTheme } from "@/components/ThemeToggle";
//, LucideEye, LucideEyeOff
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3001/login", formData);
      toast.success(res.data.message, {
        className: "bg-background text-inherit border-2",
      });
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const { setTheme, theme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <div className="filter blur-3xl opacity-50 bg-rose-900  rounded-full w-[1000px] h-[300px] absolute  animate-blob animation-delay-2000 -top-20" />
      <div className="filter blur-3xl opacity-50 bg-fuchsia-500  rounded-full w-[500px] h-[500px] rotate-45 absolute animate-blob -left-20 -bottom-20" />
      <div className="filter blur-3xl opacity-50 bg-indigo-500  rounded-full w-[500px] h-[500px] rotate-45 absolute   animate-blob animation-delay-4000 -right-20 -bottom-20" />

      <div className=" flex items-center justify-center gap-24 px-4 py-16 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100/30">
        <div className="w-[45%] md:flex hidden flex-col ">
          <h1 className={`text-cursive text-8xl text-emerald-500`}>
            Socio Media
          </h1>
          <p className="text-lg ">
            Unlock a World of Interactions - Welcome to Social Media: Your
            Gateway to Global Networking.
          </p>
          <h1 className="text-lg mt-4 hover:underline hover:text-emerald-600 cursor-pointer">
            Support my socials:
          </h1>
          <div className="flex gap-2 py-2">
            <Link
              to="https://github.com/kaneki081"
              className="hover:text-emerald-500 "
            >
              <FaGithub size="1.5rem" />
            </Link>
            <Link
              to="https://www.linkedin.com/in/jose-acebuche-4a5b851b5/"
              className="hover:text-emerald-500 "
            >
              <FaLinkedin size="1.5rem" />
            </Link>
            <Link
              to="https://www.facebook.com/Aeceuuu"
              className="hover:text-emerald-500 "
            >
              <FaFacebook size="1.5rem" />
            </Link>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" flex items-center justify-center"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-cursive text-emerald-500 flex gap-4 items-center ">
                Login your account
                <div
                  className="flex gap-2 items-center py-2 cursor-pointer"
                  onClick={handleTheme}
                >
                  {theme === "dark" ? <LucideMoon /> : <LucideSun />}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 w-full ">
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
                className=""
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
