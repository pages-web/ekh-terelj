import { IReserveCount } from "@/types";
import { IProduct } from "@/types/products";
import { IReserveUser } from "@/types/reserve";
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

export const reserveUserAtom = atomWithStorage<IReserveUser>("reserveUser", {
  speaking: "",
  firstname: "",
  lastname: "",
  mail: "",
  phone: "",
  description: "",
});

export const reserveExtrasAtom = atom<any>([]);
export const reserveCompletedAtom = atom<boolean>(false);

export const selectedExtras: any = [];
export const dealIdAtom = atomWithStorage<string>("dealId", "");
