"use client";
import ReserveDetailExtra from "@/features/booking/components/reserve-detail-extra/reserve-detail-extra";

import { useGetProducts } from "@/features/booking/hooks/extras";
import { currentConfigAtom } from "@/constants/config";
import { IProduct } from "@/features/rooms/types";
import { useAtomValue } from "jotai";

const ExtraServices = () => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { products: extras } = useGetProducts({
    variables: {
      perPage: 10,
      categoryIds: [currentConfig?.extraProductCategories[0]],
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
