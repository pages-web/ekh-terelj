import { BedDouble, CircleAlert, Star, User } from "lucide-react";
import Image from "../ui/image";
import { Separator } from "../ui/separator";
import { ICategory, IProduct } from "@/types/products";
import { useLocale } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { formatNumberWithCommas } from "@/lib/formatNumber";

const SelectRoomProductCard = ({ ...room }: IProduct) => {
  const category = room.category;

  return (
    <div className="text-start space-y-3 cursor-pointer group">
      <div className="h-[300px] overflow-hidden rounded-xl relative flex justify-center items-center">
        <div className="w-full h-full">
          <Image
            src={room.attachment?.url || ""}
            width={1200}
            height={1200}
            className="w-full h-full object-cover group-hover:blur-sm duration-300 brightness-90"
          />
        </div>

        <span className="absolute text-textxs bg-white/60 py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 duration-300">
          Room details
        </span>
        <h3
          className={`text-textlg absolute bottom-0 left-0 p-2 ${
            room.attachment?.url ? "text-white" : "text-black"
          } font-semibold`}
        >
          {category?.name}
        </h3>
      </div>

      <div className="flex justify-between">
        <span className="text-textsm">
          {`MNT ${formatNumberWithCommas(room.unitPrice)}₮ per night`}
        </span>
        <span className="text-textlg font-bold">
          {`MNT ${formatNumberWithCommas(room.unitPrice)}₮`}
        </span>
      </div>
    </div>
  );
};
export default SelectRoomProductCard;
