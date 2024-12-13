"use client";

import { CircleAlert, Utensils } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "../ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useAtom } from "jotai";
import PopupOfferDetail from "../popup-offer-detail/popup-offer-detail";
import OfferDetailsButton from "../offer-details-button/offer-details-button";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/others/use-media-query";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/products";
import { toggleSelectRateAtom } from "@/store/other";

const FormSchema = z.object({
  mealType: z.enum(["buffet", "continental"]),
});

const SelectRateCard = ({
  className,
  room,
  index,
}: {
  className?: string;
  room: IProduct;
  index: number;
}) => {
  const [toggleSelectRate, setToggleSelectRate] = useAtom(toggleSelectRateAtom);
  // const [mealType, setMealType] = useAtom(reserveMealTypeAtom);
  // const [selectedRoom, setSelectedRoom] = useAtom(selectedRoomAtom);

  const router = useRouter();

  const isMobileLg = useMediaQuery("(min-width: 768px)");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mealType: "buffet",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // setMealType(data);
    router.push("/booking/your-details");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`border rounded-xl shadow-lg transition-[height] overflow-hidden duration-300 ${
          toggleSelectRate
            ? `${isMobileLg ? "h-[175px]" : "h-[285px]"}`
            : "h-0 border-white"
        } ${className}`}
      >
        <div className="p-4 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-textxl">Standard Rate</h2>
            <OfferDetailsButton />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                <h3 className="text-textxl">Meal type</h3>
              </div>
              <FormField
                control={form.control}
                name="mealType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        className="w-full text-textsm"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="buffet" id="buffet" />
                          <Label htmlFor="buffet">Buffet Breakfast</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="continental"
                            id="continental"
                          />
                          <Label htmlFor="continental">
                            Continental Breakfast
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex gap-2">
                <div className="flex gap-1 items-center leading-none text-black/60">
                  <CircleAlert className="min-w-4 min-h-4" />
                  <span className="text-textxs w-[70px]">
                    {/* {`${selectedRoom?.unitPrice}₮ MNT per night`} */}
                  </span>
                </div>
                <h1 className="text-textxl md:text-displaysm font-bold text-end w-full">
                  {/* {`MNT ${selectedRoom?.unitPrice}₮`} */}
                </h1>
              </div>

              <Button
                variant={"secondary"}
                className="text-[16px] h-full md:py-4 md:w-fit w-full"
                type="submit"
              >
                Book now
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default SelectRateCard;
