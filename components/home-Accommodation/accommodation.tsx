"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { queries } from "@/sdk/graphql/cms";

export default function Rooms() {
  const { data, loading, error } = useQuery(queries.Posts, {
    variables: {
      clientPortalId: process.env.NEXT_PUBLIC_CP_ID!,
      perPage: 6,
    },
  });

  const posts = data?.cmsPostList.posts || [];

  if (loading) return <p className="p-10">Loading...</p>;
  if (error) return <p className="p-10 text-red-500">Error: {error.message}</p>;

  return (
    <section id="room" className="lg:pt-24 pt-5">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Өрөөний Сонголт
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((room: any) => {
            const { _id, title, description, thumbnail } = room;

            // Parse data from description string
            const priceMatch = description?.match(/price:\s*(\d+)/i);
            const ratingMatch = description?.match(/rating:\s*([\d.]+)/i);
            const reviewsMatch = description?.match(/reviews:\s*(\d+)/i);

            const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
            const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;
            const reviews = reviewsMatch ? parseInt(reviewsMatch[1]) : 0;

            return (
              <Link href={`/room-detail/${_id}`} key={_id}>
                <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[500px] hover:shadow-lg transition">
                  <div className="relative h-[280px]">
                    <Image
                      src={thumbnail?.url || "/images/default-room.jpg"}
                      fill
                      className="object-cover"
                      alt={title}
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-gray-600">
                      {rating} ⭐ ({reviews} Reviews)
                    </p>
                    <p className="text-lg font-bold mt-2">
                      ${price}{" "}
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
