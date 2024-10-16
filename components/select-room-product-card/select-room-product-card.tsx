import { BedDouble, CircleAlert, User } from "lucide-react";
import Image from "../ui/image";
import { Separator } from "../ui/separator";
import { IProduct } from "@/types/products";
import { useLocale } from "next-intl";

const SelectRoomProductCard = ({ ...room }: IProduct) => {
  const locale = useLocale();
  const { name, description, unitPrice, attachment } = room;
  return (
    <div className="text-start space-y-3 cursor-pointer group">
      <div className="h-[300px] overflow-hidden w-fit rounded-xl relative flex justify-center items-center">
        <Image
          // src={attachment?.url}
          src="/images/product.png"
          width={1200}
          height={1200}
          className="h-full group-hover:blur-sm duration-300 brightness-90"
        />
        <span className="absolute text-textxs bg-white/60 py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 duration-300">
          Room details
        </span>
        <h3 className="text-textlg absolute bottom-0 left-0 p-2 text-white font-semibold">
          {name}
        </h3>
      </div>
      <div className="flex items-start gap-2 border-b ">
        <div className="space-y-2 w-[70%] border-r pr-2 pb-2">
          <h3 className="text-textxs text-black/50">Room description</h3>
          <p className="flex text-textsm items-center gap-1">
            {/* <Star className="w-4 h-4 mr-2" />
                  4.7 (2,578 Reviews) */}
            Room(s): Size:<span className="text-black/50 "> 32(m2)</span>
          </p>
          <p
            className="text-textsm line-clamp-6 text-black/50"
            // dangerouslySetInnerHTML={{ __html: description || "" }}
          >
            Deluxe Twin Rooms offer stunning skyline views of Ulaanbaatar. The
            rooms are equipped with two queen size beds, lounger chair, work
            desk, 37" Samsung HD TV and bathroom.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-textxs text-black/50">Accommodation</h3>
          <div className="flex items-center gap-1">
            <CircleAlert className="w-4 h-4 text-black/70" />{" "}
            <User className="w-5 h-5" />
          </div>
          <span className="text-textsm text-black/50">Beds: 2</span>
        </div>
      </div>

      <div className="flex gap-2 py-2">
        <BedDouble />
        <span className="text-textsm">Queen Size Bed</span>
      </div>

      <Separator />

      <div className="flex justify-between">
        <span className="text-textsm">
          {/* {locale === "mn"
            ? `${unitPrice}₮`
            : `${Math.round(unitPrice / 3400)}$`}{" "} */}
          {/* {unitPrice / 3400}$ per night */}
          USD 140$ per night
        </span>
        <span className="text-textlg font-bold">
          {/* {locale === "mn"
            ? `${unitPrice}₮ төгрөг`
            : `USD ${Math.round(unitPrice / 3400)}$`} */}
          {/* USD {unitPrice / 3400}$ */}
          USD 140$
        </span>
      </div>
    </div>
  );
};
export default SelectRoomProductCard;
