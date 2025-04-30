"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Wifi } from "lucide-react";
import useRooms from "@/sdk/queries/rooms";
import { IPageProps } from "@/types";
import { useParams } from "next/navigation";
import { Loading } from "../ui/loading";
import Image from "../ui/image";

export default function GrandSuiteListing() {
  const params = useParams();
  const { rooms } = useRooms();
  const currentRoom = rooms?.find((room) => room.categoryId === params.slug);
  console.log(currentRoom);

  if (!currentRoom)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6  container p-6">
      <div className="space-y-4">
        <Image
          src={currentRoom.attachment?.url || ""}
          alt="Main suite image"
          width={800}
          height={500}
          className="rounded-2xl shadow-md w-full h-auto"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 overflow-hidden">
          {currentRoom.attachmentMore &&
            currentRoom.attachmentMore.map((attachment, idx) => (
              <Image
                key={idx}
                src={attachment.url}
                alt={`Suite thumbnail ${idx + 1}`}
                width={300}
                height={200}
                className="rounded-xl shadow w-full h-auto"
              />
            ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-[30px] font-semibold">Grand Suite 57th Street</h2>
          {/* <p className="text-gray-500 flex items-center gap-2 mt-1">
            <Users className="w-4 h-4" /> 4 guests · 2 bedroom ·{" "}
            <Wifi className="w-4 h-4" />
          </p> */}
        </div>

        {/* <div className="space-y-2">
          <Feature
            icon="🌟"
            title="Great location"
            desc="100% of recent guests gave the location 5-star rating."
          />
          <Feature
            icon="🏊‍♂️"
            title="Dive right in"
            desc="One of the few places in the area with pool."
          />
          <Feature
            icon="✅"
            title="Great check-in experience"
            desc="100% gave the check-in process 5-star rating."
          />
          <Feature
            icon="🕒"
            title="Free cancellation for 48 hours"
            desc="Cancel your reservation within 48 hours."
          />
        </div> */}

        {/* <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <span>Check-in</span>
              <span>2023/04/16</span>
            </div>
            <div className="flex justify-between">
              <span>Check-out</span>
              <span>2023/04/21</span>
            </div>
            <div className="flex justify-between">
              <span>Guests</span>
              <span>2 Adults, 1 Child</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between">
                <span>$480 x 5 nights</span>
                <span>$2400</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>$59</span>
              </div>
              <div className="flex justify-between font-semibold pt-2">
                <span>Total price</span>
                <span>$2459</span>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <div
          className="text-sm text-gray-500"
          dangerouslySetInnerHTML={{ __html: currentRoom.description || "" }}
        ></div>
      </div>
    </div>
  );
}

type FeatureProps = {
  icon: string;
  title: string;
  desc: string;
};

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
