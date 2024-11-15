import { Customer } from "@/types/auth";
import { atom } from "jotai";
import { IConfig } from "@/types/auth";

export const currentUserAtom = atom<Customer | null>(null);

export const loadingUserAtom = atom<boolean>(true);

export const refetchCurrentUserAtom = atom<boolean>(false);

export const configAtom = atom<IConfig | null>(null);

export const deliveryItemIdAtom = atom((get) => {
  const config = get(configAtom);
  const { productId: deliveryProductId } = config?.deliveryConfig || {};
  return deliveryProductId;
});

export const checkRemainderAtom = atom(
  (get) => get(configAtom)?.isCheckRemainder
);
