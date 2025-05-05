import { Link } from "@/i18n/routing";
import ReserveSelectDate from "../reserve-select-date/reserve-select-date";
import Image from "../ui/image";

const HomeBooking = () => {
  return (
    <div className="h-[85vh] relative overflow-hidden p-10 my-10 rounded-3xl flex items-end">
      <div className="h-full w-full -z-10 aspect-video absolute bottom-0 left-0 ">
        <Image
          src="/images/bg.png"
          width={1440}
          height={920}
          quality={100}
          className="h-full md:w-full brightness-[.8]"
          alt=""
        />
      </div>

      <div className="w-full z-10 space-y-9">
        <div className="text-center text-white">
          <Link href="/about">
            <button className="border border-white rounded-full px-4 py-1 text-sm backdrop-blur-3xl bg-[#EAECF0]/10">
              About
            </button>
          </Link>
          <h1 className="font-medium text-[40px] md:text-[64px]">
            FOR THOSE WHO WANTED ALL.
          </h1>
          <p className="text-lg">
            Find your perfect stay with ease explore a wide range of rooms, grab
            great deals, and book your ideal gateway today.
          </p>
        </div>

        <ReserveSelectDate />
      </div>
    </div>
  );
};
export default HomeBooking;
