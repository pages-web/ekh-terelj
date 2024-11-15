import PaymentMethodCard from "@/components/payment-method-card/payment-method-card";
import Image from "@/components/ui/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mutations, queries } from "@/sdk/graphql/payments";
import { mutations as salesMutations } from "@/sdk/graphql/sales";
import { useStages } from "@/sdk/queries/sales";
import { selectedMethodCardAtom } from "@/store/other";
import { handleMethodAtom, paymentSuccessAtom } from "@/store/payments";
import {
  dealIdAtom,
  reserveCountAtom,
  reserveDateAtom,
  selectedRoomAtom,
} from "@/store/reserve";
import { IStage } from "@/types/sales";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { formatDistance } from "date-fns";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { RESET } from "jotai/utils";
import { useRouter } from "@/i18n/routing";

const PaymentPart = ({ paymentsData }: { paymentsData: any }) => {
  const payments = [
    {
      title: "Local Payment",
      description: "For domestic companies",
      methodName: "QPAY - Minepro Qpay",
      imgSrc: "/images/payments/qpay.png",
    },
    {
      title: "Global Payment",
      description: "For international companies",
      methodName: "VISA - Golomt bank",
      imgSrc: "/images/payments/visa.png",
    },
  ];

  const router = useRouter();
  const [date] = useAtom(reserveDateAtom);
  const [reserveCount] = useAtom(reserveCountAtom);
  const [selectedRoom] = useAtom(selectedRoomAtom);
  const [selectedPayment, setSelectedPayment] = useAtom(handleMethodAtom);
  const [paymentSuccess, setPaymentSuccess] = useAtom(paymentSuccessAtom);
  const [dealId, setDealId] = useAtom(dealIdAtom);

  const [isPaid, setIsPaid] = useState(false);

  const [selectedMethodCard] = useAtom(selectedMethodCardAtom);

  const nights = parseInt(date?.from && formatDistance(date?.from, date?.to));

  const [createInvoice, { data: invoiceData }] = useMutation(
    mutations.invoiceCreate
  );
  const [addPayment] = useMutation(salesMutations.dealsEdit);
  const { stages, loading: stagesLoading } = useStages();

  const [checkInvoice] = useMutation(mutations.checkInvoice);
  const [transactionAdd, { data, loading }] = useMutation(
    mutations.transactionsAdd
  );

  useEffect(() => {
    if (paymentsData?.length === 1 && data?._id) {
      setSelectedPayment(paymentsData[0]._id);
    }
  }, [paymentsData, data?._id]);

  return (
    <div className="space-y-4">
      {!data &&
        !loading &&
        payments.map((payment, index) => (
          <PaymentMethodCard
            key={index}
            title={payment.title}
            description={payment.description}
            methodName={payment.methodName}
            imgSrc={payment.imgSrc}
          />
        ))}

      {!!loading && (
        <div className="flex justify-center">
          <p className="font-bold">loading...</p>
        </div>
      )}

      {!!data && !paymentSuccess && (
        <div className="flex justify-center">
          <Image
            src={data?.paymentTransactionsAdd.response.qrData}
            width={300}
            height={300}
            quality={100}
          />
        </div>
      )}

      {!data && !loading && (
        <div
          className="flex justify-center bg-secondary text-white p-2 rounded-lg cursor-pointer hover:bg-secondary/90 duration-150"
          onClick={() =>
            selectedMethodCard === "Local Payment"
              ? createInvoice({
                  variables: {
                    amount: 1,
                    customerId: paymentsData[0]._id,
                    customerType: "visitor",
                    contentType: "deal",
                    contentTypeId: dealId,
                    description: `test1`,
                    paymentIds: [paymentsData[0]._id],
                    phone: "1234567890",
                  },
                  onCompleted: (invoice) => {
                    transactionAdd({
                      variables: {
                        invoiceId: invoice.invoiceCreate._id,
                        paymentId: paymentsData[0]?._id,
                        amount: 1,
                      },
                    });
                  },
                })
              : alert("Not found")
          }
        >
          Select
        </div>
      )}
      {data && paymentSuccess && <div>Payment success!</div>}

      {data && (
        <div
          className="flex justify-center bg-secondary text-white p-2 rounded-lg cursor-pointer hover:bg-secondary/90 duration-150"
          onClick={
            () =>
              // checkInvoice({
              //   variables: {
              //     id: invoiceData?.invoiceCreate._id,
              //   },
              // onCompleted(data) {
              // if (data?.invoiceCheck === "paid") {
              addPayment({
                variables: {
                  id: dealId,
                  paymentsData: {
                    mobile: {
                      amount: 1,
                      currency: "MNT",
                      info: [
                        {
                          date: new Date().toISOString(),
                          amount: 1,
                          paidBy: "",
                          description: "",
                          room: "all",
                        },
                      ],
                    },
                  },
                  proccessId: Math.random().toString(),
                  stageId: stages?.find((st: IStage) => st.code === "future")
                    ?._id,
                },
                onCompleted() {
                  setDealId(RESET);
                  setPaymentSuccess(true);
                  router.push("/booking/confirmation");
                },
              })
            // }
            // },
            // })
          }
        >
          Check payment
        </div>
      )}
    </div>
  );
};
export default PaymentPart;
