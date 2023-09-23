/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useAutosizeTextArea from "./useAutosizeTextArea";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import DataStore from "@/hooks/DataStore";
import { LucideLoader2 } from "lucide-react";

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

export default function EditPopUp({ post }: Props) {
  const getAllPost = DataStore((state) => state.getAllPost);
  const [loading, setLoading] = useState(false);

  const [newPost, setNewPost] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textareaRef.current, post.post);

  useEffect(() => {
    setNewPost(post.post);
  }, []);

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setNewPost(e.target.value);
  }

  //? this handle files if user wants to change image
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setFile(reader.result);
      };
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const baseUrl =
        "https://socio-media-fje1.vercel.app" || "http://localhost:3001";
      const res = await axios.post(`${baseUrl}/post/update/${post._id}`, {
        newPost,
        file,
      });
      console.log(res.data);
      getAllPost();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-sm text-green-500 w-full text-center hover:bg-accent py-1 rounded-sm">
        Edit
      </DialogTrigger>
      <DialogContent className="overflow-scroll">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Avatar className="w-[30px] h-[30px]">
              <AvatarImage src={post.creator.profile.url} alt="userlogo" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {`${post.creator.firstname} ${post.creator.lastname}`}
          </DialogTitle>
          <DialogDescription className="flex flex-col">
            <textarea
              ref={textareaRef}
              className="w-full bg-inherit outline-none
          border-b-[1px] resize-none text-md p-2"
              placeholder="write your post here"
              cols={50}
              rows={1}
              value={newPost}
              onChange={handleInputChange}
            />
            {post.img && (
              <img
                src={post.img.url}
                alt="img"
                className="h-[150px] object-cover "
              />
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <input
            accept="image/*"
            type="file"
            className=" text-xs border-dashed p-2 border-[1px] rounded-md"
            id="file"
            onChange={handleFile}
          />
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit} className="">
              {loading ? (
                <h1 className="text-sm flex items-center gap-2">
                  saving
                  <LucideLoader2 size="1rem" className="animate-spin" />
                </h1>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
