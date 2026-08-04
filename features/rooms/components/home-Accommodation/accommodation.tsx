"use client";

import { Link } from "@/i18n/routing";
import Image from "@/components/ui/image";
import { useState } from "react";
import { useGetProducts } from "@/features/booking/hooks/extras";
import { IProduct } from "@/features/rooms/types";
import { useCmsPostsBySlug } from "@/features/cms/hooks/useCmsPostsBySlug";
import { CmsPost } from "@/features/cms/types";
import {
  ACCOMMODATION_CATEGORY_SLUG,
  ACCOMMODATION_PRODUCT_FIELD_ID,
} from "@/constants/accommodation";
import { useTranslations } from "next-intl";

const getDescriptionText = (description?: string) => {
  if (!description) return "";

  try {
    const blocks = JSON.parse(description);
    if (!Array.isArray(blocks)) return description;

    return blocks
      .flatMap(
        (block: { content?: { text?: string }[] }) => block.content || [],
      )
      .map((content: { text?: string }) => content.text)
      .filter(Boolean)
      .join(" ");
  } catch {
    return description;
  }
};

const stripHtml = (value?: string) =>
  getDescriptionText(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

type CmsProductField = {
  field?: string;
  value?: string[];
};

const getProductId = (post: CmsPost) => {
  const customFieldsData = post.customFieldsData as
    | CmsProductField[]
    | undefined;

  return customFieldsData?.find(
    (item) => item.field === ACCOMMODATION_PRODUCT_FIELD_ID,
  )?.value?.[0];
};

const findLinkedRoom = (post: CmsPost, rooms: IProduct[]) => {
  const productId = getProductId(post);
  return rooms.find((room) => room._id === productId);
};

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
  const t = useTranslations("Accommodation");
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {},
  );

  const { posts: accommodationPosts, loading: accommodationPostsLoading } =
    useCmsPostsBySlug(ACCOMMODATION_CATEGORY_SLUG);

  const {
    products: rooms,
    loading: roomsLoading,
  }: { products: IProduct[]; loading: boolean } = useGetProducts({
    variables: {
      perPage: 1000,
    },
  });

  const isLoading = accommodationPostsLoading || roomsLoading;

  const handleImageError = (categoryId: string) => {
    setImageErrors((prev) => ({ ...prev, [categoryId]: true }));
  };

  return (
    <section id="room" className="space-y-8 py-8 px-4 max-w-7xl mx-auto">
      {isLoading ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <RoomCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodationPosts &&
            accommodationPosts?.map((accommodationPost) => {
              const imageUrl =
                accommodationPost.thumbnail?.url ||
                accommodationPost.images?.[0]?.url;

              const hasImageError = imageErrors[accommodationPost._id || ""];
              const room = findLinkedRoom(accommodationPost, rooms);
              const description = stripHtml(
                accommodationPost.excerpt || accommodationPost.content,
              );

              return (
                <Link
                  href={`/accommodation/${accommodationPost._id}`}
                  key={accommodationPost._id}
                  className="block h-full"
                >
                  <div className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-gray-50">
                      {imageUrl && !hasImageError ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={imageUrl}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            alt={accommodationPost.title || t("roomImage")}
                            onError={() =>
                              handleImageError(accommodationPost._id || "")
                            }
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ) : (
                        <FallbackImage
                          name={accommodationPost.title || t("room")}
                        />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                          {accommodationPost.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {description}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-gray-900">
                              {room ? `${room.unitPrice.toLocaleString()}₮` : ""}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {t("perNight")}
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

      {accommodationPosts && accommodationPosts.length === 0 && !isLoading && (
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
              {t("emptyTitle")}
            </h3>
            <p className="text-gray-500">{t("emptyDescription")}</p>
          </div>
        </div>
      )}
    </section>
  );
}
