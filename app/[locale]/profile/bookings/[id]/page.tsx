"use client";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { format, formatDistance } from "date-fns";
import { useDealDetail, useStages, useTags } from "@/features/booking/hooks/sales";
import { Loading } from "@/components/ui/loading";
import { useRoomCategories } from "@/features/rooms/hooks/rooms";
import PaymentDetail from "@/features/payments/components/payment-detail/payment-detail";
import { useEffect } from "react";
import { useChangeStage } from "@/features/booking/hooks/sales-mutations";
import {
  useInvoiceDetail,
  useInvoiceIdByDealId,
} from "@/features/payments/hooks/payments";
import { useTranslations } from "next-intl";

const OrderDetail = () => {
  const tBooking = useTranslations("Booking");
  const params = useParams();
  const { roomCategories } = useRoomCategories();

  const { dealDetail, loading, refetch } = useDealDetail(params.id as string);
  const { handleStageId, stages } = useStages();
  const { tags } = useTags();
  const { handleChangeStage } = useChangeStage(dealDetail);
  const { invoiceId } = useInvoiceIdByDealId(params.id as string);
  const { invoice } = useInvoiceDetail(invoiceId);

  const products = dealDetail?.products || [];
  const productsData = dealDetail?.productsData || [];
  const firstProductData = productsData[0];
  const stageCode = dealDetail?.stageId
    ? handleStageId(dealDetail.stageId)?.code
    : undefined;
  const isPaid = !!dealDetail?.paymentsData || invoice?.status === "paid";
  const isUnconfirmed = stageCode === "unconfirmed" || !isPaid;

  const nights =
    firstProductData?.startDate && firstProductData?.endDate
      ? parseInt(
          formatDistance(firstProductData.startDate, firstProductData.endDate)
        )
      : 0;
  const rooms = productsData.filter(
    (product: any) => !product.information?.parentId
  );
  const getProduct = (productId: string) =>
    products.find((product) => product._id === productId);

  useEffect(() => {
    if (dealDetail && isPaid && stages?.length > 0) {
      const isPrePayment = tags.some(
        (tag) =>
          dealDetail.tagIds?.includes(tag._id) &&
          tag.name.toLowerCase() === "pre payment"
      );
      const targetStageCode = isPrePayment ? "prepay" : "confirmed";
      const targetStageId =
        stages?.find((stage) => stage.code === targetStageCode)?._id || "";

      if (targetStageId && dealDetail.stageId !== targetStageId) {
        handleChangeStage(targetStageId);
      }
    }
  }, [
    dealDetail,
    dealDetail?.paymentsData,
    dealDetail?.stageId,
    dealDetail?.tagIds,
    handleChangeStage,
    invoice?.status,
    isPaid,
    stages,
    tags,
  ]);

  if (loading) {
    return (
      <div className="min-h-screen space-y-3 md:space-y-6 pt-6 md:pt-10 container">
        <Loading />
      </div>
    );
  }

  if (!dealDetail) {
    return (
      <div className="min-h-screen space-y-3 md:space-y-6 pt-6 md:pt-10 container">
        <div className="flex flex-col items-center">
          <div className="w-[80%] border rounded-lg p-6 shadow-md">
            <h1 className="text-textxl font-bold text-center">
              {tBooking("bookingNotFound")}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-3 md:space-y-6 pt-6 md:pt-10 container">
      <div className="flex flex-col items-center">
        <div className="w-[80%] space-y-6">
          <div className="border rounded-lg p-6 shadow-md space-y-6">
            <div className="space-y-3">
              <h1 className="text-textxl font-bold text-center">
                {isUnconfirmed
                  ? tBooking("paymentUnpaid")
                  : tBooking("roomReservationConfirmed")}
              </h1>

              {!isPaid && (
                <div className="flex justify-end">
                  <PaymentDetail refetch={refetch} dealDetail={dealDetail} />
                </div>
              )}
            </div>
          </div>

          {isPaid && (
            <div className="border rounded-lg p-6 shadow-md space-y-6">
              <div className="space-y-3">
                <div className="flex gap-2 text-textsm">
                  <span>{tBooking("confirmationCode")}</span>
                  <span className="font-bold">{dealDetail.number}</span>
                </div>
              </div>
            </div>
          )}

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
            </div>

            <Separator />

            <div className="space-y-3">
              {rooms.map((room, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex gap-4">
                    <h1 className="w-fit font-bold">
                      {rooms.length >= 1 && `${tBooking("roomNumber", { index: index + 1 })} `}
                      {
                        roomCategories?.find(
                          (category) =>
                            category._id ===
                            (room.product?.categoryId ||
                              getProduct(room.productId)?.categoryId)
                        )?.name
                      }
                    </h1>
                  </div>

                  {/* {extras && (
                      <div className="flex gap-4 text-textsm">
                        <div className="w-full flex justify-between">
                          <div className="w-full pl-2 space-y-1">
                            {extras?.map(
                              (extra: any, index: number) =>
                                extra.information.parentId ===
                                  room.product._id && (
                                  <h2 key={index}>{extra.name},</h2>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    )} */}
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
                {productsData
                  .reduce((acc, item) => acc + item.amount, 0)
                  .toLocaleString()}
                ₮
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
