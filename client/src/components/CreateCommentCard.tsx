import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DataStore from "@/hooks/DataStore";
import axios from "axios";
import { LucideLoader2 } from "lucide-react";
import { useState } from "react";

type Props = {
  postID: string;
};

export default function CreateCommentCard({ postID }: Props) {
  const userdata = DataStore((state) => state.userdata);
  const getAllComments = DataStore((state) => state.getAllComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComment = async () => {
    try {
      setLoading(true);
      const baseUrl =
        "https://socio-media-fje1.vercel.app" || "http://localhost:3001";
      await axios.post(`${baseUrl}/comment`, {
        comment,
        postID,
        userID: userdata?._id,
      });
      getAllComments(postID);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setComment("");
    }
  };

  return (
    <div className="p-4 border-b-[1px] flex gap-2 items-center">
      <Avatar className="w-[30px] h-[30px]">
        <AvatarImage src={userdata?.profile.url} alt="userlogo" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="outline-none w-full p-2 bg-inherit"
        placeholder="write your comment here"
        type="text"
      />
      <Button
        disabled={loading}
        size="sm"
        variant="outline"
        className="rounded-full"
        onClick={handleComment}
      >
        {loading ? (
          <LucideLoader2 size="1rem" className="animate-spin" />
        ) : (
          "Reply"
        )}
      </Button>
    </div>
  );
}
