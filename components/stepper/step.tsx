import { Check } from "lucide-react";
import { Button } from "../ui/button";

const Step = ({
  index,
  isDone,
  title,
  className,
}: {
  index: number;
  isDone?: boolean;
  title: string;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col items-center gap-2 capitalize ${className}`}>
      <Button
        size={"icon"}
        className={`w-6 h-6 md:h-9 md:w-9 text-[12px] md:text-[16px] rounded-full ${
          isDone && "bg-secondary hover:bg-secondary/80"
        }`}
      >
        {isDone ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : index}
      </Button>
      <p
        className={`md:w-[100px] text-[10px] md:text-textsm font-bold text-center ${
          isDone && "text-secondary"
        }`}
      >
        {title}
      </p>
    </div>
  );
};
export default Step;
