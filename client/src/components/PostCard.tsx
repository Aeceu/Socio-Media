import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import EditDelete from "./EditDelete";
import DataStore from "@/hooks/DataStore";
import Interaction from "./Interaction";

type Props = {
  post: {
    img: {
      public_url: string;
      url: string;
    };
    _id: string;
    post: string;
    creator: {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      occupation: string;
      location: string;
      profile: {
        public_id: string;
        url: string;
      };
      createdAt: string;
    };
    likes: {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      occupation: string;
      location: string;
      profile: {
        public_id: string;
        url: string;
      };
      createdAt: string;
    }[];
    comments: {
      comment: string;
      commentor: string;
      _id: string;
    }[];
    createAt: string;
  };
};

export default function PostCard({ post }: Props) {
  const userdata = DataStore((state) => state.userdata);

  return (
    <div className="flex flex-col gap-2 border-b-[1px] p-4 ">
      <div className="w-full flex items-center justify-between">
        <span className="flex gap-2 items-center">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src={post.creator.profile.url} alt="userlogo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-bold text-md">{`${post.creator.firstname} ${post.creator.lastname}`}</h1>
        </span>
        {userdata?._id === post.creator._id && <EditDelete post={post} />}
      </div>
      <div className="w-full flex justify-center">
        {post.img && (
          <img
            src={post.img.url}
            alt="img"
            className=" object-contain w-full max-h-[300px]"
          />
        )}
      </div>
      <div className="h-full flex flex-col justify-between gap-1">
        <h1 className="text-md py-2 text-justify">{post.post}</h1>
        {userdata && (
          <Interaction
            postID={post._id}
            userID={userdata._id}
            commentlength={post.comments.length}
          />
        )}
      </div>
    </div>
  );
}
