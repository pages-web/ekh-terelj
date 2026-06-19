"use client";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import CountField from "@/components/count-field/count-field";
import { PopoverClose } from "@/components/ui/popover";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { reserveGuestAndRoomAtom } from "@/features/booking/store/reserve";
import { useTranslations } from "next-intl";
const FormSchema = z.object({
  pet: z.boolean().default(false),
  room: z.number().min(0),
  adults: z.number().min(0),
  children: z.number().min(0),
});

const GuestForm = () => {
  const t = useTranslations("Booking");
  const tCommon = useTranslations("Common");
  const [reserveGuestAndRoom, setReserveGuestAndRoom] = useAtom(reserveGuestAndRoomAtom);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pet: reserveGuestAndRoom?.pet || false,
      room: reserveGuestAndRoom?.room || 1,
      adults: reserveGuestAndRoom?.adults || 1,
      children: reserveGuestAndRoom?.children || 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setReserveGuestAndRoom(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-6 ">
          <div className="flex flex-col gap-3">
            <h2 className="text-textxl">{t("guests")}</h2>
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CountField title={t("adults")} field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CountField title={t("children")} field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="pet"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end justify-between space-x-3 space-y-0 rounded-md">
                <div>
                  <FormLabel className="font-bold">{t("petFriendly")}</FormLabel>
                  <FormDescription>
                    {t("petFriendlyDescription")}
                  </FormDescription>
                </div>
                <FormControl>
                  <Checkbox
                    type="submit"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-6 h-6"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <PopoverClose type="submit" className="self-end">
            <Button className="w-fit">{tCommon("apply")}</Button>
          </PopoverClose>
        </div>
      </form>
    </Form>
  );
};
export default GuestForm;
