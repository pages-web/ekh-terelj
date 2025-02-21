"use client";
import { useAtomValue } from "jotai";
import AccommodationLayout from "./accommodation-layout";
import ProductCard from "@/components/product-card/product-card";
import { currentConfigAtom } from "@/store/config";
import { useQuery } from "@apollo/client";
import { queries } from "@/sdk/graphql/rooms";
import { ICategory } from "@/types/products";

const Accommodation = () => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data } = useQuery(queries.roomCategories, {
    variables: { parentId: currentConfig?.roomCategories[0] },
  });
  const categories = data?.productCategories;
  return (
    <AccommodationLayout>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories?.map((category: ICategory, index: number) => {
          return <ProductCard category={category} key={index} />;
        })}
      </div>
    </AccommodationLayout>
  );
};
export default Accommodation;
