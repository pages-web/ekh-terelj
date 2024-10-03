import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CheckinPart = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-cols-2 gap-6 px-1">
      <FormField
        control={form.control}
        name="arrivalTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-textxs">
              Estimated time of arrival (optional)
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your time"
                {...field}
                className="text-textsm"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="departureTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-textxs">
              Estimated time of departure (optional)
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your time"
                {...field}
                className="text-textsm"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
export default CheckinPart;
