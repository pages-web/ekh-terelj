"use client";
import ReserveDetailExtra from "@/components/reserve-detail-extra/reserve-detail-extra";

import { useGetProducts } from "@/sdk/queries/extras";
import { currentConfigAtom } from "@/store/config";
import { IProduct } from "@/types/products";
import { useAtomValue } from "jotai";

const ExtraServices = () => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { products: extras } = useGetProducts({
    variables: {
      perPage: 10,
      categoryId: currentConfig?.extraProductCategories[0],
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
