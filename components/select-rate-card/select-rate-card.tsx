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
import { reserveMealTypeAtom } from "@/store/reserve";
import PopupOfferDetail from "../popup-offer-detail/popup-offer-detail";
import OfferDetailsButton from "../offer-details-button/offer-details-button";
import { Link } from "@/i18n/routing";

const FormSchema = z.object({
  mealType: z.enum(["buffet", "continental"]),
});

const SelectRateCard = () => {
  const [mealType, setMealType] = useAtom(reserveMealTypeAtom);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mealType: "buffet",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setMealType(data);
    console.log(mealType);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <h2 className="text-textxl">Standard Rate</h2>
          <OfferDetailsButton />
        </div>
        <Separator className="my-4" />

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
                    className="w-full flex justify-between text-textsm"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buffet" id="buffet" />
                      <Label htmlFor="buffet">Buffet Breakfast</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="continental" id="continental" />
                      <Label htmlFor="continental">Continental Breakfast</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-displaysm font-bold">1,200,000₮ MNT</h1>
            <div className="flex gap-1 items-center leading-none text-black/60">
              <CircleAlert className="w-4 h-4" />
              <span className="text-textxs">1,200,000₮ MNT per night</span>
            </div>
          </div>

          <Link href={`/your-details`}>
            <Button variant={"secondary"} className="text-[14px]" type="submit">
              Book now
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};
export default SelectRateCard;
