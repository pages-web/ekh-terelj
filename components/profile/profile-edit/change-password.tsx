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
import * as z from "zod";
import { currentUserAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { useChangePassword, useUserEdit } from "@/sdk/mutations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Password } from "@/components/ui/password";
import { passwordZod } from "@/lib/zod";
import { toast } from "sonner";
import { LoadingIcon } from "@/components/ui/loading";
import { useTranslations } from "next-intl";

const ChangePassword = () => {
  const t = useTranslations("Forms");
  const tAuth = useTranslations("Auth");
  const formSchema = z.object({
    currentPassword: z.string().min(1, t("passwordRequired")),
    newPassword: passwordZod,
    verifyPassword: passwordZod,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { changePassword, loading, clientPortalId } = useChangePassword();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { currentPassword, newPassword, verifyPassword } = values;

    if (newPassword !== verifyPassword)
      return toast.error(tAuth("passwordMismatch"));

    changePassword({
      variables: { clientPortalId, currentPassword, newPassword },
      onCompleted() {
        toast.success(t("passwordChanged"));
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6 md:grid grid-cols-2 gap-x-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("currentPassword")}</FormLabel>
              <FormControl>
                <Password {...field} autoComplete="current-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("newPassword")}</FormLabel>
              <FormControl>
                <Password {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="verifyPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("confirmNewPassword")}</FormLabel>
              <FormControl>
                <Password {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="border border-transparent flex items-end ">
          <Button className="mt-auto w-full" size="lg" disabled={loading}>
            {loading && <LoadingIcon />} {t("changePassword")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePassword;
