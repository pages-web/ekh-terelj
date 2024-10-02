"use client";

import { Star } from "lucide-react";
import Image from "../ui/image";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";

const ProductCard = () => {
  const id = "product-1-detail";
  const locale = useParams().locale;
  return (
    <Link href={`/room-detail/${id}`} locale={locale === "en" ? "en" : "mn"}>
      <div className="space-y-3">
        <div className="h-[300px] overflow-hidden w-fit rounded-xl">
          <Image
            src="/images/product.png"
            width={600}
            height={600}
            className="h-full"
          />
        </div>
        <div className="space-y-2">
          <div>
            <h3 className="text-textmd">Duxton Room Twin</h3>
            <p className="flex text-black/50 text-textsm items-center">
              <Star className="w-4 h-4 mr-2" />
              4.7 (2,578 Reviews)
            </p>
          </div>
          <p className="text-textlg font-bold">1,200,000₮ MNT</p>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
