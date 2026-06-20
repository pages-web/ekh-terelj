"use client";
import BookingLayout from "../../booking-layout";
import { useAtomValue, useSetAtom } from "jotai";
import { reserveDateAtom, reserveGuestAndRoomAtom } from "@/features/booking/store/reserve";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@apollo/client";
import queries from "@/features/booking/lib/gql/queries";
import { useParams } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { format, formatDistance } from "date-fns";
import roomQueries from "@/features/rooms/lib/gql/queries";
import { RESET } from "jotai/utils";
import { formatNumberWithCommas } from "@/lib/utils/format-number";
import { dealIdAtom, selectedRoomsAtom } from "@/features/booking/store/rooms";
import { currentConfigAtom } from "@/constants/config";
import { useLocale, useTranslations } from "next-intl";

const YourDetails = () => {
  const tBooking = useTranslations("Booking");
  const locale = useLocale();
  const params = useParams();
  const currentConfig = useAtomValue(currentConfigAtom);
  const setReserveGuestAndRoom = useSetAtom(reserveGuestAndRoomAtom);
  const setSelectedRooms = useSetAtom(selectedRoomsAtom);
  const setDate = useSetAtom(reserveDateAtom);
  const setDealId = useSetAtom(dealIdAtom);
  const { data: categoriesData } = useQuery(roomQueries.roomCategories, {
    variables: { parentId: currentConfig?.roomCategories[0] },
    skip: !currentConfig,
  });
  const { data } = useQuery(queries.dealFullDetail, {
    variables: {
      _ids: [params.slug],
    },
    skip: !params.slug,
  });
  const categories = categoriesData?.productCategories;
  const deal = data?.cpDeals?.list;
  const products = deal?.products || [];
  const productsData = deal?.productsData || [];
  const firstProductData = productsData[0];
  const getProduct = (productId: string) =>
    products.find((product: any) => product._id === productId);

  const nights =
    parseInt(
      firstProductData?.startDate &&
        firstProductData?.endDate &&
        formatDistance(firstProductData.startDate, firstProductData.endDate),
    ) || 0;
  const rooms = productsData.filter(
    (product: any) => !product.information?.parentId,
  );
  const extras = productsData.filter(
    (product: any) => product.information?.parentId,
  );

  useEffect(() => {
    setSelectedRooms(RESET);
    setReserveGuestAndRoom(RESET);
    setDate(RESET);
    setDealId(RESET);
  }, [setDate, setDealId, setReserveGuestAndRoom, setSelectedRooms]);

  return (
    <BookingLayout currentActive={4}>
      <div className="flex flex-col items-center">
        <div className="w-[80%] space-y-6">
          <div className="border rounded-lg p-6 shadow-md space-y-6">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="w-fit rounded-lg bg-[#dcf6df] border-[#46cb53] text-[#46cb53] flex items-center gap-2 px-5 py-[6px]">
                  <CircleCheck className="h-4 w-4" color="#46cb53" />
                  <p className="w-fit text-[#46cb53] text-textsm">{tBooking("confirmed")}</p>
                </div>
                {/* <div className="flex items-center gap-1 pl-2 text-textxs text-black/60">
                  <Check className="h-4 w-4" color="#46cb53" />
                  <span>We sent your confirmation to </span>
                  <span className="font-bold">{currentUser?.email}</span>
                </div> */}
              </div>

              <div>
                <h1 className="font-bold text-textlg">
                  {tBooking("reservationConfirmed")}
                </h1>
              </div>

              <div>
                <div className="flex gap-2 text-textsm">
                  <span>{tBooking("confirmationCode")}</span>
                  <span className="font-bold">{deal?.number}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 border rounded-lg p-6 shadow-md">
            <h1 className="text-displayxs text-black">
              {tBooking("reservationDetails")}
            </h1>

            <Separator />

            <div>
              <p className="font-bold text-textsm">
                {tBooking("stay", { count: nights })}
              </p>
              <p className="font-bold text-textsm">
                {tBooking("guests")}:{" "}
                {tBooking("adult", { count: firstProductData?.information?.adults ?? 0 })},{" "}
                {tBooking("child", { count: firstProductData?.information?.children ?? 0 })}
              </p>
            </div>

            <Separator />

            <div className="text-textsm flex flex-col gap-6">
              <div className="space-y-2">
                <h2>{tBooking("checkIn")}:</h2>
                <p className="font-bold">
                  {firstProductData?.startDate &&
                    format(firstProductData.startDate, "PPP")}
                </p>
              </div>
              <div className="space-y-2">
                <h2>{tBooking("checkOut")}:</h2>
                <p className="font-bold">
                  {firstProductData?.endDate &&
                    format(firstProductData.endDate, "PPP")}
                </p>
              </div>

              {/* <div className="space-y-2">
                  <h2>Adults:</h2>
                  <p className="font-bold">
                    {firstProductData?.information.adults}
                  </p>
                </div>
                <div className="space-y-2">
                  <h2>Children:</h2>
                  <p className="font-bold">
                    {firstProductData?.information.adults}
                  </p>
                </div> */}
            </div>

            <Separator />

            <div className="space-y-3">
              {rooms?.map((room: any, index: number) => (
                <div key={index} className="space-y-3">
                  <div className="flex gap-4">
                    <h1 className="w-fit font-bold">
                      {rooms.length > 1 && `${tBooking("roomNumber", { index: index + 1 })} `}
                      {
                        categories?.find(
                          (category: any) =>
                            category._id ===
                            (room?.product?.categoryId ||
                              getProduct(room?.productId)?.categoryId),
                        )?.name
                      }
                    </h1>
                  </div>

                  {extras && (
                    <div className="flex gap-4 text-textsm">
                      <div className="w-full flex justify-between">
                        <div className="w-full pl-2 space-y-1">
                          {extras?.map(
                            (extra: any, index: number) =>
                              extra.information?.parentId ===
                                room.productId && (
                                <h2 key={index}>{extra.name},</h2>
                              ),
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
              <span>{tBooking("price")}:</span>
              <span>
                {formatNumberWithCommas(
                  productsData.reduce(
                    (acc: any, item: any) =>
                      acc +
                      (item.amount ||
                        (item.product?.unitPrice ||
                          getProduct(item.productId)?.unitPrice ||
                          0) * item.quantity ||
                        0),
                    0,
                  ),
                  locale,
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
