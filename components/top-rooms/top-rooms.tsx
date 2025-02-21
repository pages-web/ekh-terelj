"use client";
import ProductCard from "@/components/product-card/product-card";
import { queries } from "@/sdk/graphql/rooms";
import { currentConfigAtom } from "@/store/config";
import { ICategory } from "@/types/products";
import { useQuery } from "@apollo/client";
import { useAtom, useAtomValue } from "jotai";

export default function Rooms() {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data } = useQuery(queries.roomCategories, {
    variables: { parentId: currentConfig?.roomCategories[0] },
  });
  const categories = data?.productCategories;
  return (
    <div>
      <div className="container">
        <h2 className="text-displaysm font-normal mb-4">
          Top Trending Hotel Rooms Views
        </h2>
        {/* <p className="text-gray-600 mb-8 text-muted-foreground">
          A masterclass of sophistication, a stay at Atlantis The Royal delivers
          extraordinary luxury, unlike anywhere else.
        </p> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((category: ICategory, index: number) => {
            return <ProductCard key={index} category={category} />;
          })}
        </div>
      </div>
    </div>
  );
}
