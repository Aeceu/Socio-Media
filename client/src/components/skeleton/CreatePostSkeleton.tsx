export default function CreatePostSkeleton() {
  return (
    <div className="flex flex-col  border-b-[1px] p-2">
      <div className="flex gap-2 animate-pulse">
        <div className="w-[30px] h-[30px] rounded-full bg-gray-700" />
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-[35px] rounded-lg bg-gray-700" />

          <div className="flex gap-2 justify-between items-center">
            <div className="w-full h-[35px] rounded-lg bg-gray-700"></div>
            <div className="w-2/5 h-[35px] rounded-lg bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
