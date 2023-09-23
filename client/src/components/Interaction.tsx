/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { LucideHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  postID: string;
  userID: string;
  commentlength: number;
};

const Interaction = ({ postID, userID, commentlength }: Props) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isliked, setIsLiked] = useState<boolean | undefined>(false);

  const fetchLikes = async () => {
    try {
      const baseUrl =
        "https://socio-media-fje1.vercel.app" || "http://localhost:3001";
      const res = await axios.post(`${baseUrl}/post/like/`, {
        userID: userID,
        postID,
      });
      setLikeCount(res.data.count);
      setIsLiked(res.data.isLiked);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  const handleLike = async () => {
    try {
      const baseUrl =
        "https://socio-media-fje1.vercel.app" || "http://localhost:3001";
      await axios.post(`${baseUrl}/post/like/${postID}`, {
        likerID: userID,
      });
      // Fetch updated likes and like count
      fetchLikes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-8 ">
      <div
        className={`flex items-center gap-2 cursor-pointer hover:scale-125 transition-all ${
          isliked ? "text-red-500" : ""
        }`}
        onClick={handleLike}
      >
        <LucideHeart size="1rem" />
        <h1 className="text-sm ">{likeCount}</h1>
      </div>
      <Link
        to={`post/${postID}`}
        className="flex items-center gap-2 cursor-pointer hover:scale-125 transition-all text-blue-500"
      >
        <FaRegCommentDots size="1rem" />
        <h1 className="text-sm ">{commentlength}</h1>
      </Link>
    </div>
  );
};

export default Interaction;
