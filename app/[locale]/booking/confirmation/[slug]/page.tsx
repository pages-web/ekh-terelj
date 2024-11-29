"use client";
import BookingLayout from "../../booking-layout";
import { useRouter } from "@/i18n/routing";
import { useAtom, useSetAtom } from "jotai";
import {
  reserveCompletedAtom,
  reserveCountAtom,
  reserveDateAtom,
  selectedRoomsAtom,
} from "@/store/reserve";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@apollo/client";
import { queries } from "@/sdk/graphql/sales";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/sdk/queries/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, CircleCheck, Terminal } from "lucide-react";
import { format, formatDistance } from "date-fns";
import { queries as roomQueries } from "@/sdk/graphql/rooms";
import { RESET } from "jotai/utils";
import { formatNumberWithCommas } from "@/lib/formatNumber";

const YourDetails = () => {
  const params = useParams();
  const { currentUser } = useCurrentUser();
  const setReserveCount = useSetAtom(reserveCountAtom);
  const setSelectedRooms = useSetAtom(selectedRoomsAtom);
  const setReserveCompleted = useSetAtom(reserveCompletedAtom);
  const setDate = useSetAtom(reserveDateAtom);
  const { data: categoriesData } = useQuery(roomQueries.roomCategories, {
    variables: { parentId: process.env.NEXT_PUBLIC_CATEGORY_ID },
  });
  const { data } = useQuery(queries.dealFullDetail, {
    variables: {
      id: params.slug,
    },
  });
  const categories = categoriesData?.productCategories;
  const deal = data?.dealDetail;
  console.log(deal);

  const nights = parseInt(
    deal?.products[0].startDate &&
      deal?.products[0].endDate &&
      formatDistance(deal?.products[0].startDate, deal?.products[0].endDate)
  );
  const rooms = deal?.products.filter(
    (product: any) => !product.information.parentId
  );
  const extras = deal?.products.filter(
    (product: any) => product.information.parentId
  );

  useEffect(() => {
    setReserveCompleted(false);
    setSelectedRooms(RESET);
    setReserveCount(RESET);
    setDate(RESET);
  }, []);

  return (
    <BookingLayout currentActive={4}>
      <div className="flex flex-col items-center">
        <div className="w-[80%] space-y-6">
          <div className="border rounded-lg p-6 shadow-md space-y-6">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="w-fit rounded-lg bg-[#dcf6df] border-[#46cb53] text-[#46cb53] flex items-center gap-2 px-5 py-[6px]">
                  <CircleCheck className="h-4 w-4" color="#46cb53" />
                  <p className="w-fit text-[#46cb53] text-textsm">Confirmed</p>
                </div>
                <div className="flex items-center gap-1 pl-2 text-textxs text-black/60">
                  <Check className="h-4 w-4" color="#46cb53" />
                  <span>We sent your confirmation to </span>
                  <span className="font-bold">{currentUser?.email}</span>
                </div>
              </div>

              <div>
                <h1 className="font-bold text-textlg">
                  Your reservation confirmed
                </h1>
              </div>

              <div>
                <div className="flex gap-2 text-textsm">
                  <span>Your confirmation code: </span>
                  <span className="font-bold">{params.slug.slice(-9)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant={"secondary"}>Print full version</Button>
              {/* <Button variant={"secondary"}>
                Save your confirmation to phone
              </Button> */}
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 border rounded-lg p-6 shadow-md">
            <h1 className="text-displayxs text-black">
              Your reservation details
            </h1>

            <Separator />

            <div>
              <p className="font-bold text-textsm">
                Stays: {nights} night{nights > 1 && "s"}
              </p>
              <p className="font-bold text-textsm">
                Guests: {deal?.products[0].information.adults} adult
                {deal?.products[0].information.adults > 1 && "s"},{" "}
                {deal?.products[0].information.adults} child
                {deal?.products[0].information.children > 1 && "ren"}
              </p>
            </div>

            <Separator />

            <div className="text-textsm flex flex-col gap-6">
              <div className="space-y-2">
                <h2>Check-in:</h2>
                <p className="font-bold">
                  {deal?.products[0].startDate &&
                    format(deal?.products[0].startDate, "PPP")}
                </p>
              </div>
              <div className="space-y-2">
                <h2>Check-out:</h2>
                <p className="font-bold">
                  {deal?.products[0].endDate &&
                    format(deal?.products[0].endDate, "PPP")}
                </p>
              </div>

              {/* <div className="space-y-2">
                  <h2>Adults:</h2>
                  <p className="font-bold">{deal?.products[0].information.adults}</p>
                </div>
                <div className="space-y-2">
                  <h2>Children:</h2>
                  <p className="font-bold">{deal?.products[0].information.adults}</p>
                </div> */}
            </div>

            <Separator />

            <div className="space-y-3">
              {rooms?.map((room: any, index: number) => (
                <div key={index} className="space-y-3">
                  <div className="flex gap-4">
                    <h1 className="w-fit font-bold">
                      {rooms.length > 1 && "Room " + (index + 1) + ", "}
                      {
                        categories?.find(
                          (category: any) =>
                            category._id === room?.product.categoryId
                        ).name
                      }
                    </h1>
                  </div>

                  {extras && (
                    <div className="flex gap-4 text-textsm">
                      <div className="w-full flex justify-between">
                        <div className="w-full pl-2 space-y-1">
                          {extras?.map(
                            (extra: any, index: number) =>
                              extra.information.parentId ===
                                room.product._id && <h2>{extra.name},</h2>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {rooms.length > 1 && index !== rooms.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-textxl">
              <span>Price:</span>
              <span>
                {formatNumberWithCommas(
                  deal?.products.reduce(
                    (acc: any, item: any) =>
                      acc + item.product.unitPrice * nights,
                    0
                  )
                )}
                ₮
              </span>
            </div>
          </div>
        </div>
      </div>
    </BookingLayout>
  );
};
export default YourDetails;
