import { Separator } from "@/components/ui/separator";
import {
  LucideMapPin,
  LucideMail,
  LucideLaptop2,
  LucideUser,
  LucideMoon,
} from "lucide-react";

export default function SideBarSkeleton() {
  return (
    <div className="w-1/4 h-[calc(100vh-50px)] md:flex hidden flex-col justify-between">
      <div className="animate-pulse w-max py-1 px-2">
        <div className="flex gap-2 items-center py-2">
          <div className="w-[35px] h-[35px] rounded-full bg-gray-700" />
          <div className="w-[150px] h-[35px] rounded-lg bg-gray-700" />
        </div>
        <Separator className="my-2" />
        <div className="w-full flex gap-2 items-center py-2">
          <LucideMail size="1.1rem" />
          <div className="w-full h-[20px] bg-gray-700 rounded-md" />
        </div>
        <div className="flex gap-2 items-center py-2">
          <LucideLaptop2 size="1.1rem" />
          <p className="w-full h-[20px] bg-gray-700 rounded-md"></p>
        </div>
        <div className="flex gap-2 items-center py-2">
          <LucideMapPin size="1.1rem" />
          <p className="w-full h-[20px] bg-gray-700 rounded-md"></p>
        </div>
        <Separator className="my-2" />
        <p className="text-muted-foreground text-sm">Settings</p>
        <div className="flex gap-2 items-center py-2">
          <LucideUser size="1.1rem" />
          <div className="w-full h-[20px] bg-gray-700 rounded-md"></div>
        </div>
        <div className="flex gap-2 items-center py-2">
          <LucideMoon size="1.1rem" />
          <div className="w-full h-[20px] bg-gray-700 rounded-md" />
        </div>
        <Separator className="my-2" />
        <p className="text-muted-foreground text-sm">Friends</p>
        <div className="flex gap-2 items-center py-2">
          <div className="w-[30px] h-[25px] rounded-full bg-gray-700" />
          <div className="w-full h-[20px] bg-gray-700 rounded-md" />
        </div>
        <div className="flex gap-2 items-center py-2">
          <div className="w-[30px] h-[25px] rounded-full bg-gray-700" />
          <div className="w-full h-[20px] bg-gray-700 rounded-md" />
        </div>
        <div className="flex gap-2 items-center py-2">
          <div className="w-[30px] h-[25px] rounded-full bg-gray-700" />
          <div className="w-full h-[20px] bg-gray-700 rounded-md" />
        </div>
        <div className="flex gap-2 items-center py-2 mb-4">
          <div className="w-[30px] h-[25px] rounded-full bg-gray-700" />
          <div className="w-full h-[20px] bg-gray-700 rounded-md" />
        </div>
        <div className="flex items-center gap-2 w-[150px] h-[40px] bg-gray-700 rounded-md" />
      </div>
    </div>
  );
}
