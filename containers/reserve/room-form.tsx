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
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { reserveGuestAndRoomAtom } from "@/store/reserve";
import { useTranslations } from "next-intl";
const FormSchema = z.object({
  pet: z.boolean().default(false),
  room: z.number().min(0),
  adults: z.number().min(0),
  children: z.number().min(0),
});

const RoomForm = () => {
  const t = useTranslations("Booking");
  const tCommon = useTranslations("Common");
  const [reserveGuestAndRoom, setReserveGuestAndRoom] = useAtom(
    reserveGuestAndRoomAtom
  );

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
          <h2 className="text-textxl">{t("room")}</h2>
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CountField title={t("room")} field={field} />
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
export default RoomForm;
