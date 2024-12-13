"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCurrentUser } from "@/sdk/queries/auth";

const PersonalInfoPart = ({ form }: { form: any }) => {
  const { currentUser } = useCurrentUser();
  return (
    <div>
      <div className="grid grid-cols-6 gap-6 px-1 mb-3">
        {/* <FormField
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
        /> */}

        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="col-span-3">
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
            <FormItem className="col-span-3">
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
              <FormLabel className="text-textxs">Phone number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your phone"
                  {...field}
                  autoComplete="tel-national"
                />
                {/* <PhoneInput
                  international
                  className="text-textsm"
                  placeholder="Enter your phone"
                  {...field}
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
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
        /> */}
      </div>
    </div>
  );
};
export default PersonalInfoPart;
