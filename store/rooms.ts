import { IReserveRoomFullDetail } from "@/types/products";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

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

export const selectedExtras: any = [];
export const dealIdAtom = atomWithStorage<string>("dealId", "");
export const dealDurationAtom = atom<number>(1800);
