import { z } from "zod";
import { phoneZod } from "@/lib/validations/shared";

const stringFromNullable = (value: unknown) => value ?? "";
const optionalEmail = z.preprocess(
  (value) => (value === null || value === "" ? undefined : value),
  z.string().email().optional(),
);
const optionalPhone = z.preprocess(
  (value) => (value === null || value === "" ? undefined : value),
  phoneZod.optional(),
);

export const dateSchema = z.string({ required_error: "" }).date("Буруу огноо");

export const customerSchema = z.object({
  fullname: z.string(),
  customerId: z.string(),
});

export const guestSchema = customerSchema.extend({
  isChild: z.boolean(),
});

export const addCustomerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  address: z.string(),
});

export const extraSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  count: z.number().min(1),
  unitPrice: z.number(),
});

export const addGuestSchema = addCustomerSchema
  .extend({
    isChild: z.boolean(),
    age: z.number(),
  })
  .refine((val) => val.isChild && !val.age, {
    path: ["age"],
    message: "Насыг оруулна уу",
  });

export const roomSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  roomId: z.string().min(1),
  unitPrice: z.number().positive("Нэгжийн үнэ нь эерэг тоо байх ёстой"),
  extras: z.array(extraSchema),
  guests: z.array(guestSchema),
});

export const bookingSchema = z.object({
  source: z.string().min(1),
  reference: z.string().optional(),
  // contact: z.string(),
  description: z.string().optional(),
  rooms: z.array(roomSchema),
  customers: z.array(customerSchema),
});

export const addProductFormSchema = z.object({
  name: z.string().min(1),
  unitPrice: z.number().positive("Нэгжийн үнэ нь эерэг тоо байх ёстой"),
  code: z.string().min(1),
  uom: z.string().min(1),
  categoryId: z.string().min(1),
});

export const addPaymentSchema = z.object({
  method: z.string().min(1),
  amount: z.number().min(1, "Дүн нь тэгээс их байх ёстой"),
  paidBy: z.string().optional(),
  description: z.string().optional(),
  room: z.string().min(1),
});

const reserveDetailBaseSchema = z.object({
  forWho: z.string(),
  firstname: z.preprocess(
    stringFromNullable,
    z.string().min(1, { message: "Firstname" }),
  ),
  lastname: z.preprocess(
    stringFromNullable,
    z.string().min(1, { message: "Lastname" }),
  ),
  description: z.string().max(250).optional(),
  guestFirstname: z.string().optional(),
  guestLastname: z.string().optional(),
  guestMail: optionalEmail,
});

export const getReserveDetailSchema = (locale: string) =>
  reserveDetailBaseSchema.extend({
    mail:
      locale === "mn"
        ? optionalEmail
        : z.preprocess(stringFromNullable, z.string().email()),
    phone:
      locale === "mn" ? z.preprocess(stringFromNullable, phoneZod) : optionalPhone,
  });

export const reserveDetailSchema = getReserveDetailSchema("mn");
export type ReserveDetailFormValues = z.infer<
  ReturnType<typeof getReserveDetailSchema>
>;
