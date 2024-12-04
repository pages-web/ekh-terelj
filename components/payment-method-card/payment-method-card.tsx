import { useState } from "react";
import Image from "../ui/image";
import { useAtom } from "jotai";
import { CreditCard } from "lucide-react";
import { selectedMethodCardAtom } from "@/store/payments";

type Props = {
  title: string;
  description?: string;
  methodName?: string;
  imgSrc?: string;
};

const PaymentMethodCard = ({ title, imgSrc }: Props) => {
  const [selectedMethodCard, setSelectedMethodCard] = useAtom(
    selectedMethodCardAtom
  );
  return (
    <div className="w-[120px] flex flex-col gap-2 items-center">
      <div
        className={`hover:bg-black/20 shadow-md duration-200 h-[80px] w-full flex items-center justify-center gap-4 border rounded-lg px-6 py-3 cursor-pointer  ${
          selectedMethodCard === title
            ? "border-secondary shadow-md border-2"
            : "border-black/10"
        }`}
        onClick={() => setSelectedMethodCard(title)}
      >
        <div className={`h-full max-h-[40px]`}>
          {title === "Qpay" ? (
            <Image
              width={128}
              height={128}
              className="h-full w-full"
              src={imgSrc || "/images/payments/qpay.png"}
              quality={100}
            />
          ) : (
            <CreditCard className="w-full h-full" color="#012D5E" />
          )}
        </div>
      </div>
      <p>{title}</p>
    </div>
  );
};
export default PaymentMethodCard;
