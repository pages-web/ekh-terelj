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
import { CheckCircle, MailIcon } from "lucide-react";
import { useUserEdit } from "@/sdk/mutations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { LoadingIcon } from "@/components/ui/loading";

const formSchema = z.object({
  email: z.string().email(),
});

const ChangeEmail = () => {
  const { email, _id } = useAtomValue(currentUserAtom) || {};
  const { editUser, loading } = useUserEdit();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      email: email || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    editUser({
      variables: {
        email: values.email,
        _id,
      },
    });
  }
  return (
    <Form {...form}>
      <form
        className="flex items-center justify-center flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="John@doe.mn"
                    {...field}
                    autoComplete="email"
                    className="min-w-80 h-12 pl-6 pr-12 disabled:opacity-100"
                  />
                  <CheckCircle className="h-5 w-5 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size="lg" disabled={loading}>
          {loading && <LoadingIcon />}
          Change email address
        </Button>
      </form>
    </Form>
  );
};

export default ChangeEmail;
