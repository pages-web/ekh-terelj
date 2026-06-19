"use client";
import { IExtra } from "@/features/rooms/types";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { useState } from "react";
import { RESET } from "jotai/utils";
import { useAddRoomExtras } from "@/features/rooms/hooks/room-hooks";

const ReserveDetailExtra = (extra: IExtra) => {
  const { HandleAddRoomExtras, isAdd } = useAddRoomExtras({ extra: extra });

  return (
    <div className="flex justify-between items-center gap-4 border rounded-lg p-4">
      <span>{extra.name}</span>
      <Button
        className={`cursor-pointer text-textsm border px-4 py-2 rounded-lg`}
        variant={isAdd ? "outline" : "destructive"}
        onClick={HandleAddRoomExtras}
      >
        {isAdd ? "Add" : "Remove"}
      </Button>
    </div>
  );
};
export default ReserveDetailExtra;
