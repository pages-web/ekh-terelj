import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Welness() {
  const t = useTranslations("Content");

  return (
    <div className="bg-white text-gray-800 py-10 px-4 max-w-6xl mt-[20px] mb-[100px] mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-[32px] font-semibold mb-2">{t("spaHouse")}</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          {t("spaHouseDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
          >
            <Image
              src={i === 0 ? "/images/spa-1.png" : "/images/spa-2.png"}
              alt={t("spaHouse")}
              width={600}
              height={400}
              className="object-cover w-full"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">{t("hannamSpaHouse")}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {t("hannamSpaHouseDescription")}
              </p>
              <Link href="/wellness-details">
                <Button variant="outline" className="flex items-center gap-2">
                  {t("viewMore")} <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
