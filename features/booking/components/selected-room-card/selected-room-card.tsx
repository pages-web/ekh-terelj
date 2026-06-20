import { useAtom, useAtomValue } from "jotai";
import { Separator } from "@/components/ui/separator";
import {
  nightsAtom,
  reserveGuestAndRoomAtom,
} from "@/features/booking/store/reserve";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { formatNumberWithCommas } from "@/lib/utils/format-number";
import {
  removeSelectedRoomAtom,
  selectedRoomsAtom,
} from "@/features/booking/store/rooms";
import { useLocale, useTranslations } from "next-intl";
import { X } from "lucide-react";

const SelectedRoomCard = () => {
  const t = useTranslations("Booking");
  const locale = useLocale();
  const router = useRouter();
  const selectedRooms = useAtomValue(selectedRoomsAtom);
  const reserveGuestAndRoom = useAtomValue(reserveGuestAndRoomAtom);
  const [, removeRoom] = useAtom(removeSelectedRoomAtom);
  const nights = useAtomValue(nightsAtom);

  const getRoomTotal = (product: (typeof selectedRooms)[number]) =>
    product.room.unitPrice * nights +
    (product.extras?.reduce((acc, extra) => acc + extra.unitPrice, 0) || 0);

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-displayxs text-black">{t("yourReservation")}</h1>

      <div className="flex flex-col gap-4">
        {selectedRooms.map((product, index) => (
          <div
            key={index}
            className="relative space-y-3 py-4 px-4 border rounded-lg shadow-sm"
          >
            <button
              type="button"
              onClick={() => removeRoom(product.room._id)}
              className="
    absolute top-2 right-2
    flex h-5 w-5 items-center justify-center
    rounded-full
    text-gray-400
    transition-colors
    hover:text-red-500
  "
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex gap-4">
              <h1 className="w-20 text-textsm">
                {t("roomNumber", { index: index + 1 })}
              </h1>
              <div className="w-full flex justify-between">
                <div>
                  <h2>{product.room?.name || product.room?.category?.name}</h2>
                  <span className="text-textsm text-black/60">
                    {formatNumberWithCommas(product.room?.unitPrice, locale)}₮ x{" "}
                    {t("night", { count: nights })}
                  </span>
                </div>
                <h2>
                  {formatNumberWithCommas(product.room?.unitPrice * nights, locale)}₮
                </h2>
              </div>
            </div>

            {!!product.extras?.length && (
              <div className="flex gap-4 text-textsm">
                <h1 className="w-20 text-textsm">{t("extras")}</h1>
                <div className="w-full flex justify-between">
                  <div className="w-full space-y-2">
                    {product.extras?.map((extra, index) => (
                      <div key={index} className="w-full flex justify-between">
                        <h2>{extra.name}</h2>
                        <span>{formatNumberWithCommas(extra.unitPrice, locale)}₮</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex justify-end gap-1">
              <h2>{t("total")} </h2>
              <h2 className="justify-self-end">
                {formatNumberWithCommas(getRoomTotal(product), locale)}
                ₮
              </h2>
            </div>
          </div>
        ))}
      </div>

      <Separator />
      <div className="flex justify-between text-displayxs font-bold">
        <h1 className="uppercase">{t("total")} </h1>
        <h1>
          {formatNumberWithCommas(
            selectedRooms.reduce((acc, product) => acc + getRoomTotal(product), 0),
            locale,
          )}
          ₮
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        {selectedRooms.length === reserveGuestAndRoom.room && (
          <Button onClick={() => router.push("/booking/your-details")}>
            {t("book")}
          </Button>
        )}
      </div>
    </div>
  );
};
export default SelectedRoomCard;
