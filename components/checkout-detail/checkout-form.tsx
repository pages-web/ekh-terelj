"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormLabel,
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import PersonalInfoPart from "./personal-info-part/personal-info-part";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import PaymentPart from "./payment-part/payment-part";
import { useAtom, useAtomValue } from "jotai";
import {
  confirmBookingViewAtom,
  reserveCompletedAtom,
  reserveDateAtom,
  reserveUserAtom,
} from "@/store/reserve";
import { useStages } from "@/sdk/queries/sales";
import { useMutation, useQuery } from "@apollo/client";
import { mutations } from "@/sdk/graphql/sales";
import { mutations as paymentMutations } from "@/sdk/graphql/payments";
import { IStage } from "@/types/sales";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { queries } from "@/sdk/graphql/payments";
import { queries as salesQueries } from "@/sdk/graphql/sales";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/sdk/queries/auth";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { currentUserAtom } from "@/store/auth";
import CheckBookingDetail from "./check-booking-detail/check-booking-detail";
import {
  paymentTypeAtom,
  selectedMethodCardAtom,
  totalAmountAtom,
} from "@/store/payments";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useLocale } from "next-intl";
import Image from "../ui/image";
import { Loading } from "../ui/loading";
import { CircleCheck, CircleX, X } from "lucide-react";
import { dealIdAtom } from "@/store/rooms";
import { reserveDetailSchema } from "@/lib/schema";
import useAddDeal from "@/sdk/hooks/useAddDeal";
import { termsContent } from "@/lib/termsText";

