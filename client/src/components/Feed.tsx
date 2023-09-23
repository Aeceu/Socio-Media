import DataStore from "@/hooks/DataStore";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { useEffect } from "react";
import CreatePostSkeleton from "./skeleton/CreatePostSkeleton";
import PostCardSkeleton from "./skeleton/PostCardSkeleton";

export default function Feed() {
  const usedata = DataStore((state) => state.userdata);
  const allPost = DataStore((state) => state.allPosts);
  const getAllPost = DataStore((state) => state.getAllPost);

  useEffect(() => {
    setTimeout(() => {
      getAllPost();
    }, 1000);
  }, [getAllPost]);

  return (
    // w-[calc(100vw-250px)]
    <div className="w-full   flex flex-col border-x-[1px]  overflow-y-scroll ">
      <div
        className="py-2 md:py-10 text-center border-b-[1px] sticky top-0
      filter backdrop-blur-md z-50"
      >
        Home
      </div>
      <div className="hidden md:inline w-full">
        {usedata ? (
          <CreatePost img={usedata?.profile.url} userID={usedata?._id} />
        ) : (
          <CreatePostSkeleton />
        )}
      </div>
      <div className="flex flex-col-reverse">
        {allPost?.length === 0 ? (
          <h1 className="w-full text-center p-4">No post available.</h1>
        ) : allPost ? (
          allPost.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <PostCardSkeleton />
        )}
      </div>
    </div>
  );
}
