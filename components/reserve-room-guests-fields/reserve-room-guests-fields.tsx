"use client";
import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { useAtom } from "jotai";
import {
  reserveGuestsAdultCountAtom,
  reserveGuestsChildrenCountAtom,
  reserveGuestsPetAtom,
  reserveGuestsRoomCountAtom,
} from "@/store/reserve";
import CountField from "../count-field/count-field";
import { PopoverClose } from "../ui/popover";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

const FormSchema = z.object({
  pet: z.boolean().default(false),
  room: z.number().min(0),
  adults: z.number().min(0),
  children: z.number().min(0),
});

const ReserveRoomGuestsFields = () => {
  const [room, setRoom] = useAtom(reserveGuestsRoomCountAtom);
  const [adults, setAdults] = useAtom(reserveGuestsAdultCountAtom);
  const [children, setChildren] = useAtom(reserveGuestsChildrenCountAtom);
  const [pet, setPet] = useAtom(reserveGuestsPetAtom);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pet: pet,
      room: room,
      adults: adults,
      children: children,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setRoom(data.room);
    setAdults(data.adults);
    setChildren(data.children);
    setPet(data.pet);
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-6 ">
          <div className="flex flex-col gap-3">
            <h2 className="text-textxl">Guests</h2>
            {/* <CountField title="Room" count={room} setCount={setRoom} />
            <CountField title="Adults" count={adults} setCount={setAdults} />
            <CountField
              title="Children"
              count={children}
              setCount={setChildren}
            /> */}
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CountField title="Room" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CountField title="Adults" field={field} />
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
                    <CountField title="Children" field={field} />
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
                  <FormLabel className="font-bold">Pet friendly</FormLabel>
                  <FormDescription>
                    Only show stays that allow pets
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
            <Button className="w-fit">Apply</Button>
          </PopoverClose>
        </div>
      </form>
    </Form>
  );
};
export default ReserveRoomGuestsFields;
