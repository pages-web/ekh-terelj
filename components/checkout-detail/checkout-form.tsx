"use client";
import { phoneZod } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormDescription } from "@/components/ui/form";
import PersonalInfoPart from "./personal-info-part/personal-info-part";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import PaymentPart from "./payment-part/payment-part";
import ExtraServices from "./extra-services/extra-services";
import { BookingFormT, ExtraT } from "@/lib/schema/types";
import { formatToDate, parseDate } from "@/lib/date";
import { addDays, formatDistance } from "date-fns";
import { useAtom } from "jotai";
import {
  dealIdAtom,
  reserveCompletedAtom,
  reserveCountAtom,
  reserveDateAtom,
  reserveExtrasAtom,
  reserveUserAtom,
  selectedRoomAtom,
} from "@/store/reserve";
import { useCreateEditDeal, useStages } from "@/sdk/queries/sales";
import { MutationHookOptions, useMutation, useQuery } from "@apollo/client";
import { mutations } from "@/sdk/graphql/sales";
import { IStage } from "@/types/sales";
import useCreateCustomer from "@/sdk/mutations/customers";
import { useEffect, useState } from "react";
import useCustomers from "@/sdk/queries/customers";
import { useRouter } from "@/i18n/routing";
import { queries } from "@/sdk/graphql/payments";
import { queries as salesQueries } from "@/sdk/graphql/sales";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FormSchema = z.object({
  speaking: z.string(),
  firstname: z.string().min(1, { message: "Firstname" }),
  lastname: z.string().min(1, { message: "Lastname" }),
  mail: z.string().email(),
  phone: phoneZod,
  description: z.string().max(250).optional(),
});

const CheckoutForm = () => {
  const router = useRouter();
  const [selectedRoom] = useAtom(selectedRoomAtom);
  const [date] = useAtom(reserveDateAtom);
  const [reserveCount] = useAtom(reserveCountAtom);
  const [reserveUser, setReserveUser] = useAtom(reserveUserAtom);
  const [reserveExtras, setReserveExtras] = useAtom(reserveExtrasAtom);
  const [reserveCompleted, setReserveCompleted] = useAtom(reserveCompletedAtom);
  const [dealId, setDealId] = useAtom(dealIdAtom);
  const [customerId, setCustomerId] = useState();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      speaking: reserveUser.speaking,
      firstname: reserveUser.firstname,
      lastname: reserveUser.lastname,
      mail: reserveUser.mail,
      phone: reserveUser.phone,
      description: reserveUser.description,
    },
  });

  const [addDeal, { loading }] = useMutation(mutations.dealsAdd);
  const [editDeal] = useMutation(mutations.dealsEdit, {
    variables: { id: dealId },
  });
  const { data: currentDeal } = useQuery(salesQueries.dealDetail, {
    variables: { id: dealId },
  });
  const { data } = useQuery(queries.payments);
  const { stages, loading: stagesLoading } = useStages();
  const { createCustomer, error } = useCreateCustomer();
  // const { getCustomers, customers } = useCustomers();

  const nights = parseInt(date?.from && formatDistance(date?.from, date?.to));

  const selectedRoomByMutation = {
    productId: selectedRoom?._id,
    startDate: date?.from,
    endDate: date?.to,
    unitPrice: selectedRoom?.unitPrice,
    quantity: nights,
    amount: selectedRoom?.unitPrice * nights,
    uom: selectedRoom?.uom,
    tickUsed: true,
    information: {
      adults: reserveCount?.adults,
      children: reserveCount?.children,
    },
  };

  const selectedExtrasByMutation = reserveExtras?.flatMap((extra: any) => {
    return {
      productId: extra?._id,
      quantity: 1,
      name: extra?.name,
      unitPrice: extra?.unitPrice,
      amount: extra?.unitPrice * 1,
      information: {
        parentId: selectedRoom?._id,
      },
    };
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setReserveUser(data);

    createCustomer({
      variables: {
        firstName: data.firstname,
        lastName: data.lastname,
        primaryEmail: data.mail,
        primaryPhone: data.phone,
      },
      onCompleted: (customer) => {
        setCustomerId(customer?.customersAdd?._id);
      },
    });

    const variables = {
      name: `${data.speaking} ${data.firstname} ${data.lastname}`,
      customerIds: [customerId && customerId],
      productsData: [selectedRoomByMutation, selectedExtrasByMutation]?.flatMap(
        (item) => item
      ),
      stageId: stages?.find((st: IStage) => st.code === "unconfirmed")?._id,
      startDate: date?.from,
      closeDate: date?.to,
      description: data.description,
    };

    if (!currentDeal?.dealDetail) {
      addDeal({
        variables,
        onCompleted: (deal) => {
          setReserveCompleted(true);
          setDealId(deal?.dealsAdd?._id);
        },
      });
    } else {
      editDeal({
        variables,
        onCompleted: () => {
          setReserveCompleted(true);
        },
      });
    }
  }
  const titles = [
    // { title: "Additional Services", content: <ExtraServices form={form} /> },
    {
      title: "Your personal information",
      content: <PersonalInfoPart form={form} />,
    },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-1 space-y-6">
        <Accordion type={"multiple"} className="w-full">
          {titles.map((title, index) => {
            return (
              <AccordionItem
                value={`item-${index}`}
                className="border-none"
                key={index}
              >
                <AccordionTrigger className="text-textlg md:text-displayxs">
                  {title.title}
                </AccordionTrigger>
                <AccordionContent>{title.content}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <div className="space-y-3">
          <h2 className="text-black text-displayxs">Cancellation policy</h2>
          <ul className="list-disc pl-7 text-black/70 text-textmd">
            <li>
              This rate is non-refundable. If you change or cancel your booking
              you will not get a refund or credit to use for a future stay. This
              policy will apply regardless of COVID-19, subject to any local
              consumer laws.
            </li>
            <li>
              No refunds will be issued for late check-in or early check-out.
            </li>
            <li>Stay extensions require a new reservation.</li>
          </ul>
          <p className="text-black/70 text-textmd">
            By clicking on the button below, I acknowledge that I have reviewed
            the{" "}
            <a href="" className="underline">
              Privacy Statement Opens in a new window
            </a>
             and{" "}
            <a href="" className="underline">
              Government Travel Advice Opens in a new window.
            </a>
          </p>
        </div>
        <Button size={"lg"} className="w-full" type="submit">
          Confirm Booking
        </Button>
        <Dialog
          onOpenChange={setReserveCompleted}
          open={reserveCompleted ? true : false}
          // defaultOpen
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-destructive">
                Don't close until pay
              </DialogTitle>
            </DialogHeader>
            <PaymentPart paymentsData={data?.payments} />
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};
export default CheckoutForm;
