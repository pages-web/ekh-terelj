"use client";

import Link from "next/link";
import Image from "../ui/image";
import HeadingButton from "../heading-button/heading-button";
import Heading from "../heading/heading";
import { useCmsPosts, useCmsTags } from "@/sdk/queries/cms";
import useRooms, { useRoomsAndCategories } from "@/sdk/queries/rooms";

export default function Rooms() {
  // const { tags } = useCmsTags();
  // const { rooms } = useRooms();
  // const { posts } = useCmsPosts({
  //   tagIds: [tags?.find((tag) => tag.slug === "accomodation")?._id],
  // });
  const { roomsAndCategories } = useRoomsAndCategories();

  return (
    <section id="room" className="space-y-10">
      <div className="space-y-6 flex flex-col items-center text-center">
        <HeadingButton title="Accommodation" link="/accommodation" />
        <Heading
          title=" Recommended rooms and suites"
          desc=" Floor-to-ceiling windows unlock sublime views from all 202 rooms and
            suites, each highlighted by sophisticated décor with Chinoiserie
            touches. Body-contouring beds draped in luxury Frette linens make
            for a relaxing stay, while marble-clad bathrooms feature heated
            floors and signature Jo Loves amenities."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roomsAndCategories &&
          roomsAndCategories?.map((category, index) => {
            const room = category.rooms[0];
            if (room)
              return (
                <Link href={`/room-detail/${category._id}`} key={index}>
                  <div className="border p-5 rounded-2xl cursor-pointer bg-white overflow-hidden flex flex-col hover:shadow-lg transition hover:-translate-y-1">
                    <div className="relative h-[280px] overflow-hidden rounded-lg mb-3">
                      <Image
                        src={category.rooms[0]?.attachment?.url || ""}
                        width={400}
                        height={300}
                        className="w-full h-full"
                        alt={category.name}
                      />
                    </div>
                    <div className="flex justify-between">
                      <h2 className="text-lg font-semibold">{category.name}</h2>
                      <p className="text-xl font-bold">
                        {category.rooms[0]?.unitPrice.toLocaleString()}₮
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <p className="text-md">Per night</p>
                    </div>

                    {/* <div className="flex flex-wrap gap-2">
                    {post.customFieldsMap.roomGroup.main_facilities
                      .split(",")
                      .map((facility: string, index: number) => (
                        <p
                          className="text-sm rounded-full border py-2 px-3 text-black/70"
                          key={index}
                        >
                          {facility}
                        </p>
                      ))}
                  </div> */}
                  </div>
                </Link>
              );
          })}
      </div>
    </section>
  );
}
