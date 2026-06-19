"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/features/auth/store";
import { useUserEdit } from "@/features/auth/hooks/auth-mutations";
import { useTranslations } from "next-intl";

const ProfileEdit = () => {
  const t = useTranslations("Forms");
  const formSchema = z.object({
    firstName: z.string().min(1, { message: t("firstNameRequired") }),
    lastName: z.string(),
  });
  const { firstName, lastName, _id } = useAtomValue(currentUserAtom) || {};
  const { editUser, loading } = useUserEdit();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      firstName: firstName || "",
      lastName: lastName || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    editUser({ variables: { ...values, _id } });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6 relative max-w-xl"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("firstName")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("firstNamePlaceholder")}
                  {...field}
                  autoComplete="given-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("lastName")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("lastNamePlaceholder")}
                  {...field}
                  autoComplete="family-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading}>{t("saveChanges")}</Button>
      </form>
    </Form>
  );
};

export default ProfileEdit;
