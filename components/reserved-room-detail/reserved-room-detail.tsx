import { CircleAlert } from "lucide-react";
import { Button } from "../ui/button";
import Image from "../ui/image";
import { Separator } from "../ui/separator";
import { ReactNode } from "react";

type TitleWithCheckin = {
  title: string;
  checkin: string;
};

type TitleWithPrice = {
  title: string;
  price: string;
  desc?: string;
  icon?: ReactNode;
};

const ReservedRoomDetail = () => {
  const TitleWithCheckin = ({ title, checkin }: TitleWithCheckin) => {
    return (
      <div className="flex justify-between text-textsm">
        <div className="flex gap-1">
          <h2 className="font-bold">Room:</h2>
          <span>{title}</span>
        </div>
        <div className="flex gap-1">
          <h2 className="font-bold">Check-in:</h2>
          <span>{checkin}</span>
        </div>
      </div>
    );
  };
  const TitleWithPrice = ({ desc, title, price, icon }: TitleWithPrice) => {
    return (
      <div className="flex justify-between">
        <div className="flex flex-col md:gap-1">
          <h2 className="text-textlg flex items-center gap-2">
            {title} {icon}
          </h2>
          {desc && <p className="text-textsm text-black/60">{desc}</p>}
        </div>
        <h2 className="text-textlg">{price}</h2>
      </div>
    );
  };
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-displayxs text-black">Your reservation</h1>
      <div className="max-h-[300px] w-full overflow-hidden rounded-xl">
        <Image
          src="/images/product.png"
          width={600}
          height={600}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-y-2 md:flex-row justify-between">
        <h1 className="text-textxl md:w-[50%] leading-6">
          Best Western Premier Tuushin Hotel Deluxe Twin Room
        </h1>
        <div className="flex gap-3 items-center">
          <Button variant={"secondary"} className="font-bold h-full">
            8.2
          </Button>
          <div className="leading-none text-center">
            <h2 className="text-textmd font-bold">Very good</h2>
            <span className="text-textxs">(580 reviews)</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <CircleAlert className="w-4 h-4" />
        <span className="text-textxs">Non-refundable</span>
      </div>

      <div>
        <TitleWithCheckin title="1 room" checkin="Tue, Apr 16" />
        <TitleWithCheckin title="1 bed, 2 adults" checkin="Sat, Apr 20" />
      </div>

      <div className="flex flex-col gap-3 md:gap-6 mt-4">
        <h1 className="text-displayxs">Price details</h1>
        <div className="flex flex-col gap-3 md:gap-6">
          <TitleWithPrice
            title="1 room x 4 nights"
            price="1.600.000₮"
            desc="400.000₮ average per night"
          />
          <TitleWithPrice
            title="Taxes and fees"
            price="100.000₮"
            icon={<CircleAlert className="w-6 h-6" />}
          />
          <TitleWithPrice title="Local tax" price="50.000₮" />
        </div>
      </div>
      <Separator />
      <div className="flex justify-between text-displayxs">
        <h1>Total price</h1>
        <span className="text-secondary font-bold">1,750,000₮</span>
      </div>
    </div>
  );
};
export default ReservedRoomDetail;
