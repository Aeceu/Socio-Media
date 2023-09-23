/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState, useRef } from "react";
import { Button } from "./ui/button";
import useAutosizeTextArea from "./useAutosizeTextArea";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import DataStore from "@/hooks/DataStore";
import { toast } from "react-hot-toast";
import { LucideLoader2 } from "lucide-react";

type Props = {
  img: string;
  userID: string;
};

export default function CreatePost({ userID, img }: Props) {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const getAllPost = DataStore((state) => state.getAllPost);
  useAutosizeTextArea(textareaRef.current, post);

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

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setPost(e.target.value);
  }

  function handleCancel() {
    setPost("");
    setFile(null);
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      const baseUrl =
        "https://socio-media-fje1.vercel.app" || "http://localhost:3001";
      const res = await axios.post(`${baseUrl}/post/${userID}`, {
        post,
        img: file,
      });

      setFile(null);
      setPost("");
      toast.success(res.data.message, {
        className: "bg-background text-inherit border-2",
      });
      getAllPost();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col  border-b-[1px] p-2">
      <div className="flex gap-2 ">
        <Avatar className="w-[30px] h-[30px] my-2 md:flex hidden">
          <AvatarImage src={img} alt="userlogo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full ">
          <textarea
            ref={textareaRef}
            className="w-full bg-inherit outline-none
          border-b-[1px] resize-none text-md p-2"
            placeholder="write your post here"
            cols={50}
            rows={1}
            value={post}
            onChange={handleInputChange}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <input
                accept="image/*"
                type="file"
                className=" text-xs border-dashed p-2 border-[1px] rounded-md"
                id="file"
                onChange={handleFile}
              />
            </div>
            <div className="flex gap-2 justify-end items-center">
              <Button
                onClick={handleCancel}
                size="sm"
                variant="link"
                className="text-sm text-rose-500"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="link"
                className="text-sm"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="text-sm flex items-center gap-2">
                    <h1>posting</h1>
                    <LucideLoader2 size="1rem" className="animate-spin" />
                  </span>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
