import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

const CountField = ({
  title,
  count,
  setCount,
}: {
  title: string;
  count: number;
  setCount: any;
}) => {
  return (
    <div className="flex justify-between items-center bg-[#D0D5DD] rounded-md p-3">
      <h3 className="text-textsm">{title}</h3>
      <div className="flex gap-3 items-center">
        <Button
          size={"icon"}
          className="rounded-full"
          onClick={() => count > 0 && setCount(count - 1)}
        >
          <Minus className="w-5 h-5" />
        </Button>
        <span className="text-textlg">{count}</span>
        <Button
          size={"icon"}
          className="rounded-full"
          onClick={() => setCount(count + 1)}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
export default CountField;
