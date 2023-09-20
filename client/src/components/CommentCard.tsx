import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  comments: {
    comment: string;
    commentor: {
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
  };
};

export default function CommentCard({ comments }: Props) {
  return (
    <div className="flex gap-4 border-b-[1px]  p-4">
      <Avatar className="w-[30px] h-[30px]">
        <AvatarImage src={comments.commentor.profile.url} alt="userlogo" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full flex flex-col">
        <h1 className="font-bold text-lg">
          {comments.commentor.firstname} {comments.commentor.lastname}
        </h1>
        <div className="h-full flex flex-col justify-between gap-1">
          <h1 className="text-md  ">{comments.comment}</h1>
        </div>
      </div>
    </div>
  );
}
