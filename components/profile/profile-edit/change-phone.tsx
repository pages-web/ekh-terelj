"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { currentUserAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { SmartphoneIcon } from "lucide-react";
import { useUserEdit } from "@/sdk/mutations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneZod } from "@/lib/zod";
import { LoadingIcon } from "@/components/ui/loading";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  phone: phoneZod,
});

const ChangePhone = () => {
  const { phone, _id } = useAtomValue(currentUserAtom) || {};
  const { editUser, loading } = useUserEdit();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      phone: phone || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    editUser({
      variables: { _id, phone: values.phone },
    });
  }
  return (
    <Form {...form}>
      <form
        className="flex items-center justify-center py-12 flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <SmartphoneIcon className="h-8 w-8 text-black/60" strokeWidth={1.7} />
        <div className="text-center space-y-1 mb-4">
          <h3 className="font-medium">Enter a number</h3>
          <div className="text-sm text-black/50">
            You need to submit a request only from the mobile number in your
            name.
          </div>
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={8}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.slice(0, 4).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(4).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                    </>
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading}>
          {loading && <LoadingIcon />}
          Change your phone
        </Button>
      </form>
    </Form>
  );
};

export default ChangePhone;
