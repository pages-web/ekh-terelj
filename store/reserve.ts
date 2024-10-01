import { addDays } from "date-fns";
import { atom } from "jotai";
import { DateRange } from "react-day-picker";

export const reserveDateAtom = atom<DateRange | undefined>({
  from: new Date(2022, 0, 20),
  to: addDays(new Date(2022, 0, 20), 20),
});

export const reserveGuestsRoomCountAtom = atom<number>(0);
export const reserveGuestsAdultCountAtom = atom<number>(0);
export const reserveGuestsChildrenCountAtom = atom<number>(0);
export const reserveGuestsPetAtom = atom<boolean>(false);
