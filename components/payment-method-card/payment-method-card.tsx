import { useState } from "react";
import Image from "../ui/image";
import { useAtom, useSetAtom } from "jotai";
import { CreditCard } from "lucide-react";
import { IPayment } from "@/types/payments";
import { selectedPaymentAtom } from "@/store/payments";

const PaymentMethodCard = ({ payment }: { payment: IPayment }) => {
  const [selectedPayment, setSelectedPayment] = useAtom(selectedPaymentAtom);

  return (
    <div className="w-[120px] flex flex-col gap-2 items-center">
      <div
        className={`hover:bg-black/20 shadow-md duration-200 h-[80px] w-full flex items-center justify-center gap-4 border rounded-lg px-6 py-3 cursor-pointer ${
          payment.kind === selectedPayment && "border-primary border-2"
        }`}
        onClick={() => setSelectedPayment(payment.kind)}
      >
        <div className={`h-full max-h-[40px]`}>
          {payment.kind === "qpayQuickqr" ? (
            <Image
              width={128}
              height={128}
              className="h-full w-full"
              src={"/images/payments/qpay.png"}
              quality={100}
            />
          ) : (
            <CreditCard className="w-full h-full" color="#012D5E" />
          )}
        </div>
      </div>
    </div>
  );
};
export default PaymentMethodCard;
