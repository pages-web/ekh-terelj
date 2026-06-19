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
import { useAtomValue } from "jotai";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { currentUserAtom } from "@/store/auth";
import { reserveDetailSchema } from "@/lib/schema";
import useAddDeal from "@/sdk/hooks/useAddDeal";
import { Loading } from "../ui/loading";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const CheckoutForm = () => {
  const tBooking = useTranslations("Booking");
  const tCheckout = useTranslations("Checkout");
  const tForms = useTranslations("Forms");
  const router = useRouter();
  const [isMyself, setIsMyself] = useState(true);

  const { handleAddDeal, loading: addDealLoading } = useAddDeal();
  const { firstName, lastName, email, phone } =
    useAtomValue(currentUserAtom) || {};

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
    try {
      const newDealId = await handleAddDeal({ description });

      if (newDealId) {
        router.push(`/profile/bookings/${newDealId}`);
      } else {
        toast.error("Could not complete booking");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not complete booking",
      );
    }
  }

  const loading = addDealLoading;

  const accordions = [
    {
      title: tCheckout("yourPersonalInformation"),
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
                        {tCheckout("bookingForMyself")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="someone" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {tCheckout("bookingForSomeone")}
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
              <h1>{tForms("guestDetails")}</h1>
              <div className="grid grid-cols-6 gap-6 px-1 mb-3">
                <FormField
                  control={form.control}
                  name="guestFirstname"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel className="text-textxs">
                        {tCheckout("guestFirstName")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tForms("guestFirstNamePlaceholder")}
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
                        {tCheckout("guestLastName")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tForms("guestLastNamePlaceholder")}
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
                        {tCheckout("guestEmail")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tForms("guestEmailPlaceholder")}
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
      title: tCheckout("additionalComments"),
      content: (
        <div className="border rounded-lg p-6 shadow-sm">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-textsm">
                  {tBooking("specialRequests")}{" "}
                  {!!field.value?.length && (
                    <span className="text-[10px] leading-2 text-black/60">
                      {field.value?.length}/250
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={tForms("specialRequestsPlaceholder")}
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
      title: tCheckout("payment"),
      content: <PaymentPart />,
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-1 space-y-6">
        <h1 className="text-displayxs">{tForms("checkInGuestInformation")}</h1>
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
            <h2 className="text-black text-textxl">{tBooking("cancellationPolicy")}</h2>
            <ul className="list-disc pl-7 text-black/70 text-textsm">
              <li>{tCheckout("nonRefundablePolicy")}</li>
              <li>{tBooking("lateCheckPolicy")}</li>
              <li>{tBooking("extensionPolicy")}</li>
            </ul>
          </div>
        </div>

        <Button size={"lg"} className="w-full" type="submit" disabled={loading}>
          {loading ? <Loading /> : tCheckout("confirmBooking")}
        </Button>
      </form>
    </Form>
  );
};
export default CheckoutForm;
