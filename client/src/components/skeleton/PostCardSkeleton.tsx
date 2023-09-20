const PostCardSkeleton = () => {
  return (
    <div>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default PostCardSkeleton;

function Skeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-2 border-b-[1px] p-4 ">
      <div className="w-full flex items-center justify-between">
        <span className="w-full flex gap-2 items-center">
          <div className="w-[30px] h-[30px] rounded-full bg-gray-700" />
          <div className="w-full h-[35px] rounded-lg bg-gray-700" />
        </span>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full h-[300px]  bg-gray-700" />
      </div>
      <div className="h-full flex flex-col justify-between gap-1">
        <div className="w-full h-[35px] rounded-lg bg-gray-700" />
        <span className="flex gap-4">
          <div className="w-[30px] h-[30px] rounded-full bg-gray-700" />
          <div className="w-[30px] h-[30px] rounded-full bg-gray-700" />
        </span>
      </div>
    </div>
  );
}
