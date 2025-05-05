"use client";

import Link from "next/link";
import Image from "../ui/image";
import { useCustomCmsPosts } from "@/sdk/queries/cms";
import HeadingButton from "../heading-button/heading-button";
import Heading from "../heading/heading";

export default function Rooms() {
  const { customPosts } = useCustomCmsPosts();

  return (
    <section id="room" className="space-y-10">
      <div className="space-y-6 flex flex-col items-center text-center">
        <HeadingButton title="Accommodation" />
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
        {customPosts &&
          customPosts?.map((post) => {
            return (
              <Link href={`/room-detail/${post._id}`} key={post._id}>
                <div className="border p-5 rounded-2xl cursor-pointer bg-white overflow-hidden flex flex-col hover:shadow-lg transition hover:-translate-y-1">
                  <div className="relative h-[280px] overflow-hidden rounded-lg mb-3">
                    <Image
                      src={post.thumbnail?.url || "/images/default-room.jpg"}
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
                      .find((field) => field.code === "main_facilities")
                      ?.value.split(",")
                      .map((facility, index) => (
                        <p
                          className="text-sm rounded-full border py-2 px-3 text-black/70"
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
    </section>
  );
}
