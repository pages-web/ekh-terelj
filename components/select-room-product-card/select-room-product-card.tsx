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
      <div className="h-[300px] overflow-hidden w-fit rounded-xl relative flex justify-center items-center">
        <Image
          src={room.attachment?.url || ""}
          width={1200}
          height={1200}
          className="h-full group-hover:blur-sm duration-300 brightness-90"
        />
        <span className="absolute text-textxs bg-white/60 py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 duration-300">
          Room details
        </span>
        <h3 className="text-textlg absolute bottom-0 left-0 p-2 text-white font-semibold">
          {category?.name}{" "}
          <span className="font-normal text-textxs">32(m2)</span>
        </h3>
      </div>
      <div className="flex items-start gap-2 border-b ">
        <div className="space-y-2 w-[70%] border-r pr-2 pb-2">
          {/* <h3 className="text-textxs text-black/50">Room description</h3> */}
          {/* <p className="flex text-textsm items-center gap-1">
            <Star className="w-4 h-4 mr-2" />
            4.7 (2,578 Reviews) Room(s): Size:
            <span className="text-black/50 "> 32(m2)</span>
          </p> */}
          <p
            className="h-[106px] text-textsm line-clamp-5 text-black/50"
            dangerouslySetInnerHTML={{ __html: category?.description || "" }}
          ></p>
        </div>
        <div className="flex flex-col gap-2">
          {/* <h3 className="text-textxs text-black/50">Accommodation</h3> */}
          <div className="flex">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-fit flex items-center gap-1">
                  <CircleAlert className="w-4 h-4 text-black/70" />{" "}
                </TooltipTrigger>
                <TooltipContent>2 people size</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <User className="w-5 h-5" />
            <User className="w-5 h-5" />
          </div>

          <Separator />
          <span className="text-textsm text-black/50">Beds: 2</span>
          <div className="flex gap-2">
            <BedDouble className="w-5 h-5" />
            <span className="text-textxs">Queen Size Bed</span>
          </div>
        </div>
      </div>

      {/* <div className="flex gap-2 py-2">
        <BedDouble />
        <span className="text-textsm">Queen Size Bed</span>
      </div> */}

      {/* <Separator /> */}

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
