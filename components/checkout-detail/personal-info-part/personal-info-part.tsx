"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { useAtomValue } from "jotai";
import { reserveUserAtom } from "@/store/reserve";

const PersonalInfoPart = ({ form }: { form: any }) => {
  const reserveUser = useAtomValue(reserveUserAtom);
  return (
    <>
      <div className="grid grid-cols-7 gap-6 px-1 mb-3">
        <FormField
          control={form.control}
          name="speaking"
          render={({ field }) => (
            <FormItem className=" col-span-3 xl:col-span-1 ">
              <FormLabel className="text-textxs">Honorific</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="text-textsm">
                  <SelectTrigger>
                    <SelectValue placeholder=" " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Mr.">Mr.</SelectItem>
                  <SelectItem value="Ms.">Ms.</SelectItem>
                  <SelectItem value="Mrs.">Mrs.</SelectItem>
                  <SelectItem value="Dr.">Dr.</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="col-span-4 xl:col-span-6">
              <FormLabel className="text-textxs">First name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your first name"
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
          name="lastname"
          render={({ field }) => (
            <FormItem className="col-span-7">
              <FormLabel className="text-textxs">Last name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your last name"
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
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-textxs">E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-textxs">Enter your phone</FormLabel>
              <FormControl>
                <PhoneInput
                  international
                  className="text-textsm"
                  placeholder="Enter your phone"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-textxs">
                Special requests (optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Limit 250 characters"
                  {...field}
                  className="text-textsm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
export default PersonalInfoPart;
