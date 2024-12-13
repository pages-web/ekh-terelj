import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

const CountField = ({ title, field }: { title: string; field: any }) => {
  return (
    <div className="flex justify-between items-center bg-[#D0D5DD] rounded-md p-3">
      <h3 className="text-textsm">{title}</h3>
      <div className="flex gap-3 items-center">
        <Button
          size={"icon"}
          className="rounded-full"
          onClick={() => field.value > 0 && field.onChange(field.value - 1)}
        >
          <Minus className="w-5 h-5" />
        </Button>
        <span className="text-textlg">{field.value}</span>
        <Button
          size={"icon"}
          className="rounded-full"
          onClick={() => field.onChange(field.value + 1)}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
export default CountField;
