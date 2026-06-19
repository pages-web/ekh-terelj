import { z } from "zod";

import { passwordZod, phoneZod } from "@/lib/zod";

export const loginFormSchema = z.object({
  login: z
    .string()
    .min(1, { message: "Нэвтрэх нэрээ оруулна уу" })
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+|[0-9]{6,}$/,
      "Буруу утас эсвэл цахим хаяг",
    ),
  password: z.string().min(1, { message: "Нууц үгээ оруулна уу" }),
});

const registerBaseSchema = z.object({
  firstName: z.string().min(1, { message: "Нэрээ оруулна уу" }),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  password: passwordZod,
});

export const registerFormSchema = z.object({
  firstName: z.string().min(1, { message: "Нэрээ оруулна уу" }),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  password: passwordZod,
});

export const getRegisterFormSchema = (locale: string) =>
  registerBaseSchema.superRefine((values, ctx) => {
    if (locale === "mn") {
      const phone = values.phone?.trim();
      const result = phoneZod.safeParse(phone);

      if (!result.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Зөв утасны дугаар оруулна уу",
        });
      }

      return;
    }

    const email = values.email?.trim();

    if (!email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Email is required",
      });
      return;
    }

    if (!z.string().email().safeParse(email).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Enter a valid email address",
      });
    }
  });
