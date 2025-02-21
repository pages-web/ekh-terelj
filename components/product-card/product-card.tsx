"use client";

import { Star } from "lucide-react";
import Image from "../ui/image";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { ICategory, IProduct } from "@/types/products";
import { useQuery } from "@apollo/client";
import { queries } from "@/sdk/graphql/rooms";

const ProductCard = ({ category }: { category: any }) => {
  const { data } = useQuery(queries.rooms, {
    variables: { categoryId: category?._id, perPage: 1 },
  });
  const product: IProduct = data?.products?.[0];
  const id = "product-1-detail";
  const locale = useParams().locale;
  return (
    <Link href={`/room-detail/${id}`} locale={locale === "en" ? "en" : "mn"}>
      <div className="space-y-3">
        {product?.attachment?.url && (
          <div className="h-[300px] overflow-hidden rounded-xl">
            <Image
              src={category?.attachment?.url || product?.attachment?.url}
              width={600}
              height={600}
              className="h-full"
            />
          </div>
        )}

        <div className="space-y-2">
          <div>
            <h3 className="text-textmd">{category?.name}</h3>
            <p className="flex text-black/50 text-textsm items-center">
              <Star className="w-4 h-4 mr-2" />
              4.7 (2,578 Reviews)
            </p>
          </div>
          <p className="text-textlg font-bold">
            {product?.unitPrice.toLocaleString()}₮
          </p>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
