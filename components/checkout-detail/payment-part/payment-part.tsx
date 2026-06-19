import { isPrePaymentAtom } from "@/store/payments";
import { useSetAtom } from "jotai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { useTranslations } from "next-intl";

const PaymentPart = () => {
  const t = useTranslations("Checkout");
  const setIsPrePayment = useSetAtom(isPrePaymentAtom);

  return (
    <div className="border rounded-lg p-6 shadow-sm space-y-4">
      <RadioGroup
        className="flex flex-col space-y-1"
        defaultValue="full"
        onValueChange={(value) =>
          value === "full" ? setIsPrePayment(false) : setIsPrePayment(true)
        }
      >
        <FormItem className="flex items-center space-x-3 space-y-0">
          <FormControl>
            <RadioGroupItem value="full" />
          </FormControl>
          <FormLabel className="font-normal">{t("fullPayment")}</FormLabel>
        </FormItem>
        <FormItem className="flex items-center space-x-3 space-y-0">
          <FormControl>
            <RadioGroupItem value="pre" />
          </FormControl>
          <FormLabel className="font-normal">{t("prePayment")}</FormLabel>
        </FormItem>
      </RadioGroup>
    </div>
  );
};
export default PaymentPart;