const CheckoutForm = () => {
  const { handleAddDeal } = useAddDeal();
  //----------------------------------
  const router = useRouter();
  const [date] = useAtom(reserveDateAtom);
  const [reserveUser, setReserveUser] = useAtom(reserveUserAtom);
  const [reserveCompleted, setReserveCompleted] = useAtom(reserveCompletedAtom);
  const [dealId] = useAtom(dealIdAtom);
  const [isMyself, setIsMyself] = useState(true);
  const [terms, setTerms] = useState(false); //must be false
  const [confirmBookingView, setConfirmBookingView] = useAtom(
    confirmBookingViewAtom
  );
  const [selectedMethodCard] = useAtom(selectedMethodCardAtom);
  const { firstName, lastName, email, phone } =
    useAtomValue(currentUserAtom) || {};
  const { loading: currentUserLoading, currentUser } = useCurrentUser();
  const [totalAmount] = useAtom(totalAmountAtom);
  const paymentType = useAtomValue(paymentTypeAtom);

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const locale = useLocale();

  const form = useForm<z.infer<typeof reserveDetailSchema>>({
    resolver: zodResolver(reserveDetailSchema),
    defaultValues: {
      forWho: "myself",
      firstname: firstName,
      lastname: lastName,
      mail: email,
      phone: phone,
      description: reserveUser.description,
    },
  });

  const [editDeal] = useMutation(mutations.dealsEdit);
  const [addPayment] = useMutation(mutations.addPayment);
  const { data } = useQuery(queries.payments);
  const paymentsData = data?.payments;
  const { stages } = useStages();

  const [createInvoice, { data: invoiceData, loading: invoiceLoading }] =
    useMutation(paymentMutations.invoiceCreate);
  const [
    transactionAdd,
    { data: transactionData, loading: transactionLoading },
  ] = useMutation(paymentMutations.transactionsAdd);
  const [checkInvoice] = useMutation(paymentMutations.checkInvoice);
  const { data: dealDetaildata } = useQuery(salesQueries.dealDetail, {
    variables: { id: dealId },
  });

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalAmount]);

  useEffect(() => {
    if (!reserveCompleted && confirmBookingView === "unconfirmed") {
      const timeoutId = setTimeout(() => {
        setConfirmBookingView("confirm");
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [reserveCompleted, confirmBookingView]);

  const handlePaymentAndReservation = async (
    event: React.FormEvent<HTMLFormElement>,
    data: z.infer<typeof reserveDetailSchema>
  ) => {
    event.preventDefault();

    // Set reservation data
    setReserveUser(data);

    // Handle Stripe payment
    if (!stripe || !elements) {
      setErrorMessage("Stripe has not been properly initialized.");
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    setReserveCompleted(!reserveCompleted);

    // Handle deal creation or editing after payment succeeds
    if (!!dealId) {
      editDeal({
        variables: {
          id: dealId,
          stageId: stages?.find((st: IStage) => st.code === "canceled")?._id,
        },
        onCompleted: () => handleAddDeal({ description: data.description }),
      });
    } else {
      handleAddDeal({ description: data.description });
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const handleButtonClick = () => {
    setIsLoading(true);

    // Simulate a delay for loading
    setTimeout(async () => {
      selectedMethodCard === "Card"
        ? stripe &&
          elements &&
          (await stripe
            .confirmPayment({
              elements,
              clientSecret,
              confirmParams: {
                // return_url: `http://localhost:3001/${locale}/booking/confirmation/${dealId}`,
              },
              redirect: "if_required",
            })
            .then((result) => {
              if (result.error) {
                // Inform the customer that there was an error.
                setIsLoading(false);
                setConfirmBookingView("unconfirmed");
                console.log(result.error);
              } else {
                setIsLoading(false);
                setConfirmBookingView("confirmed");
                editDeal({
                  variables: {
                    id: dealId,
                    stageId: stages?.find((st: IStage) => st.code === "future")
                      ?._id,
                    // tagIds: [
                    //   ...dealDetaildata?.dealDetail.tagIds,
                    //   tags.find((tag: any) => tag.name.toLowerCase() === "card")
                    //     ?._id,
                    // ],
                  },
                }),
                  addPayment({
                    variables: {
                      id: dealId,
                      paymentsData: {
                        card: {
                          amount: totalAmount,
                          currency: "MNT",
                          info: [
                            {
                              date: new Date(),
                              amount: totalAmount,
                              paidBy: currentUser?.erxesCustomerId,
                              method: "card",
                              room: "all",
                            },
                          ],
                        },
                      },
                      processId: Math.random().toString(),
                    },
                    onCompleted: () =>
                      router.push(
                        `https://pms-client.erxes.io/${locale}/booking/confirmation/${dealId}`
                      ),
                  });
              }
            }))
        : createInvoice({
            variables: {
              amount: totalAmount,
              customerId: paymentsData[0]._id,
              customerType: "customer",
              contentType: "deal",
              contentTypeId: dealId,
              description: `Room reservation - ${reserveUser.mail}`,
              paymentIds: [paymentsData[0]._id],
              phone: reserveUser.phone,
            },
            onCompleted: (invoice) => {
              transactionAdd({
                variables: {
                  invoiceId: invoice.invoiceCreate._id,
                  paymentId: paymentsData[0]?._id,
                  amount: totalAmount,
                },
                // onCompleted: () => {
                //   setSelectedPayment(paymentsData[0]._id);
                // },
              });
            },
          });
      setIsLoading(false);
    }, 3000);
  };

  const titles = [
    {
      title: "Your personal information",
      content: (
        <div className="p-6 border rounded-lg space-y-10 shadow-sm">
          <FormField
            control={form.control}
            name="forWho"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    onChange={() => setIsMyself(!isMyself)}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="myself" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Booking for myself
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="someone" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Booking on behalf of someone else
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <PersonalInfoPart form={form} />
          {!isMyself && (
            <div className="space-y-6">
              <h1>Please enter the details of the travelling guest below</h1>
              <div className="grid grid-cols-6 gap-6 px-1 mb-3">
                <FormField
                  control={form.control}
                  name="guestFirstname"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel className="text-textxs">
                        {`Guest's first name`}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter guest's first name"
                          {...field}
                          className="text-textsm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guestLastname"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel className="text-textxs">
                        {`Guest's last name`}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter guest's last name"
                          {...field}
                          className="text-textsm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="px-1 space-y-3">
                <FormField
                  control={form.control}
                  name="guestMail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-textxs">
                        {`Guest's e-mail`}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter guest's email"
                          {...field}
                          className="text-textsm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Additional Comments",
      content: (
        <div className="border rounded-lg p-6 shadow-sm">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-textsm">
                  Special requests (optional){" "}
                  {!!field.value?.length && (
                    <span className="text-[10px] leading-2 text-black/60">
                      {field.value?.length}/250
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Limit 250 characters"
                    {...field}
                    className="text-textsm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ),
    },
    {
      title: "Payment",
      content: <PaymentPart paymentsData={data?.payments} />,
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit((data) => handlePaymentAndReservation(e, data))();
        }}
        className="px-1 space-y-6"
      >
        <h1 className="text-displayxs">Check-in guest information</h1>
        <Accordion
          type={"multiple"}
          className="w-full"
          defaultValue={["item-0", "item-2"]}
        >
          {titles.map((title, index) => {
            return (
              <AccordionItem
                value={`item-${index}`}
                className="border-none"
                key={index}
              >
                <AccordionTrigger className="text-textlg md:text-textxl">
                  {title.title}
                </AccordionTrigger>
                {!currentUserLoading && (
                  <AccordionContent>{title.content}</AccordionContent>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>

        <Separator />

        <div className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-black text-textxl">Cancellation policy</h2>
            <ul className="list-disc pl-7 text-black/70 text-textsm">
              <li>
                This rate is non-refundable. If you change or cancel your
                booking you will not get a refund or credit to use for a future
                stay. This policy will apply regardless of COVID-19, subject to
                any local consumer laws.
              </li>
              <li>
                No refunds will be issued for late check-in or early check-out.
              </li>
              <li>Stay extensions require a new reservation.</li>
            </ul>
          </div>

          <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
              <div className="flex gap-2 cursor-pointer">
                <Checkbox id="terms" checked={terms} />
                <div className="grid gap-1.5 leading-none cursor-pointer">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none"
                  >
                    Accept terms and conditions
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[60vh] max-h-[50vh] overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>Terms and Conditions</DialogTitle>
              </DialogHeader>

              <div className="text-textsm">{termsContent}</div>

              <Separator />

              <div className="flex items-center gap-2 text-textsm cursor-pointer">
                <Checkbox
                  id="terms"
                  checked={terms}
                  onCheckedChange={(checked: any) => setTerms(checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  onClick={() => setTerms(!terms)}
                >
                  I have read and accept the terms and conditions
                </label>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button size={"lg"} className="w-full" type="submit" disabled={!terms}>
          Confirm Booking
        </Button>
        <AlertDialog
          onOpenChange={setReserveCompleted}
          open={reserveCompleted}
          // defaultOpen
        >
          <AlertDialogContent className="max-w-[60vh] max-h-[90vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-between items-start">
                {confirmBookingView === "confirm" ? (
                  "Check your booking"
                ) : confirmBookingView === "payment" &&
                  selectedMethodCard === "Qpay" &&
                  !transactionLoading &&
                  !invoiceLoading &&
                  !isLoading ? (
                  <div className="text-destructive">{`Don't close until pay`}</div>
                ) : confirmBookingView === "confirmed" && !isLoading ? (
                  <div className="flex gap-2">
                    <div className=" w-fit rounded-lg bg-[#dcf6df] border-[#46cb53] text-[#46cb53] flex items-center gap-2 px-5 py-[6px]">
                      <CircleCheck className="h-4 w-4" color="#46cb53" />
                      <p className="w-fit text-[#46cb53] text-textsm">
                        Your booking is confirmed.
                      </p>
                    </div>
                  </div>
                ) : confirmBookingView === "unconfirmed" && !isLoading ? (
                  <div className="flex gap-2">
                    <div className=" w-fit rounded-lg bg-[#f6dcdc] border-[#cb4646] text-[#cb4646] flex items-center gap-2 px-5 py-[6px]">
                      <CircleX className="h-4 w-4" color="#cb4646" />
                      <p className="w-fit text-[#cb4646] text-textsm">
                        Your booking is failed.
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <AlertDialogCancel className="border-none shadow-none hover:bg-transparent p-0 h-6 w-6 absolute top-4 right-4">
                  <X className="w-4 h-4" />
                </AlertDialogCancel>
              </AlertDialogTitle>
            </AlertDialogHeader>

            {confirmBookingView !== "unconfirmed" && !isLoading && (
              <Separator />
            )}

            {confirmBookingView === "confirm" ? (
              <CheckBookingDetail />
            ) : confirmBookingView === "payment" && isLoading ? (
              <Loading />
            ) : selectedMethodCard === "Qpay" &&
              confirmBookingView === "payment" ? (
              transactionLoading && invoiceLoading && isLoading ? (
                <Loading />
              ) : (
                <div className="flex justify-center">
                  {!!transactionData && (
                    <Image
                      src={
                        transactionData?.paymentTransactionsAdd.response.qrData
                      }
                      width={300}
                      height={300}
                      quality={100}
                    />
                  )}
                </div>
              )
            ) : confirmBookingView === "confirmed" && !isLoading ? (
              <div className="flex text-textsm">
                We will direct you confirmation page.
              </div>
            ) : isLoading ? (
              <Loading />
            ) : (
              ""
            )}

            {confirmBookingView === "confirm" ? (
              <Button
                onClick={() => {
                  selectedMethodCard === "Qpay";
                  setConfirmBookingView("payment");
                  handleButtonClick();
                }}
              >
                Confirm my booking
              </Button>
            ) : confirmBookingView === "payment" &&
              selectedMethodCard === "Qpay" &&
              !transactionLoading &&
              !invoiceLoading &&
              !isLoading ? (
              <Button
                onClick={() => {
                  checkInvoice({
                    variables: {
                      id: invoiceData?.invoiceCreate._id,
                    },

                    onCompleted: (data) => {
                      if (data.invoicesCheck !== "pending") {
                        setConfirmBookingView("confirmed");
                        editDeal({
                          variables: {
                            id: dealId,
                            stageId: stages?.find(
                              (st: IStage) => st.code === "future"
                            )?._id,
                            // tagIds: [
                            //   ...dealDetaildata?.dealDetail.tagIds,
                            //   tags.find(
                            //     (tag: any) => tag.name.toLowerCase === "qpay"
                            //   )?._id,
                            // ],
                          },
                        });
                        addPayment({
                          variables: {
                            id: dealId,
                            paymentsData: {
                              qpay: {
                                amount: totalAmount,
                                currency: "MNT",
                                info: [
                                  {
                                    date: new Date(),
                                    amount: totalAmount,
                                    paidBy: currentUser?.erxesCustomerId,
                                    method: "qpay",
                                    room: "all",
                                  },
                                ],
                              },
                            },
                            processId: Math.random().toString(),
                          },
                        });
                        router.push(
                          `https://pms-client.erxes.io/${locale}/booking/confirmation/${dealId}`
                        );
                      }
                    },
                  });
                }}
              >
                Check payment
              </Button>
            ) : (
              <div></div>
              // <Button>Close</Button>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};
export default CheckoutForm;
