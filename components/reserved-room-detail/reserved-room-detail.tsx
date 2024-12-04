"use client";

import { Bed, Calendar, CircleAlert, User } from "lucide-react";
import { Button } from "../ui/button";
import Image from "../ui/image";
import { Separator } from "../ui/separator";
import { ReactNode, useEffect } from "react";
import IconWithTitle from "../icon-with-title/icon-with-title";
import { useAtom, useAtomValue } from "jotai";
import { reserveDateAtom, reserveGuestAndRoomAtom } from "@/store/reserve";
import { format, formatDistance } from "date-fns";
import { useRouter } from "@/i18n/routing";
import { paymentTypeAtom, totalAmountAtom } from "@/store/payments";
import { useStripeCheckout } from "@/hooks/others/use-stripe";
import { formatNumberWithCommas } from "@/lib/formatNumber";
import { selectedRoomsAtom } from "@/store/rooms";

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
  const router = useRouter();
  const [selectedRooms, setSelectedRooms] = useAtom(selectedRoomsAtom);
  const [reserveGuestAndRoom] = useAtom(reserveGuestAndRoomAtom);
  const [date, setDate] = useAtom(reserveDateAtom);
  const paymentType = useAtomValue(paymentTypeAtom);
  const [totalAmount, setTotalAmount] = useAtom(totalAmountAtom);
  // const totalPrice = selectedRoom.unitPrice * dateDiff;
  // const taxes = (totalPrice * 10) / 100;
  // const fee = (totalPrice * 2) / 100;

  const paymentTypeDivider = paymentType === "full" ? 1 : 2;

  const nights = parseInt(
    date?.from && date?.to && formatDistance(date?.from, date?.to)
  );

  useEffect(() => {
    setTotalAmount(
      selectedRooms.reduce(
        (acc, product) => acc + product.room?.unitPrice * nights,
        0
      ) / paymentTypeDivider
    );
  }, [selectedRooms, paymentType]);

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-displayxs text-black">Your reservation</h1>
      {/* <div className="border p-3 rounded-xl">
      <div className="flex flex-col lg:flex-row justify-between gap-2"></div>
      
      <div className="flex flex-col gap-3 md:gap-6 mt-4"></div>
    </div> */}

      <div className="flex flex-col gap-4">
        <div className="border rounded-lg shadow-sm p-4 text-textsm">
          <div className="space-y-4">
            <div className="grid grid-cols-5">
              <div className="col-span-2">
                <h2 className="text-textsm">Check-in</h2>
                <p className="font-bold">
                  {date?.from && format(date?.from, "PPPP")}
                </p>
                <p className="text-black/60 text-textsm">From 15:00</p>
              </div>
              <div className="flex justify-center">
                <Separator orientation="vertical" />
              </div>
              <div className="col-span-2">
                <h2 className="text-textsm">Check-out</h2>
                <p className="font-bold">
                  {date?.to && format(date?.to, "PPPP")}
                </p>
                <p className="text-black/60 text-textsm">Until 11:00</p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="font-bold text-textsm flex gap-1">
                Stays: {nights} night
                {nights > 1 && "s"}
              </p>
              <p className="font-bold text-textsm">
                Guests: {reserveGuestAndRoom.adults} adult
                {reserveGuestAndRoom.adults > 1 && "s"},{" "}
                {reserveGuestAndRoom.children} child
                {reserveGuestAndRoom.adults > 1 && "ren"}
              </p>
            </div>
          </div>
        </div>
        {selectedRooms.map((product, index) => (
          <div
            key={index}
            className="space-y-3 p-4 border rounded-lg shadow-sm"
          >
            <div className="flex gap-4">
              <h1 className="w-20 text-textsm">Room {index + 1}:</h1>
              <div className="w-full flex justify-between">
                <div>
                  <h2>{product.room?.category?.name}</h2>
                  <span className="text-textsm text-black/60">
                    {formatNumberWithCommas(product.room?.unitPrice)}₮ x{" "}
                    {nights} nights
                  </span>
                </div>
                <h2>
                  {formatNumberWithCommas(product.room?.unitPrice * nights)}₮
                </h2>
              </div>
            </div>

            {product.extras && (
              <div className="flex gap-4 text-textsm">
                <h1 className="w-20 text-textsm">Extras:</h1>
                <div className="w-full flex justify-between">
                  <div className="w-full space-y-2">
                    {product.extras?.map((extra, index) => (
                      <div key={index} className="w-full flex justify-between">
                        <h2>{extra.name}</h2>
                        <span>{formatNumberWithCommas(extra.unitPrice)}₮</span>
                      </div>
                    ))}
                    {/* <h2>{product.room?.category?.name}</h2>
                          <span className="text-textsm text-black/60">
                            {product.room?.unitPrice}₮ x {nights} nights
                          </span> */}
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex justify-end gap-1">
              <h2>Total: </h2>
              <h2 className="justify-self-end">
                {product.extras
                  ? formatNumberWithCommas(
                      product.room.unitPrice * nights +
                        product.extras.reduce(
                          (acc, extra) => acc + extra.unitPrice,
                          0
                        )
                    )
                  : formatNumberWithCommas(product.room.unitPrice * nights)}
                ₮
              </h2>
            </div>
          </div>
        ))}
      </div>

      <Separator />
      <div className="flex justify-between text-displayxs font-bold">
        <h1 className="uppercase">Total: </h1>
        <h1>
          {/* {formatNumberWithCommas(
            selectedRooms.reduce(
              (acc, product) => acc + product.room?.unitPrice * nights,
              0
            ) / paymentTypeDivider
          )} */}
          {totalAmount}₮
        </h1>
      </div>
    </div>
  );
};
export default ReservedRoomDetail;
