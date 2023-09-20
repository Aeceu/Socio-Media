import DataStore from "@/hooks/DataStore";
import {
  LucideFacebook,
  LucideGithub,
  LucideLinkedin,
  LucideSearch,
  LucideTwitter,
  LucideUserPlus,
} from "lucide-react";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";

const SearchBar = () => {
  const userdata = DataStore((state) => state.userdata);
  const getData = DataStore((state) => state.getData);
  const allUsers = DataStore((state) => state.allUsers);
  const getAllUsers = DataStore((state) => state.getAllUsers);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch user data
      await getData();
    };

    fetchData();
  }, [getData]);

  useEffect(() => {
    if (userdata) {
      // Fetch all users when userdata is available
      getAllUsers(userdata._id);
    }
  }, [userdata, getAllUsers]);

  return (
    <div className="lg:inline hidden w-1/4 overflow-y-scroll h-screen">
      <div className="p-4 flex flex-col  items-center justify-center gap-4">
        <span className="w-full border-[1px] rounded-full px-2 py-1.5 flex gap-2 items-center">
          <LucideSearch size="1.1rem" className="text-emerald-500" />
          <input
            type="text"
            placeholder="Search here"
            className="w-full outline-none bg-inherit text-sm"
          />
        </span>
        <Socials />
        <div className="p-4 w-full flex flex-col gap-2  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100/30">
          <h1 className="text-emerald-500 font-bold text-xl">Users:</h1>
          {allUsers &&
            userdata &&
            allUsers.map((user) => (
              <Card
                key={user._id}
                url={user.profile.url}
                email={user.email}
                userID={userdata?._id}
                friendID={user._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

type Props = {
  url: string;
  email: string;
  userID: string;
  friendID: string;
};

function Card({ url, email, userID, friendID }: Props) {
  const getUserFriends = DataStore((state) => state.getUserFriends);
  const getAllUsers = DataStore((state) => state.getAllUsers);

  const handleAddRemoveFriend = async () => {
    try {
      const res = await axios.post("http://localhost:3001/user/addfriend", {
        userID,
        friendID,
      });
      console.log(res.data);
      getUserFriends(userID);
      getAllUsers(userID);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between py-2">
      <span className="flex gap-2">
        <Avatar className="w-[25px] h-[25px]">
          <AvatarImage src={url} alt="userlogo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground lg:text-base md:text-sm text-xs sm:flex hidden">
          {email}
        </p>
      </span>
      <LucideUserPlus
        onClick={handleAddRemoveFriend}
        size="1.1rem"
        className="cursor-pointer hover:scale-125 hover:text-emerald-500 transition-all"
      />
    </div>
  );
}

function Socials() {
  const links = [
    {
      url: "/",
      provider: "Github",
      icon: <LucideGithub size="1.1rem" className="text-emerald-500" />,
    },
    {
      url: "/",
      provider: "Facebook",
      icon: <LucideFacebook size="1.1rem" className="text-emerald-500" />,
    },
    {
      url: "/",
      provider: "Twitter",
      icon: <LucideTwitter size="1.1rem" className="text-emerald-500" />,
    },
    {
      url: "/",
      provider: "Linkedin",
      icon: <LucideLinkedin size="1.1rem" className="text-emerald-500" />,
    },
  ];
  return (
    <div className="flex flex-col gap-2 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100/30 p-4">
      <p className="text-emerald-500 font-bold text-xl">Socials</p>
      {links.map((link, i) => (
        <div
          className="flex gap-2 items-center py-2 hover:scale-110 hover:text-emerald-500 transition-all cursor-pointer text-muted-foreground "
          key={i}
        >
          {link.icon}
          <p className="lg:text-base  text-xs ">{link.provider}</p>
        </div>
      ))}
    </div>
  );
}
