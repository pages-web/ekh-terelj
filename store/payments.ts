import { IInvoice } from "@/types/payments";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const paymentSuccessAtom = atom<boolean>(false);
export const openMethodsAtom = atom<boolean>(true);
export const openDetailAtom = atom<boolean>(false);
export const showSuccessAtom = atom<boolean>(false);
export const invoiceDetailAtom = atom<IInvoice | null>(null);

export const selectedPaymentAtom = atom<string>("");
export const isPrePaymentAtom = atom<boolean>(false);
export const totalAmountAtom = atomWithStorage<number>("totalAmount", 0);
