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
import CheckinPart from "./checkin-part/checkin-part";
import PaymentPart from "./payment-part/payment-part";

const FormSchema = z.object({
  firstname: z.string().min(1, { message: "Firsname" }),
  lastname: z.string().min(1, { message: "Lastname" }),
  mail: z.string().email(),
  phone: phoneZod,
  description: z.string().max(250).optional(),
  arrivalTime: z.string().optional(),
  departureTime: z.string().optional(),
});

const CheckoutForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      mail: "",
      phone: "",
      description: "",
      arrivalTime: "",
      departureTime: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  const titles = [
    {
      title: "Your personal information",
      content: <PersonalInfoPart form={form} />,
    },
    { title: "When can you check in?", content: <CheckinPart form={form} /> },
    { title: "Payment method", content: <PaymentPart /> },
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
      </form>
    </Form>
  );
};
export default CheckoutForm;
