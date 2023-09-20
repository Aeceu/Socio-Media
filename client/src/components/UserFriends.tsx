import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DataStore from "@/hooks/DataStore";
import { LucideUserMinus } from "lucide-react";
import axios from "axios";

const UserFriends = () => {
  const userdata = DataStore((state) => state.userdata);
  const userFriends = DataStore((state) => state.userFriends);
  const getUserFriends = DataStore((state) => state.getUserFriends);

  useEffect(() => {
    if (userdata) {
      getUserFriends(userdata._id);
    }
  }, []);

  return (
    <div className="">
      {userFriends && userFriends?.length > 0 ? (
        userdata &&
        userFriends.map((friend) => (
          <Friend
            key={friend._id}
            url={friend.profile.url}
            email={friend.email}
            userID={userdata?._id}
            friendID={friend._id}
          />
        ))
      ) : (
        <h1 className="text-sm text-emerald-500 w-full text-center p-4">
          No friends...
        </h1>
      )}
    </div>
  );
};

export default UserFriends;

type Props = {
  url: string;
  email: string;
  userID: string;
  friendID: string;
};
function Friend({ url, email, userID, friendID }: Props) {
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
    <div className="flex items-center justify-between py-2">
      <span className="flex gap-2">
        <Avatar className="w-[25px] h-[25px]">
          <AvatarImage src={url} alt="userlogo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground lg:text-base md:text-sm text-xs sm:flex hidden">
          {email}
        </p>
      </span>
      <LucideUserMinus
        size="1.1rem"
        onClick={handleAddRemoveFriend}
        className="cursor-pointer hover:scale-125 hover:text-emerald-500 transition-all"
      />
    </div>
  );
}
