import { IInvoice } from "@/types/payments";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const paymentSuccessAtom = atom<boolean>(false);
export const openMethodsAtom = atom<boolean>(true);
export const openDetailAtom = atom<boolean>(false);
export const showSuccessAtom = atom<boolean>(false);
export const selectedMethodAtom = atom<string>("");
export const selecteddMethodAtom = atom<any>({});
export const invoiceDetailAtom = atom<IInvoice | null>(null);

export const handleMethodAtom = atom(
  (get) => get(selectedMethodAtom),
  (_, set, method: string) => {
    set(selectedMethodAtom, method);
    if (method) {
      set(openMethodsAtom, false);
      set(openDetailAtom, true);
    } else {
      set(openMethodsAtom, true);
      set(openDetailAtom, false);
    }
  }
);

export const paymentTypeAtom = atom<string>("full");
export const selectedMethodCardAtom = atom<string>("Card");
export const totalAmountAtom = atomWithStorage<number>("totalAmount", 0);