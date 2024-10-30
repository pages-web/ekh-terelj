import { IReserveCount } from "@/types";
import { IProduct } from "@/types/products";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { DateRange } from "react-day-picker";

export const reserveCountAtom = atomWithStorage<IReserveCount | any>(
  "reserveCount",
  {}
);
export const reserveMealTypeAtom = atomWithStorage<any>(
  "reserveMealType",
  null
);

export const selectedRoomAtom = atomWithStorage<IProduct | any>(
  "selectedRoom",
  {}
);

export const reserveDateAtom = atomWithStorage<DateRange | any>(
  "reserveDate",
  {}
);
export const reserveExtrasAtom = atom<any>([]);
export const reserveUserAtom = atom<any>([]);
export const reserveCompletedAtom = atom<boolean>(false);

export const selectedExtras: any = [];
