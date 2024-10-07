import { Button } from "../ui/button";
import { Dialog, DialogClose } from "../ui/dialog";
import { Separator } from "../ui/separator";

const PopupOfferDetail = () => {
  const TitleWithDesc = ({
    title,
    desc,
  }: {
    title?: string;
    desc?: string;
  }) => {
    return (
      <div className="flex flex-col">
        <h1 className="text-textmd font-bold">{title}</h1>
        <p className="text-textsm text-black/90">{desc}</p>
      </div>
    );
  };
  const datas = [
    {
      title: "Guarantee policy",
      desc: "Valid credit card is required upon booking. No deposit will be charged. Payment is proceeded upon the arrival.",
    },
    {
      title: "Cancellation policy",
      desc: "If cancelled up to 3 days before the date of arrival, no fee will be charged. If cancelled later or in case of no-show, 100% of the first night will be charged",
    },
    { title: "Tax policy", desc: "10% VAT" },
    { title: "Fee policy", desc: "City tax - 2% of stay" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <h1 className="px-4 text-displayxs">Standard Rate</h1>
      <Separator className="my-2" />
      <div className="px-4 flex flex-col gap-6">
        {datas.map((data) => {
          return <TitleWithDesc title={data.title} desc={data.desc} />;
        })}
      </div>
      <Separator className="my-2" />
      <div className="px-4 flex justify-end">
        <DialogClose>
          <Button variant={"secondary"} className="w-fit">
            Close
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};
export default PopupOfferDetail;
