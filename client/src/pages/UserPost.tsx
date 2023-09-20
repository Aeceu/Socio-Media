import { Link, useParams } from "react-router-dom";
import DataStore from "@/hooks/DataStore";
import { useEffect } from "react";
import PostCard from "@/components/PostCard";
import CreateCommentCard from "@/components/CreateCommentCard";
import CommentCard from "@/components/CommentCard";
import { LucideArrowLeft } from "lucide-react";

const HandleComments = ({ postID }: { postID: string }) => {
  const allComments = DataStore((state) => state.allComments);
  const getAllComments = DataStore((state) => state.getAllComments);

  useEffect(() => {
    getAllComments(postID);
  }, []);
  return (
    <div className="">
      {allComments ? (
        allComments.map((comment, i) => (
          <CommentCard comments={comment} key={i} />
        ))
      ) : (
        <h1>No comments available</h1>
      )}
    </div>
  );
};

export const UserPost = () => {
  const { id } = useParams();
  const userpost = DataStore((state) => state.userpost);
  const getPost = DataStore((state) => state.getPost);

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [getPost, id]);

  return (
    <div className="relative w-full lg:w-1/2 md:h-screen h-[calc(100vh-50px)] flex justify-center ">
      <div className="w-full  flex flex-col border-x-[1px]  overflow-y-scroll ">
        <Link
          to="/"
          className="bg-accent p-2 rounded-full absolute -left-12 top-2 z-50"
        >
          <LucideArrowLeft />
        </Link>
        {userpost && <PostCard post={userpost} />}
        {id && <CreateCommentCard postID={id} />}
        {id && <HandleComments postID={id} />}
      </div>
    </div>
  );
};
