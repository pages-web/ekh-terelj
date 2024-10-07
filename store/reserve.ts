import { addDays } from "date-fns";
import { atom } from "jotai";
import { DateRange } from "react-day-picker";

export const reserveDateAtom = atom<DateRange | undefined>();
export const reserveCountAtom = atom<any>();
export const reserveMealTypeAtom = atom<any>();
