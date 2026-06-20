"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";

import { useLogin } from "@/features/auth/hooks/auth-mutations";
import { getLoginFormSchema } from "./auth.schema";
import type { LoginFormValues } from "./auth.types";
import { buildLoginVariables } from "./auth.utils";

export const useLoginForm = () => {
  const locale = useLocale();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginFormSchema(locale)),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const { login, loading } = useLogin();

  function onSubmit(values: LoginFormValues) {
    login({
      variables: buildLoginVariables(values, locale),
    });
  }

  return { form, loading, onSubmit };
};
