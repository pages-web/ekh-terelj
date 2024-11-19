import { IReserveCount } from "@/types";
import { IProduct, IReserveRoomFullDetail } from "@/types/products";
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

export const selectedRoomAtom = atomWithStorage<IReserveRoomFullDetail | any>(
  "selectedRoom",
  {}
);
export const selectedRoomsAtom = atomWithStorage<IReserveRoomFullDetail[]>(
  "selectedRooms",
  []
);

export const addSelectedRoomAtom = atom(
  () => "",
  (get, set, limit: number) => {
    if (limit <= get(selectedRoomsAtom).length) return console.log("it's full");
    if (!get(selectedRoomsAtom)) {
      set(selectedRoomsAtom, () => [get(selectedRoomAtom)]);
    } else {
      set(selectedRoomsAtom, () => [
        ...get(selectedRoomsAtom),
        get(selectedRoomAtom),
      ]);
    }
  }
);
export const removeSelectedRoomAtom = atom(
  () => "",
  (get, set, id: string) => {
    set(selectedRoomsAtom, () =>
      get(selectedRoomsAtom).filter((product) => product.room._id !== id)
    );
  }
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
