"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { queries } from "@/sdk/graphql/cms";
import useRooms, {
  useCheckRooms,
  useRoomCategories,
  useRoomsAndCategories,
} from "@/sdk/queries/rooms";
import Image from "../ui/image";

export default function Rooms() {
  const { roomsAndCategories } = useRoomsAndCategories();

  return (
    <section id="room" className="lg:pt-24 pt-5">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Өрөөний Сонголт
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsAndCategories &&
            roomsAndCategories?.map((category) => {
              return (
                <Link href={`/room-detail/${category._id}`} key={category._id}>
                  <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
                    <div className="relative h-[280px]">
                      <Image
                        src={
                          category.rooms?.[0]?.attachment?.url ||
                          "/images/default-room.jpg"
                        }
                        width={400}
                        height={300}
                        className="w-full h-full"
                        alt={category.name}
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <h2 className="text-xl font-semibold">{category.name}</h2>
                      {/* <p className="text-gray-600">
                      {rating} ⭐ ({reviews} Reviews)
                    </p> */}
                      <p className="text-lg font-bold mt-2">
                        ₮{category.rooms[0]?.unitPrice.toLocaleString()}{" "}
                        <span className="text-sm text-gray-500">per night</span>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
