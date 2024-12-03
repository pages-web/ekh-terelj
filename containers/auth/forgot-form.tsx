"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useForgotPassword } from "@/sdk/mutations/auth";
import { LoadingIcon } from "@/components/ui/loading";
import { CheckCircle2Icon } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
});

const ForgotForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { loading, forgotPassword, clientPortalId, success } =
    useForgotPassword();

  function onSubmit(values: z.infer<typeof formSchema>) {
    forgotPassword({
      variables: { email: values.email, clientPortalId },
    });
  }

  if (success) {
    return (
      <div className="flex items-center flex-col">
        <CheckCircle2Icon
          className="text-green-500 animate-bounce h-12 w-12"
          strokeWidth={1.5}
        />
        <p className="text-base font-medium my-1 text-center">
          An email has been sent to you with a link to change your password.
        </p>
        <p className="text-sm text-neutral-500">
          Please check your email address.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john@doe.com"
                  {...field}
                  autoComplete="email"
                  className="py-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full col-span-2" size="lg" disabled={loading}>
          {loading && <LoadingIcon />}
          Recover password
        </Button>
      </form>
    </Form>
  );
};

export default ForgotForm;
