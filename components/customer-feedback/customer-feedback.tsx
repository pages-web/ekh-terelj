"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { useCmsPosts } from "@/features/cms/hooks/cms";
import { useTranslations } from "next-intl";

const CustomerFeedback = () => {
  const tContent = useTranslations("Content");
  const { posts } = useCmsPosts({
    tagIds: ["QKHx6if6ktGQ7roaLyw-V"],
    perPage: 1000,
  });

  const post = posts[0];

  const { posts: qrMenuPosts } = useCmsPosts({
    tagIds: ["x7CvQBo-XyuRnzGGcVGcf"],
    perPage: 1000,
  });

  const qrMenuPost = qrMenuPosts[0];

  const { posts: foodMenuPosts } = useCmsPosts({
    tagIds: ["_BMeUlYXlTXKoOwXt41lh"],
    perPage: 1000,
  });

  const foodMenuPost = foodMenuPosts[0];

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">{post?.title}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {post?.excerpt}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center text-center">
          <div className="w-52 h-52">
            <Image
              src={qrMenuPost?.thumbnail?.url || "/images/feedback.png"}
              alt={tContent("qrMenu")}
              width={120}
              height={120}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            {qrMenuPost?.title || tContent("qrMenu")}
          </h3>
          <p className="text-gray-600 text-center max-w-sm mb-6">
            {qrMenuPost?.excerpt || tContent("qrMenu")}
          </p>
          <Button className="bg-primary text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 border border-gray-600">
            <span
              dangerouslySetInnerHTML={{
                __html: qrMenuPost?.content || tContent("viewMore"),
              }}
            />
          </Button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-52 h-52">
              <Image
                src={foodMenuPost?.thumbnail?.url || "/images/food_menu.jpg"}
                alt={tContent("foodMenu")}
                width={120}
                height={120}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            {foodMenuPost?.title || tContent("foodMenu")}
          </h3>
          <p className="text-gray-600 text-center max-w-sm mb-6">
            {foodMenuPost?.excerpt || tContent("qrMenu")}
          </p>
          <Button className="bg-primary text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 border border-gray-600">
            <span
              dangerouslySetInnerHTML={{
                __html: foodMenuPost?.content || tContent("viewMore"),
              }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
