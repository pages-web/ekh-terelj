"use client";
import ReserveDetailExtra from "@/components/reserve-detail-extra/reserve-detail-extra";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetCategories, useGetProducts } from "@/sdk/queries/extras";
import { selectedExtras } from "@/store/rooms";
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
