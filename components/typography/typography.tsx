import { FC } from "react";

export type TypographyTypes =
  | "display-2xl"
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "display-sm"
  | "display-xs"
  | "text-xl"
  | "text-lg"
  | "text-md"
  | "text-sm"
  | "text-xs";

type Props = {
  variant: TypographyTypes;
  className?: string;
  children: React.ReactNode;
};

const Typography: FC<Props> = ({ variant, className, children }) => {
  const getClasses = (variant: TypographyTypes) => {
    switch (variant) {
      case "display-2xl":
        return "text-[72px] leading-[90px]";
      case "display-xl":
        return "text-[60px] leading-[72px]";
      case "display-lg":
        return "text-[48px] leading-[60px]";
      case "display-md":
        return "text-[36px] leading-[44px]";
      case "display-sm":
        return "text-[30px] leading-[38px]";
      case "display-xs":
        return "text-[24px] leading-[32px]";
      case "text-xl":
        return "text-[20px] leading-[30px]";
      case "text-lg":
        return "text-[18px] leading-[28px]";
      case "text-md":
        return "text-[16px] leading-[24px]";
      case "text-sm":
        return "text-[14px] leading-[20px]";
      case "text-xs":
        return "text-[12px] leading-[18px]";
    }
  };

  return (
    <div className={`${getClasses(variant)} ${className}`}>{children}</div>
  );
};

export default Typography;
