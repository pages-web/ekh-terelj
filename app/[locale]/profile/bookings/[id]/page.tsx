"use client";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { format, formatDistance } from "date-fns";
import { useDealDetail, useStages, useTags } from "@/sdk/queries/sales";
import { Loading } from "@/components/ui/loading";
import { useRoomCategories } from "@/sdk/queries/rooms";
import PaymentDetail from "@/components/payment-detail/payment-detail";
import { useEffect } from "react";
import { useChangeStage } from "@/sdk/mutations/sales";
import {
  useInvoiceDetail,
  useInvoiceIdByDealId,
} from "@/sdk/queries/payments";

const OrderDetail = () => {
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
              Booking not found.
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
                  ? "Төлбөр төлөгдөөгүй байна."
                  : "Өрөөний захиалга баталгаажсан байна."}
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
                  <span>Your confirmation code: </span>
                  <span className="font-bold">{dealDetail.number}</span>
                </div>
              </div>
            </div>
          )}

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
                Guests: {firstProductData?.information?.adults ?? 0} adult
                {(firstProductData?.information?.adults ?? 0) > 1 && "s"},{" "}
                {firstProductData?.information?.children ?? 0} child
                {(firstProductData?.information?.children ?? 0) > 1 && "ren"}
              </p>
            </div>

            <Separator />

            <div className="text-textsm flex flex-col gap-6">
              <div className="space-y-2">
                <h2>Check-in:</h2>
                <p className="font-bold">
                  {firstProductData?.startDate &&
                    format(firstProductData.startDate, "PPP")}
                </p>
              </div>
              <div className="space-y-2">
                <h2>Check-out:</h2>
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
                      {rooms.length >= 1 && "Room " + (index + 1) + ": "}
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
              <span>Price:</span>
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
