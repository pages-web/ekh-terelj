"use client";
import { IProduct } from "@/types/products";
import { Button } from "../ui/button";
import { useAtom } from "jotai";
import { reserveExtrasAtom } from "@/store/reserve";
import { useState } from "react";

const ReserveDetailExtra = ({
  product,
  array,
  index,
}: {
  product: IProduct;
  array: any[];
  index: number;
}) => {
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [reserveExtras, setReserveExtras] = useAtom(reserveExtrasAtom);
  return (
    <div className="flex justify-between items-center gap-4">
      <span>{product.name}</span>
      <div
        className={`cursor-pointer text-textsm border px-4 py-2 rounded-lg hover:bg-accent duration-200 ${
          isAdd
            ? "text-accent-foreground"
            : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
        }`}
        onClick={() => {
          setIsAdd(!isAdd);
          isAdd
            ? setReserveExtras([...reserveExtras, product])
            : setReserveExtras(reserveExtras.splice(index, 1));
        }}
      >
        {isAdd ? "Add" : "Remove"}
      </div>
    </div>
  );
};
export default ReserveDetailExtra;
