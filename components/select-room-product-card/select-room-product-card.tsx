import { BedDouble, CircleAlert, User } from "lucide-react";
import Image from "../ui/image";
import { Separator } from "../ui/separator";

const SelectRoomProductCard = () => {
  return (
    <div className="text-start space-y-3 cursor-pointer group">
      <div className="h-[300px] overflow-hidden w-fit rounded-xl relative flex justify-center items-center">
        <Image
          src="/images/product.png"
          width={1200}
          height={1200}
          className="h-full group-hover:blur-sm duration-300 brightness-90"
        />
        <span className="absolute text-textxs bg-white/60 py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 duration-300">
          Room details
        </span>
        <h3 className="text-textlg absolute bottom-0 left-0 p-2 text-white font-semibold">
          Duxton Room Twin
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
          <p className="text-textsm line-clamp-6">
            Luxury eco-certified hotel refurbished in 2019 and located near
            Sükhbaatar Square located close to National Academic Theatre of
            Opera and Ballet of Mongolia and The Fine Arts Zanabazar Museum,
            Kempinski Hotel Khan Palace provides a shopping mall on site, a hair
            salon, and dry cleaning/laundry services. Treat yourself to
            reflexology, a manicure/pedicure, or aromatherapy at Kempinski Aster
            Spa, the onsite spa. Enjoy Japanese cuisine and brunch at the two
            onsite restaurants. Stay connected with free in-room WiFi, and
            guests can find other amenities such as a bar and a 24-hour gym.
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
        <span className="text-textxs w-16">140.00USD per night</span>
        <span className="text-textlg font-bold">USD 140.00</span>
      </div>
    </div>
  );
};
export default SelectRoomProductCard;
