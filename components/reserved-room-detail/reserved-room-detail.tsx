import { Calendar, CircleAlert, User } from "lucide-react";
import { Button } from "../ui/button";
import Image from "../ui/image";
import { Separator } from "../ui/separator";
import { ReactNode } from "react";
import IconWithTitle from "../icon-with-title/icon-with-title";

type TitleWithPrice = {
  title: string;
  price: string;
  desc?: string;
  icon?: ReactNode;
};

type TitleWithIcon = {
  title: string;
  icon: ReactNode;
};

const ReservedRoomDetail = () => {
  const SelectedFieldTitle = ({ title }: { title: string }) => {
    return <p className="text-textxs text-black/60">{title}</p>;
  };
  const TitleWithIcon = ({ icon, title }: TitleWithIcon) => {
    return (
      <p className="flex gap-2 items-center text-textsm text-black/60">
        {icon} {title}
      </p>
    );
  };
  const TitleWithPrice = ({ desc, title, price, icon }: TitleWithPrice) => {
    return (
      <div className="flex justify-between">
        <div className="flex flex-col md:gap-1">
          <h2 className="text-textmd flex items-center gap-2">
            {title} {icon}
          </h2>
          {desc && <p className="text-textsm text-black/60">{desc}</p>}
        </div>
        <h2 className="text-textmd">{price}</h2>
      </div>
    );
  };
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-displayxs text-black">Your reservation</h1>
      <h1 className="w-[80%] text-textlg leading-6">
        Best Western Premier Tuushin Hotel Deluxe Twin Room
      </h1>

      {/* <div className="flex gap-2 items-center">
        <CircleAlert className="w-4 h-4" />
        <span className="text-textxs">Non-refundable</span>
      </div> */}

      <div className="border p-3 rounded-xl">
        <div className="flex flex-col lg:flex-row justify-between gap-2">
          <div className="space-y-1 w-[70%]">
            <TitleWithIcon
              icon={<User className="w-6 h-6" />}
              title={`Adults: ${1}`}
            />
            <TitleWithIcon
              icon={<User className="w-4 h-4" />}
              title={`Children: ${1}`}
            />
            <TitleWithIcon
              icon={<Calendar className="w-5 h-5" />}
              title={`Check in: 10.10.2024 14:00`}
            />
            <TitleWithIcon
              icon={<Calendar className="w-5 h-5" />}
              title={`Check out: 11.10.2024 12:00`}
            />
          </div>
          <div className="h-fit w-[30%] overflow-hidden rounded-xl">
            <Image
              src="/images/product.png"
              width={600}
              height={600}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-6 mt-4">
          <div className="space-y-2">
            <SelectedFieldTitle title="Standard Rate" />
            <SelectedFieldTitle title="Continental Breakfast" />
          </div>

          <div className="flex flex-col gap-3 md:gap-6">
            <TitleWithPrice title="Room price" price="USD 185.00" />
            <div className="space-y-1">
              <TitleWithPrice title="Sub total" price="USD 185.00" />
              <TitleWithPrice title="Taxes" price="USD 19.00" />
              <TitleWithPrice title="Fees" price="USD 4.00" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-displayxs font-bold">
        <h1 className="uppercase">Total</h1>
        <span className="text-secondary">USD 208.00</span>
      </div>
    </div>
  );
};
export default ReservedRoomDetail;
