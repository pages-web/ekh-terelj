import { Check } from "lucide-react";
import { Button } from "../ui/button";

const Step = ({
  index,
  isDone,
  title,
  className,
  isCurrent,
}: // isNext,
{
  index: number;
  isDone?: boolean;
  isCurrent?: boolean;
  // isNext?: boolean;
  title: string;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col items-center gap-2 capitalize ${className}`}>
      <Button
        size={"icon"}
        className={`w-6 h-6 md:h-9 md:w-9 text-[12px] md:text-[15px] rounded-full ${
          isDone
            ? "bg-secondary hover:bg-secondary/80"
            : isCurrent
            ? "bg-secondary hover:bg-secondary/80"
            : // : isNext
              // ? ""
              "bg-[#DADCE0] hover:bg-[#DADCE0]"
        }`}
      >
        {isDone ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : index}
      </Button>
      <p
        className={`md:w-[100px] text-[10px] md:text-sm font-bold text-center ${
          isDone
            ? "text-secondary"
            : isCurrent
            ? "text-secondary"
            : // : isNext
              // ? "text-primary"
              "text-[#3c4043]/80"
        }`}
      >
        {title}
      </p>
    </div>
  );
};
export default Step;
