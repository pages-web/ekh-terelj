import { reserveGuestAndRoomAtom } from "@/store/reserve";
import {
  addSelectedRoomAtom,
  selectedRoomAtom,
  selectedRoomsAtom,
} from "@/store/rooms";
import { IExtra, IProduct, IRoom } from "@/types/products";
import { useAtom } from "jotai";
import { useState } from "react";
import { useToast } from "../others/use-toast";
import { RESET } from "jotai/utils";

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
  const [selectedRoom, setSelectedRoom] = useAtom(selectedRoomAtom);
  const [selectedRooms, setSelectedRooms] = useAtom(selectedRoomsAtom);
  const [reserveGuestAndRoom] = useAtom(reserveGuestAndRoomAtom);
  const [, addSelectedRoom] = useAtom(addSelectedRoomAtom);

  const { toast } = useToast();
  const HandleSelectRoom = () => {
    setSelectedRoom({
      ...selectedRoom,
      room: room,
    });
    addSelectedRoom(reserveGuestAndRoom.room);
    setSelectedRoom(RESET);
    selectedRooms.length >= reserveGuestAndRoom.room &&
      toast({
        variant: "destructive",
        title: "It's full",
        description: "You can't add more rooms",
      });
  };

  return { HandleSelectRoom };
};
