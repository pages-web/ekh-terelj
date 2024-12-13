"use client";
import { LockKeyhole } from "lucide-react";


const SecuredConnection = () => {
  return (
    <div className="h-10 flex justify-end">
      <p className="flex gap-2 text-textsm items-center bg-secondary text-white w-fit px-4 py-2 rounded-r-sm absolute left-0">
        <LockKeyhole className="w-6 h-6" /> Secured connection
      </p>
    </div>
  );
};
export default SecuredConnection;
