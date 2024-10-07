import { ReactNode } from "react";

const IconWithTitle = ({ icon, title }: { icon: ReactNode; title: string }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="w-11 h-11 rounded-full flex justify-center items-center bg-[#F2F2F2]">
        {icon}
      </span>
      <span className="text-textlg">{title}</span>
    </div>
  );
};

export default IconWithTitle;
