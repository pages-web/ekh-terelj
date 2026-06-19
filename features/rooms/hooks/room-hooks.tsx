import { reserveGuestAndRoomAtom } from "@/features/booking/store/reserve";
import {
  selectedRoomAtom,
  selectedRoomsAtom,
} from "@/features/booking/store/rooms";
import { IExtra, IProduct, IRoom } from "@/features/rooms/types";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useAddRoomExtras = ({ extra }: { extra: IExtra }) => {
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [selectedRoom, setSelectedRoom] = useAtom(selectedRoomAtom);

  const HandleAddRoomExtras = () => {
    setIsAdd(!isAdd);
    isAdd
      ? setSelectedRoom({
          room: selectedRoom.room,
          extras: selectedRoom.extras
            ? [
                ...selectedRoom.extras,
                {
                  ...extra,
                  information: { parentId: selectedRoom.room?._id },
                },
              ]
            : [
                {
                  ...extra,
                  information: { parentId: selectedRoom.room?._id },
                },
              ],
        })
      : setSelectedRoom({
          room: selectedRoom.room,
          extras: selectedRoom.extra.filter(
            (item: IProduct) => item._id !== extra._id
          ),
        });
  };

  return { isAdd, HandleAddRoomExtras };
};

export const useSelectRoom = ({ room }: { room: IRoom }) => {
  const tBooking = useTranslations("Booking");
  const [selectedRooms, setSelectedRooms] = useAtom(selectedRoomsAtom);
  const [reserveGuestAndRoom] = useAtom(reserveGuestAndRoomAtom);

  const HandleSelectRoom = () => {
    if (reserveGuestAndRoom.room === 1) {
      setSelectedRooms([{ room, extras: [] }]);
      return;
    }

    if (
      selectedRooms.some((selectedRoom) => selectedRoom.room?._id === room._id)
    ) {
      setSelectedRooms((rooms) =>
        rooms.map((selectedRoom) =>
          selectedRoom.room?._id === room._id
            ? { ...selectedRoom, room }
            : selectedRoom
        )
      );
      return;
    }

    if (selectedRooms.length >= reserveGuestAndRoom.room) {
      toast.error(tBooking("roomSelectionFull"), {
        description: tBooking("roomSelectionFullDescription"),
      });
      return;
    }

    setSelectedRooms((rooms) => [...rooms, { room, extras: [] }]);
  };

  return { HandleSelectRoom };
};
