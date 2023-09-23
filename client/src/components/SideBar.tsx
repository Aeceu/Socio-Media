import { Separator } from "@/components/ui/separator";
import {
  LucideMapPin,
  LucideMail,
  LucideLaptop2,
  LucideUser,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogOut from "@/components/LogOut";
import ThemeButton from "@/components/ThemeButton";
import DataStore from "@/hooks/DataStore";
import { useEffect } from "react";
import ProfileSheet from "./ProfileSheet";
import SideBarSkeleton from "./skeleton/SideBarSkeleton";
import UserFriends from "./UserFriends";

const SideBar = () => {
  const userdata = DataStore((state) => state.userdata);
  const getData = DataStore((state) => state.getData);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, [getData]);

  if (!userdata) {
    return <SideBarSkeleton />;
  }

  return (
    <div className="z-50 w-1/4 min-h-screen md:flex hidden flex-col  justify-between p-4">
      <div className=" h-full  ">
        <div className="flex gap-2 items-center py-2 ">
          <Avatar className="w-[35px] h-[35px]">
            <AvatarImage
              src={userdata?.profile.url}
              alt="userlogo"
              className="object-fit"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="lg:text-xl md:text-md  sm:flex hidden">{`${userdata?.firstname} ${userdata?.lastname}`}</h1>
        </div>
        <Separator className="my-2" />
        <div className="flex gap-2 items-center py-2">
          <LucideMail size="1.1rem" className="text-emerald-500" />
          <p className="text-muted-foreground lg:text-base md:text-sm text-xs sm:flex hidden">
            {userdata?.email}
          </p>
        </div>
        <div className="flex gap-2 items-center py-2">
          <LucideLaptop2 size="1.1rem" className="text-emerald-500" />
          <p className="text-muted-foreground lg:text-base md:text-sm text-xs sm:flex hidden">
            {userdata?.occupation}
          </p>
        </div>
        <div className="flex gap-2 items-center py-2">
          <LucideMapPin size="1.1rem" className="text-emerald-500" />
          <p className="text-muted-foreground lg:text-base md:text-sm text-xs sm:flex hidden">
            {userdata?.location}
          </p>
        </div>
        <Separator className="my-2" />
        <p className="text-muted-foreground text-sm">Settings</p>
        <ProfileSheet side="left">
          <div className="flex gap-2 items-center py-2 cursor-pointer hover:bg-accent rounded-md">
            <LucideUser size="1.1rem" className="text-emerald-500" />
            <p className="text-muted-foreground lg:text-base md:text-sm text-xs sm:flex hidden">
              Profile
            </p>
          </div>
        </ProfileSheet>
        <ThemeButton />
        <Separator className="my-2" />
        <p className="text-muted-foreground text-sm">Friends</p>
        <UserFriends />
      </div>
      <LogOut />
    </div>
  );
};

export default SideBar;
