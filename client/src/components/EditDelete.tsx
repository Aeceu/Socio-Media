import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideLoader2, LucideMoreHorizontal } from "lucide-react";
import EditPopUp from "./EditPopUp";
import DataStore from "@/hooks/DataStore";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

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
    createAt: string;
  };
};

const EditDelete = ({ post }: Props) => {
  const getAllPosts = DataStore((state) => state.getAllPost);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:3001/post/delete/${post._id}`
      );
      toast.success(res.data.message, {
        className: "bg-background text-inherit border-2",
      });
      getAllPosts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LucideMoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <EditPopUp post={post} />
        <DropdownMenuItem
          className="text-rose-500 text-sm flex items-center gap-2"
          onClick={handleDelete}
        >
          {loading ? (
            <span className="text-sm flex items-center gap-2">
              <h1>deleting</h1>
              <LucideLoader2 size="1rem" className="animate-spin" />
            </span>
          ) : (
            "Delete"
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditDelete;
