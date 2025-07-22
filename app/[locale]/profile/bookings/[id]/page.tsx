"use client";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { format, formatDistance } from "date-fns";
import { useDealDetail, useStages } from "@/sdk/queries/sales";
import { Loading } from "@/components/ui/loading";
import { useRoomCategories } from "@/sdk/queries/rooms";
import PaymentDetail from "@/components/payment-detail/payment-detail";
import { useEffect } from "react";
import { useChangeStage } from "@/sdk/mutations/sales";

const OrderDetail = () => {
  const params = useParams();
  const { roomCategories } = useRoomCategories();

  const { dealDetail, loading, refetch } = useDealDetail(params.id as string);
  const { handleStageId, stages } = useStages();
  const { handleChangeStage } = useChangeStage(dealDetail);

  const deal = dealDetail;

  const nights = parseInt(
    dealDetail?.products[0].startDate &&
      dealDetail?.products[0].endDate &&
      formatDistance(
        dealDetail?.products[0].startDate,
        dealDetail?.products[0].endDate
      )
  );
  const rooms = dealDetail?.products.filter(
    (product: any) => !product.information.parentId
  );
  const extras = dealDetail?.products.filter(
    (product: any) => product.information.parentId
  );

  useEffect(() => {
    if (!!dealDetail?.paymentsData && stages?.length > 0) {
      const futureStageId =
        stages?.find((stage) => stage.code === "future")?._id || "";

      handleChangeStage(futureStageId);
    }
  }, [dealDetail?.paymentsData, stages]);

  return (
    <div className="min-h-screen space-y-3 md:space-y-6 pt-6 md:pt-10 container">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-[80%] space-y-6">
            <div className="border rounded-lg p-6 shadow-md space-y-6">
              <div className="space-y-3">
                <h1 className="text-textxl font-bold text-center">
                  {handleStageId(dealDetail.stageId)?.code === "unconfirmed"
                    ? "Төлбөр төлөгдөөгүй байна."
                    : "Өрөөний захиалга баталгаажсан байна."}
                </h1>

                {!dealDetail.paymentsData && (
                  <div className="flex justify-end">
                    <PaymentDetail refetch={refetch} dealDetail={dealDetail} />
                  </div>
                )}
              </div>
            </div>

            {!!dealDetail.paymentsData && (
              <div className="border rounded-lg p-6 shadow-md space-y-6">
                <div className="space-y-3">
                  <div className="flex gap-2 text-textsm">
                    <span>Your confirmation code: </span>
                    <span className="font-bold">{deal.number}</span>
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
                  Guests: {dealDetail?.products?.[0]?.information?.adults ?? 0}{" "}
                  adult
                  {(dealDetail?.products?.[0]?.information?.adults ?? 0) > 1 &&
                    "s"}
                  , {dealDetail?.products?.[0]?.information?.children ?? 0}{" "}
                  child
                  {(dealDetail?.products?.[0]?.information?.children ?? 0) >
                    1 && "ren"}
                </p>
              </div>

              <Separator />

              <div className="text-textsm flex flex-col gap-6">
                <div className="space-y-2">
                  <h2>Check-in:</h2>
                  <p className="font-bold">
                    {dealDetail?.products[0].startDate &&
                      format(dealDetail?.products[0].startDate, "PPP")}
                  </p>
                </div>
                <div className="space-y-2">
                  <h2>Check-out:</h2>
                  <p className="font-bold">
                    {dealDetail?.products[0].endDate &&
                      format(dealDetail?.products[0].endDate, "PPP")}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                {rooms?.map((room, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex gap-4">
                      <h1 className="w-fit font-bold">
                        {rooms.length >= 1 && "Room " + (index + 1) + ": "}
                        {
                          roomCategories?.find(
                            (category) =>
                              category._id === room.product.categoryId
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
                  {dealDetail?.products
                    .reduce((acc, item) => acc + item.amount, 0)
                    .toLocaleString()}
                  ₮
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
