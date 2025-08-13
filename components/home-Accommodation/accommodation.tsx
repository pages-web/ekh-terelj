"use client";

import Link from "next/link";
import Image from "../ui/image";
import Heading from "../heading/heading";
import { useCmsPosts } from "@/sdk/queries/cms";
import { useRoomsAndCategories } from "@/sdk/queries/rooms";
import { useState } from "react";

const RoomCardSkeleton = () => (
  <div className="w-full group relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 h-auto">
    <div className="h-56 md:h-64 bg-gray-200 animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="space-y-1">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-14" />
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

const FallbackImage = ({ name }: { name: string }) => (
  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/80 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>
      <p className="text-sm text-gray-500 font-medium">{name}</p>
    </div>
  </div>
);

export default function Rooms() {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { posts, loading: postsLoading } = useCmsPosts({
    tagIds: ["wVx0BObZxZJ94IaJrhGPe"],
    perPage: 1000,
  });

  const { posts: allGrandSuitePosts, loading: grandSuitePostsLoading } =
    useCmsPosts({
      categoryId: "1s1knKVOLplWPaIGkDnFd",
      perPage: 1000,
    });

  const grandSuitePosts = allGrandSuitePosts
    .filter((post) => post.categoryIds.includes("1s1knKVOLplWPaIGkDnFd"))
    .sort((a, b) => {
      const indexA = a.customFieldsMap?.room_post?.index || 999;
      const indexB = b.customFieldsMap?.room_post?.index || 999;
      return indexA - indexB;
    });

  const post = posts[0];

  const handleImageError = (categoryId: string) => {
    setImageErrors((prev) => ({ ...prev, [categoryId]: true }));
  };

  return (
    <section id="room" className="space-y-8 py-8 px-4 max-w-7xl mx-auto">
      <div className="space-y-4 flex flex-col items-center text-center max-w-2xl mx-auto">
        <Heading title={post?.title} desc={post?.content} />
      </div>

      {grandSuitePostsLoading ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <RoomCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grandSuitePosts &&
            grandSuitePosts?.map((category, index) => {
              const imageUrl = category.thumbnail?.url;
              const hasImageError = imageErrors[category._id];

              return (
                <Link href={`/room-detail/${category._id}`} key={index}>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-auto">
                    <div className="relative h-56 md:h-64 overflow-hidden bg-gray-50">
                      {imageUrl && !hasImageError ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={imageUrl}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            alt={category.title}
                            onError={() => handleImageError(category._id)}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ) : (
                        <FallbackImage name={category.title} />
                      )}

                      {imageUrl && !hasImageError && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                          {category.title}
                        </h3>
                        <p
                          className="text-sm text-gray-500 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: category.excerpt || "",
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-gray-900">
                              {category.customFieldsMap?.room_post?.price
                                ? category.customFieldsMap?.room_post?.price?.toLocaleString() +
                                  "₮"
                                : ""}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {category.customFieldsMap?.room_post?.hour_rate ||
                              "N/A"}
                          </p>
                        </div>

                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white group-hover:bg-gray-800 transition-colors">
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}

      {grandSuitePosts &&
        grandSuitePosts.length === 0 &&
        !grandSuitePostsLoading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Одоогоор өрөө байхгүй байна
              </h3>
              <p className="text-gray-500">
                Удахгүй шинэ өрөөнүүд нэмэгдэх болно.
              </p>
            </div>
          </div>
        )}
    </section>
  );
}
