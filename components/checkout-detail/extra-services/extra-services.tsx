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
import { selectedExtras } from "@/store/reserve";
import { IProduct } from "@/types/products";
import { useWatch } from "react-hook-form";

const ExtraServices = ({ form }: { form: any }) => {
  const name = useWatch({
    name: "name",
    defaultValue: "",
  });
  const categoryId = useWatch({
    name: "categoryId",
    defaultValue: process.env.NEXT_PUBLIC_EXTRAS_ID,
  });

  const { products, loading } = useGetProducts({
    variables: {
      searchValue: name,
      perPage: 10,
      categoryId,
    },
  });
  return (
    <div className="grid md:grid-cols-2 gap-6 px-1">
      {products.map((product: IProduct, index: number) => (
        <ReserveDetailExtra
          product={product}
          key={index}
          array={selectedExtras}
          index={index}
        />
      ))}
    </div>
  );
};
export default ExtraServices;
