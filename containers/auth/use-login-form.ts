"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLogin } from "@/sdk/mutations/auth";
import { loginFormSchema } from "./auth.schema";
import type { LoginFormValues } from "./auth.types";
import { buildLoginVariables } from "./auth.utils";

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const { login, loading } = useLogin();

  function onSubmit(values: LoginFormValues) {
    login({
      variables: buildLoginVariables(values),
    });
  }

  return { form, loading, onSubmit };
};
