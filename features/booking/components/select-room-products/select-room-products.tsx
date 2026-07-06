"use client";

import Image from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ResultRoomPost,
  useResultRooms,
} from "@/features/rooms/hooks/rooms";
import { reserveDateAtom } from "@/features/booking/store/reserve";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { Loading } from "@/components/ui/loading";
import { useSelectRoom } from "@/features/rooms/hooks/room-hooks";
import { useLocale, useTranslations } from "next-intl";
import { formatNumberWithCommas } from "@/lib/utils/format-number";

const stripHtml = (value?: string) =>
  (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const ResultRoomCard = ({ post }: { post: ResultRoomPost }) => {
  const tBooking = useTranslations("Booking");
  const tAccommodation = useTranslations("Accommodation");
  const locale = useLocale();
  const room = post.availableRooms[0];
  const { HandleSelectRoom } = useSelectRoom({ room });
  const imageUrl = post.thumbnail?.url || post.images?.[0]?.url || "";
  const description = stripHtml(post.excerpt || post.content);

  return (
    <div className="h-fit space-y-4 rounded-xl border p-4 shadow-sm">
      <div className="space-y-3">
        <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={post.title || tAccommodation("roomImage")}
            width={1200}
            height={1200}
            className="h-full w-full object-cover brightness-90"
          />
          <h3 className="absolute bottom-0 left-0 p-3 text-textlg font-semibold text-white">
            {post.title}
          </h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-textlg font-semibold text-black">
                {post.title}
              </h3>
              <p className="line-clamp-2 text-textxs text-black/60">
                {description}
              </p>
            </div>
            <Badge variant="outline">
              {tBooking("rooms", {
                count: post.availableRooms.length,
              })}
            </Badge>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-textxs font-medium uppercase tracking-wide text-black/50">
                {tBooking("pricePerNight")}
              </p>
              <p className="text-textsm font-semibold text-black/70">
                {formatNumberWithCommas(room.unitPrice, locale)}₮
              </p>
            </div>
            <span className="text-textlg font-bold text-primary">
              {formatNumberWithCommas(room.unitPrice, locale)}₮
            </span>
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={HandleSelectRoom}>
        {tBooking("book")}
      </Button>
    </div>
  );
};

const SelectRoomProducts = ({ className }: { className?: string }) => {
  const [date] = useAtom(reserveDateAtom);
  const variables = useMemo(
    () => ({ startDate: date?.from, endDate: date?.to }),
    [date?.from, date?.to],
  );
  const { resultRoomsPosts, refetchResultRooms, loading } = useResultRooms({
    variables,
  });

  useEffect(() => {
    if (date?.from && date?.to) {
      refetchResultRooms({
        startDate: date.from,
        endDate: date.to,
      });
    }
  }, [date, refetchResultRooms]);

  if (loading) {
    return (
      <div className="w-full pt-40 flex justify-center font-bold">
        <Loading />
      </div>
    );
  }

  if (resultRoomsPosts.length === 0) {
    return (
      <div className="w-full pt-40 flex justify-center font-bold">
        There are no available rooms for the selected date.
      </div>
    );
  }

  return (
    <div className={`grid lg:grid-cols-2 gap-y-3 gap-x-6 ${className}`}>
      {resultRoomsPosts.map((post) => {
        return <ResultRoomCard key={post._id} post={post} />;
      })}
    </div>
  );
};
export default SelectRoomProducts;
