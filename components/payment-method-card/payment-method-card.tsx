import { useState } from "react";
import Image from "../ui/image";
import { useAtom } from "jotai";
import { selectedMethodCardAtom } from "@/store/other";

type Props = {
  title?: string;
  description?: string;
  methodName?: string;
  imgSrc?: string;
};

const PaymentMethodCard = ({
  title,
  description,
  methodName,
  imgSrc,
}: Props) => {
  const [selectedMethodCard, setSelectedMethodCard] = useAtom(
    selectedMethodCardAtom
  );
  return (
    <div
      className={`flex justify-between gap-4 border rounded-lg p-3 cursor-pointer ${
        selectedMethodCard === title
          ? "border-secondary shadow-md border-2"
          : "border-black/10"
      }`}
      onClick={() => setSelectedMethodCard(title)}
    >
      <div className="space-y-4">
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="text-black/50 text-textsm">{description}</p>
        </div>
        <h3 className="text-secondary font-bold">{methodName}</h3>
      </div>
      <div
        className={` overflow-hidden border  rounded-lg box-content ${
          title === "Global Payment" ? "py-2 px-1 h-[22px]" : "p-2 h-[32px]"
        }`}
      >
        <Image
          width={128}
          height={128}
          className="w-full h-full"
          src={imgSrc || "/images/payments/qpay.png"}
          quality={100}
        />
      </div>
    </div>
  );
};
export default PaymentMethodCard;
