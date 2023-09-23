/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LucideLoader2, LucideMoon, LucideSun } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTheme } from "@/components/ThemeToggle";
import LoginBackground from "@/components/LoginBackground";
import LoginInfo from "@/components/LoginInfo";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    profile: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setFile(reader.result);
      };
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/register", {
        data,
        file,
      });
      console.log(response.data);
      navigate("/login");
      toast.success(response.data.message, {
        className: "bg-background text-inherit border-2",
      });
    } catch (error: any) {
      console.log(error.message);
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
      <div className="flex md:flex-row flex-col items-center justify-center md:gap-24 gap-4  p-4  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100/30">
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
                Register an account
                <div
                  className="flex gap-2 items-center py-2 cursor-pointer"
                  onClick={handleTheme}
                >
                  {theme === "dark" ? <LucideMoon /> : <LucideSun />}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 w-full">
              <Input
                value={data.firstname}
                onChange={(e) =>
                  setData({ ...data, firstname: e.target.value })
                }
                placeholder="Firstname"
              />
              <Input
                value={data.lastname}
                onChange={(e) => setData({ ...data, lastname: e.target.value })}
                placeholder="Lastname"
              />
              {/* <label
            htmlFor="file"
            className="text-sm text-muted-foreground w-full border-[1px] rounded-md p-3 cursor-pointer"
          >
            Choose a File
          </label> */}
              <input
                accept="image/*"
                type="file"
                className="text-xs border-dashed p-2 border-[1px] rounded-md"
                id="file"
                onChange={handleFile}
              />
              <Input
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="email"
              />
              <Input
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="password"
                type="password"
              />
              <Input
                value={data.occupation}
                onChange={(e) =>
                  setData({ ...data, occupation: e.target.value })
                }
                placeholder="Occupation"
              />
              <Input
                value={data.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
                placeholder="Location"
              />
              <Button
                disabled={loading}
                type="submit"
                className="font-bold  flex items-center gap-2"
              >
                Register
                {loading && (
                  <LucideLoader2 size="1rem" className="animate-spin" />
                )}
              </Button>
              <span className="text-muted-foreground text-xs text-center">
                Have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Log in
                </Link>
              </span>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
