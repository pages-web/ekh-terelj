"use client";
import ReserveDetailExtra from "@/components/reserve-detail-extra/reserve-detail-extra";

import { useGetProducts } from "@/sdk/queries/extras";
import { IProduct } from "@/types/products";

const ExtraServices = () => {
  const { products: extras } = useGetProducts({
    variables: {
      perPage: 10,
      categoryId: process.env.NEXT_PUBLIC_EXTRAS_ID,
    },
  });

  return (
    <div className="flex flex-col gap-3 px-1">
      {extras.map((extra: IProduct, index: number) => (
        <ReserveDetailExtra {...extra} key={index} />
      ))}
    </div>
  );
};
export default ExtraServices;
