import {
  IReserveGuestAndRoom,
  IReserveInfo,
  IReserveUser,
} from "@/types/reserve";
import { formatDistance } from "date-fns";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { DateRange } from "react-day-picker";

export const reserveGuestAndRoomAtom = atomWithStorage<IReserveGuestAndRoom>(
  "reserveGuestAndRoomAtom",
  { pet: false, room: 0, adults: 0, children: 0 }
);

export const reserveDateAtom = atomWithStorage<DateRange | any>("reserveDate", {
  to: null,
  from: null,
});

export const reserveUserAtom = atomWithStorage<IReserveUser>("reserveUser", {
  speaking: "",
  firstname: "",
  lastname: "",
  mail: "",
  phone: "",
  description: "",
});

export const reserveCompletedAtom = atom<boolean>(false);
export const confirmBookingViewAtom = atom<string>("confirm");

export const nightsAtom = atom((get) => {
  const date = get(reserveDateAtom);
  return parseInt(
    date?.from && date?.to && formatDistance(date?.from, date?.to)
  );
});

export const reserveInfoAtom = atom<IReserveInfo>((get) => {
  const date = get(reserveDateAtom);
  const guests = get(reserveGuestAndRoomAtom);
  const nights = get(nightsAtom);
  return { ...date, ...guests, nights: nights };
});
