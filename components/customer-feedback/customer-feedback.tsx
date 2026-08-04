"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { useTranslations } from "next-intl";

const CustomerFeedback = () => {
  const tContent = useTranslations("Content");

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center text-center">
          <div className="w-52 h-52">
            <Image
              src="/images/feedback.png"
              alt={tContent("qrMenu")}
              width={120}
              height={120}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            {tContent("qrMenu")}
          </h3>
          <p className="text-gray-600 text-center max-w-sm mb-6">
            {tContent("qrMenu")}
          </p>
          <Button className="bg-primary text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 border border-gray-600">
            <span>{tContent("viewMore")}</span>
          </Button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-52 h-52">
              <Image
                src="/images/food_menu.jpg"
                alt={tContent("foodMenu")}
                width={120}
                height={120}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            {tContent("foodMenu")}
          </h3>
          <p className="text-gray-600 text-center max-w-sm mb-6">
            {tContent("foodMenu")}
          </p>
          <Button className="bg-primary text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 border border-gray-600">
            <span>{tContent("viewMore")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
