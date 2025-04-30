"use client";

import Link from "next/link";
import Image from "../ui/image";
import { useCustomCmsPosts } from "@/sdk/queries/cms";

export default function Rooms() {
  const { customPosts } = useCustomCmsPosts();

  return (
    <section id="room">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col items-center">
          <a href="/about">
            <button className="border border-gray-400 rounded-full px-4 py-1 text-sm mb-4">
              Accommodation
            </button>
          </a>
          <h2 className="text-[20px] font-semibold">
            Recommended rooms and suites
          </h2>
          <p className="text-gray-600 max-w-2xl mt-2">
            Floor-to-ceiling windows unlock sublime views from all 202 rooms and
            suites, each highlighted by sophisticated décor with Chinoiserie
            touches. Body-contouring beds draped in luxury Frette linens make
            for a relaxing stay, while marble-clad bathrooms feature heated
            floors and signature Jo Loves amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customPosts &&
            customPosts?.map((post) => {
              return (
                <Link href={`/room-detail/${post._id}`} key={post._id}>
                  <div className="border p-5 rounded-2xl cursor-pointer bg-white overflow-hidden flex flex-col hover:shadow-lg transition hover:-translate-y-1">
                    <div className="relative h-[280px] overflow-hidden rounded-lg mb-3">
                      <Image
                        src={post.thumbnail.url || "/images/default-room.jpg"}
                        width={400}
                        height={300}
                        className="w-full h-full"
                        alt={post.title}
                      />
                    </div>
                    <div className="flex justify-between">
                      <h2 className="text-lg font-semibold">{post.title}</h2>
                      <p className="text-xl font-bold">
                        {post.customFieldsData
                          .find((field) => field.code === "product")
                          ?.product?.unitPrice.toLocaleString()}
                        ₮{" "}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <p className="text-md">Per night</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.customFieldsData
                        .find((field) => field.code === "facilities")
                        ?.value.split(",")
                        .map((facility, index) => (
                          <p
                            className="text-md rounded-full border py-2 px-3 text-black/70"
                            key={index}
                          >
                            {facility}
                          </p>
                        ))}
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
