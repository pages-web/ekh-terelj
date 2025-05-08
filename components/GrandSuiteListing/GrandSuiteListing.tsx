"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Wifi } from "lucide-react";
import { useParams } from "next/navigation";
import { Loading } from "../ui/loading";
import Image from "../ui/image";
import { useCmsPostDetail } from "@/sdk/queries/cms";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import useRooms from "@/sdk/queries/rooms";

export default function GrandSuiteListing() {
  const params = useParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  const { rooms } = useRooms();
  const { post } = useCmsPostDetail(params.slug as string);
  const room = rooms.find(
    (room) => room._id === post?.customFieldsMap?.roomGroup?.main_product
  );

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  console.log(room, "room");

  if (!post || !room)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen container p-6 space-y-6">
      <h2 className="text-[30px] font-semibold">{post.title}</h2>
      <div className="grid-cols-2 gap-3 lg:gap-6 lg:grid hidden">
        {room.attachment && (
          <Image
            src={room.attachment?.url}
            alt={room.attachment.name}
            width={800}
            height={500}
            className="rounded-2xl shadow-md w-full aspect-video"
          />
        )}

        <div className="grid grid-cols-2 gap-3 lg:gap-6">
          {room.attachmentMore &&
            room.attachmentMore
              .slice(0, 4)
              .map((attachment, idx) => (
                <Image
                  key={idx}
                  src={attachment.url}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="rounded-xl shadow w-full h-full aspect-video"
                />
              ))}
        </div>
      </div>

      {(room.attachment || room.attachmentMore) && (
        <Carousel
          className="lg:hidden"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {[room.attachment, ...(room.attachmentMore ?? [])].map(
              (attachment, idx) => (
                <CarouselItem key={idx}>
                  <Image
                    src={attachment?.url}
                    alt={`Suite thumbnail ${idx + 1}`}
                    width={300}
                    height={200}
                    className="rounded-xl shadow w-full h-full aspect-video"
                  />
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </Carousel>
      )}

      <div className="space-y-6">
        <div
          className="text-sm text-gray-500"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        ></div>

        <p className="font-bold text-xl">{room?.unitPrice.toLocaleString()}₮</p>

        <div className="space-y-3">
          <h2 className="text-displaysm">Facilities & Services</h2>
          <div className="w-fit pl-5">
            {post.customFieldsMap.roomGroup.main_facilities
              .split(",")
              ?.map((facility: string, idx: number) => (
                <Feature key={idx} title={facility} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type FeatureProps = {
  title: string;
};

function Feature({ title }: FeatureProps) {
  return (
    <div className="flex items-start gap-3 text-textmd">
      {/* <span className="text-xl">{icon}</span> */}
      <div>
        <p className="font-medium">{title}</p>
      </div>
    </div>
  );
}
