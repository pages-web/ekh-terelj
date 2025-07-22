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
import { useStages } from "@/sdk/queries/sales";
import { useMutation, useQuery } from "@apollo/client";
import { mutations } from "@/sdk/graphql/sales";
import { IStage } from "@/types/sales";
import { useState } from "react";
import { queries } from "@/sdk/graphql/payments";
import { useCurrentUser } from "@/sdk/queries/auth";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { currentUserAtom } from "@/store/auth";
import { totalAmountAtom } from "@/store/payments";
import { dealIdAtom } from "@/store/rooms";
import { reserveDetailSchema } from "@/lib/schema";
import useAddDeal from "@/sdk/hooks/useAddDeal";
import { Loading } from "../ui/loading";
import { useRouter } from "@/i18n/routing";

const CheckoutForm = () => {
  const router = useRouter();
  const [isMyself, setIsMyself] = useState(true);

  const { handleAddDeal, loading: addDealLoading } = useAddDeal();
  const { stages } = useStages();

  const dealId = useAtomValue(dealIdAtom);
  const { firstName, lastName, email, phone } =
    useAtomValue(currentUserAtom) || {};

  const [editDeal, { loading: editDealLoading }] = useMutation(
    mutations.dealsEdit
  );

  const form = useForm<z.infer<typeof reserveDetailSchema>>({
    resolver: zodResolver(reserveDetailSchema),
    defaultValues: {
      forWho: "myself",
      firstname: firstName,
      lastname: lastName,
      mail: email,
      phone: phone,
      description: "",
    },
  });

  async function onSubmit({
    description,
  }: z.infer<typeof reserveDetailSchema>) {
    const canceledStageId = stages?.find(
      (st: IStage) => st.code === "canceled"
    )?._id;

    if (dealId) {
      await editDeal({
        variables: { id: dealId, stageId: canceledStageId },
      });
    }

    const newDealId = await handleAddDeal({ description });

    if (newDealId) {
      router.push(`/profile/bookings/${newDealId}`);
    } else {
      console.error("newDealId is undefined");
    }
  }

  const loading = addDealLoading || editDealLoading;

  const accordions = [
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
      content: <PaymentPart />,
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-1 space-y-6">
        <h1 className="text-displayxs">Check-in guest information</h1>
        <Accordion
          type={"multiple"}
          className="w-full"
          defaultValue={["item-0", "item-2"]}
        >
          {accordions.map((accordion, index) => {
            return (
              <AccordionItem
                value={`item-${index}`}
                className="border-none"
                key={index}
              >
                <AccordionTrigger className="text-textlg md:text-textxl">
                  {accordion.title}
                </AccordionTrigger>
                <AccordionContent>{accordion.content}</AccordionContent>
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
        </div>

        <Button size={"lg"} className="w-full" type="submit" disabled={loading}>
          {loading ? <Loading /> : "Confirm Booking"}
        </Button>
      </form>
    </Form>
  );
};
export default CheckoutForm;
