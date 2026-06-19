import type { z } from "zod";

import type { loginFormSchema, registerFormSchema } from "./auth.schema";

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
