import { useAtom, useAtomValue } from "jotai";
import Image from "../ui/image";
import { Separator } from "../ui/separator";
import {
  removeSelectedRoomAtom,
  reserveCountAtom,
  reserveDateAtom,
  selectedRoomAtom,
  selectedRoomsAtom,
} from "@/store/reserve";
import { Button } from "../ui/button";
import { RESET } from "jotai/utils";
import { formatDistance } from "date-fns";
import { X } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { formatNumberWithCommas } from "@/lib/formatNumber";

const SelectedRoomCard = () => {
  const router = useRouter();
  const [selectedRooms, setSelectedRooms] = useAtom(selectedRoomsAtom);
  const [reserveCount] = useAtom(reserveCountAtom);
  const [date, setDate] = useAtom(reserveDateAtom);
  const [, removeRoom] = useAtom(removeSelectedRoomAtom);
  const nights = parseInt(
    date?.from && date?.to && formatDistance(date?.from, date?.to)
  );
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-displayxs text-black">Your reservation</h1>
      {/* <div className="border p-3 rounded-xl">
        <div className="flex flex-col lg:flex-row justify-between gap-2"></div>
        
        <div className="flex flex-col gap-3 md:gap-6 mt-4"></div>
      </div> */}

      <div className="flex flex-col gap-4">
        {selectedRooms.map((product, index) => (
          <div
            key={index}
            className="space-y-3 py-4 px-4 border rounded-lg shadow-sm cursor-pointer hover:border-destructive duration-200"
            onClick={() => removeRoom(product.room._id)}
          >
            <div className="flex gap-4">
              <h1 className="w-20 text-textsm">Room {index + 1}:</h1>
              <div className="w-full flex justify-between">
                <div>
                  <h2>{product.room?.category?.name}</h2>
                  <span className="text-textsm text-black/60">
                    {formatNumberWithCommas(product.room?.unitPrice)}₮ x{" "}
                    {nights} nights
                  </span>
                </div>
                <h2>
                  {formatNumberWithCommas(product.room?.unitPrice * nights)}₮
                </h2>
              </div>
            </div>

            {product.extras && (
              <div className="flex gap-4 text-textsm">
                <h1 className="w-20 text-textsm">Extras:</h1>
                <div className="w-full flex justify-between">
                  <div className="w-full space-y-2">
                    {product.extras?.map((extra, index) => (
                      <div key={index} className="w-full flex justify-between">
                        <h2>{extra.name}</h2>
                        <span>{formatNumberWithCommas(extra.unitPrice)}₮</span>
                      </div>
                    ))}
                    {/* <h2>{product.room?.category?.name}</h2>
                            <span className="text-textsm text-black/60">
                              {product.room?.unitPrice}₮ x {nights} nights
                            </span> */}
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex justify-end gap-1">
              <h2>Total: </h2>
              <h2 className="justify-self-end">
                {product.extras
                  ? formatNumberWithCommas(
                      product.room.unitPrice * nights +
                        product.extras.reduce(
                          (acc, extra) => acc + extra.unitPrice,
                          0
                        )
                    )
                  : formatNumberWithCommas(product.room.unitPrice * nights)}
                ₮
              </h2>
            </div>
          </div>
        ))}
      </div>

      <Separator />
      <div className="flex justify-between text-displayxs font-bold">
        <h1 className="uppercase">Total: </h1>
        <h1>
          {formatNumberWithCommas(
            selectedRooms.reduce(
              (acc, product) => acc + product.room?.unitPrice * nights,
              0
            )
          )}
          ₮
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        {selectedRooms.length === reserveCount.room && (
          <Button
            variant={"secondary"}
            onClick={() => router.push("/booking/your-details")}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};
export default SelectedRoomCard;
