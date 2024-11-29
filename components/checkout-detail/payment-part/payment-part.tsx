import PaymentMethodCard from "@/components/payment-method-card/payment-method-card";
import Image from "@/components/ui/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mutations, queries } from "@/sdk/graphql/payments";
import { mutations as salesMutations } from "@/sdk/graphql/sales";
import { useStages } from "@/sdk/queries/sales";
import { selectedMethodCardAtom } from "@/store/other";
import {
  handleMethodAtom,
  paymentSuccessAtom,
  paymentTypeAtom,
  selecteddMethodAtom,
} from "@/store/payments";
import {
  dealIdAtom,
  reserveCountAtom,
  reserveDateAtom,
  selectedRoomAtom,
  totalAmountAtom,
} from "@/store/reserve";
import { IStage } from "@/types/sales";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { formatDistance } from "date-fns";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { RESET } from "jotai/utils";
import { useRouter } from "@/i18n/routing";
import StripePayment from "@/containers/payments/stripe/stripe";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import CheckoutPage from "@/containers/payments/stripe/checkoutPage";

const PaymentPart = ({ paymentsData }: { paymentsData: any }) => {
  const payments = [
    {
      title: "Card",
      description: "For international companies",
      methodName: "Card",
      imgSrc: "/images/payments/visa.png",
    },
    {
      title: "Qpay",
      description: "For domestic companies",
      methodName: "QPAY - Minepro Qpay",
      imgSrc: "/images/payments/qpay.png",
    },
  ];

  const router = useRouter();
  const [paymentType, setPaymentType] = useAtom(paymentTypeAtom);
  const [date] = useAtom(reserveDateAtom);
  const [reserveCount] = useAtom(reserveCountAtom);
  const [selectedRoom] = useAtom(selectedRoomAtom);
  // const [selectedPayment, setSelectedPayment] = useAtom(handleMethodAtom);
  const [selectedPayment, setSelectedPayment] = useAtom(selecteddMethodAtom);
  const [paymentSuccess, setPaymentSuccess] = useAtom(paymentSuccessAtom);
  const [dealId, setDealId] = useAtom(dealIdAtom);
  const [totalAmount] = useAtom(totalAmountAtom);

  const [isPaid, setIsPaid] = useState(false);

  const [selectedMethodCard] = useAtom(selectedMethodCardAtom);
  console.log(paymentsData);

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
    <div className="border rounded-lg p-6 shadow-sm space-y-4">
      <RadioGroup
        className="flex flex-col space-y-1 mb-10"
        defaultValue={paymentType}
        onValueChange={setPaymentType}
      >
        <FormItem className="flex items-center space-x-3 space-y-0">
          <FormControl>
            <RadioGroupItem value="full" />
          </FormControl>
          <FormLabel className="font-normal">Full payment</FormLabel>
        </FormItem>
        <FormItem className="flex items-center space-x-3 space-y-0">
          <FormControl>
            <RadioGroupItem value="pre" />
          </FormControl>
          <FormLabel className="font-normal">Pre payment</FormLabel>
        </FormItem>
      </RadioGroup>
      <div className="flex gap-4">
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
      </div>

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
      {selectedMethodCard === "Qpay" ? (
        <div className="space-y-2 mt-6">
          <h2 className="font-bold text-[16px]">Qpay</h2>
          <p>Click Complete Booking button, we will redirect you to Qpay</p>
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="font-bold text-[16px]">Card</h2>
          <CheckoutPage amount={totalAmount} />
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
