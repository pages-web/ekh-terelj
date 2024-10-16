import { z } from "zod";
import {
  addCustomerSchema,
  addPaymentSchema,
  addProductFormSchema,
  bookingSchema,
  extraSchema,
  roomSchema,
} from ".";

export type BookingFormT = z.infer<typeof bookingSchema>;
export type ExtraT = z.infer<typeof extraSchema>;
export type AddCustomerFormT = z.infer<typeof addCustomerSchema>;
export type AddProductFormT = z.infer<typeof addProductFormSchema>;
export type RoomT = z.infer<typeof roomSchema>;
export type AddPaymentFormT = z.infer<typeof addPaymentSchema>;
