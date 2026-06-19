import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const PopupOfferDetail = () => {
  const tContent = useTranslations("Content");
  const tCommon = useTranslations("Common");
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
      title: tContent("guaranteePolicy"),
      desc: tContent("guaranteePolicyDescription"),
    },
    {
      title: tContent("cancellationPolicy"),
      desc: tContent("cancellationPolicyDescription"),
    },
    { title: tContent("taxPolicy"), desc: tContent("taxPolicyDescription") },
    { title: tContent("feePolicy"), desc: tContent("feePolicyDescription") },
  ];
  return (
    <div className="flex flex-col gap-4">
      <h1 className="px-4 text-displayxs">{tContent("standardRate")}</h1>
      <Separator className="my-2" />
      <div className="px-4 flex flex-col gap-6">
        {datas.map((data, index) => {
          return (
            <TitleWithDesc key={index} title={data.title} desc={data.desc} />
          );
        })}
      </div>
      <Separator className="my-2" />
      <div className="px-4 flex justify-end">
        <DialogClose>
          <Button variant={"secondary"} className="w-fit">
            {tCommon("close")}
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};
export default PopupOfferDetail;
