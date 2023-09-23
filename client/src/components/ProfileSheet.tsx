/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { LucidePaperclip } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import DataStore from "@/hooks/DataStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { LucideLoader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;
type SheetSide = (typeof SHEET_SIDES)[number];

type Details = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  occupation: string;
  location: string;
  profile: string;
};

const ProfileSheet = ({
  children,
  side,
}: {
  children: React.ReactNode;
  side: SheetSide;
}) => {
  const getData = DataStore((state) => state.getData);
  const userdata = DataStore((state) => state.userdata);
  const [newData, setNewData] = useState<Details>({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    occupation: "",
    location: "",
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

  useEffect(() => {
    if (userdata) {
      setNewData({
        _id: userdata?._id,
        firstname: userdata?.firstname,
        lastname: userdata?.lastname,
        email: userdata?.email,
        occupation: userdata?.occupation,
        location: userdata?.location,
        profile: userdata?.profile.url,
      });
    }
  }, [userdata]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const baseUrl =
        "https://socio-media-fje1.vercel.app" || "http://localhost:3001";
      const res = await axios.post(`${baseUrl}/update-user`, {
        newData,
        file,
      });
      console.log(res.data);
      toast.success(res.data.message, {
        className: "bg-background text-inherit border-2",
      });
      getData();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-4 items-center">
            <Avatar className="w-[70px] h-[70px]">
              <AvatarImage src={userdata?.profile.url} alt="userlogo" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <input
              accept="image/*"
              type="file"
              className=" text-xs border-dashed p-2 border-[1px] rounded-md"
              id="file"
              onChange={handleFile}
            />
          </div>
          <div className="w-full flex gap-2">
            <span>
              <label className="text-xs text-muted-foreground">Firstname</label>
              <Input
                type="text"
                value={newData?.firstname}
                onChange={(e) =>
                  setNewData({ ...newData, firstname: e.target.value })
                }
              />
            </span>
            <span>
              <label className="text-xs text-muted-foreground">Lastname</label>
              <Input
                type="text"
                value={newData?.lastname}
                onChange={(e) =>
                  setNewData({ ...newData, lastname: e.target.value })
                }
              />
            </span>
          </div>
          <span>
            <label className="text-xs text-muted-foreground">Email</label>
            <Input
              type="text"
              value={newData?.email}
              onChange={(e) =>
                setNewData({ ...newData, email: e.target.value })
              }
            />
          </span>
          <span>
            <label className="text-xs text-muted-foreground">Occupation</label>
            <Input
              type="text"
              value={newData?.occupation}
              onChange={(e) =>
                setNewData({ ...newData, occupation: e.target.value })
              }
            />
          </span>
          <span>
            <label className="text-xs text-muted-foreground">Location</label>
            <Input
              type="text"
              value={newData?.location}
              onChange={(e) =>
                setNewData({ ...newData, location: e.target.value })
              }
            />
          </span>
        </div>
        <SheetFooter className="flex flex-row gap-4 items-center">
          <SheetClose asChild>
            <Button>Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button disabled={loading} type="button" onClick={handleSubmit}>
              Save changes
              {loading && (
                <LucideLoader2 size="1rem" className="animate-spin" />
              )}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
