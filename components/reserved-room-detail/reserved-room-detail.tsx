"use client";

import { Calendar, CircleAlert, User } from "lucide-react";
import { Button } from "../ui/button";
import Image from "../ui/image";
import { Separator } from "../ui/separator";
import { ReactNode } from "react";
import IconWithTitle from "../icon-with-title/icon-with-title";
import { useAtom } from "jotai";
import {
  reserveCountAtom,
  reserveDateAtom,
  reserveMealTypeAtom,
  selectedRoomAtom,
} from "@/store/reserve";
import { format, formatDistance } from "date-fns";

type TitleWithPrice = {
  title: string;
  price: string;
  desc?: string;
  icon?: ReactNode;
};

type TitleWithIcon = {
  title: string;
  icon: ReactNode;
};

const ReservedRoomDetail = () => {
  const SelectedFieldTitle = ({ title }: { title: string }) => {
    return <p className="text-textxs text-black/60 capitalize">{title}</p>;
  };
  const TitleWithIcon = ({ icon, title }: TitleWithIcon) => {
    return (
      <p className="flex gap-2 items-center text-textsm text-black/60">
        {icon} {title}
      </p>
    );
  };
  const TitleWithPrice = ({ desc, title, price, icon }: TitleWithPrice) => {
    return (
      <div className="flex justify-between">
        <div className="flex flex-col md:gap-1">
          <h2 className="text-textmd flex items-center gap-2">
            {title} {icon}
          </h2>
          {desc && <p className="text-textsm text-black/60">{desc}</p>}
        </div>
        <h2 className="text-textmd">{price}</h2>
      </div>
    );
  };

  const [selectedRoom] = useAtom(selectedRoomAtom);
  const [reserveCount] = useAtom(reserveCountAtom);
  const [date] = useAtom(reserveDateAtom);
  const [mealType] = useAtom(reserveMealTypeAtom);
  const dateDiff = parseInt(date?.from && formatDistance(date?.from, date?.to));
  const totalPrice = selectedRoom.unitPrice * dateDiff;
  const taxes = (totalPrice * 10) / 100;
  const fee = (totalPrice * 2) / 100;

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-displayxs text-black">Your reservation</h1>
      <h1 className="w-[80%] text-textlg leading-6">
        {selectedRoom?.category?.name}
      </h1>

      {/* <div className="flex gap-2 items-center">
        <CircleAlert className="w-4 h-4" />
        <span className="text-textxs">Non-refundable</span>
      </div> */}

      <div className="border p-3 rounded-xl">
        <div className="flex flex-col lg:flex-row justify-between gap-2">
          <div className="space-y-1 w-[70%]">
            <TitleWithIcon
              icon={<User className="w-6 h-6" />}
              title={`Adults: ${reserveCount?.adults}`}
            />
            <TitleWithIcon
              icon={<User className="w-5 h-4" />}
              title={`Children: ${reserveCount?.children}`}
            />
            <TitleWithIcon
              icon={<Calendar className="w-5 h-5" />}
              title={`Check in: ${
                date?.from && format(date?.from, "d/M/yyyy p")
              }`}
            />
            <TitleWithIcon
              icon={<Calendar className="w-5 h-5" />}
              title={`Check out: ${date?.to && format(date?.to, "d/M/yyyy p")}`}
            />
          </div>
          <div className="h-fit w-[30%] overflow-hidden rounded-xl">
            <Image
              src="/images/product.png"
              width={600}
              height={600}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-6 mt-4">
          <div className="space-y-2">
            <SelectedFieldTitle title="Standard Rate" />
            <SelectedFieldTitle title={`${mealType?.mealType} breakfast`} />
          </div>

          <div className="flex flex-col gap-3 md:gap-6">
            <TitleWithPrice
              title="Room price"
              price={`MNT ${selectedRoom?.unitPrice}₮`}
            />
            <div className="space-y-1">
              <TitleWithPrice title="Sub total" price={`MNT ${totalPrice}₮`} />
              <TitleWithPrice title="Taxes" price={`MNT ${taxes}₮`} />
              <TitleWithPrice title="Fees" price={`MNT ${fee}₮`} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-displayxs font-bold">
        <h1 className="uppercase">Total</h1>
        <span className="text-secondary">{`MNT ${
          totalPrice + taxes + fee
        }₮`}</span>
      </div>
    </div>
  );
};
export default ReservedRoomDetail;
