"use client";
import { mutations } from "@/sdk/graphql/sales";
import { useStages } from "@/sdk/queries/sales";
import { dealDurationAtom, dealIdAtom } from "@/store/rooms";
import { IStage } from "@/types/sales";
import { useMutation } from "@apollo/client";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

const CheckDealDuration = () => {
  const [dealDuration, setDealDuration] = useAtom(dealDurationAtom);
  const { stages } = useStages();
  const dealId = useAtomValue(dealIdAtom);
  const [editDeal] = useMutation(mutations.dealsEdit);
  const canceledStageId = stages?.find(
    (stage: IStage) => stage.code === "canceled"
  )?._id;
  console.log(dealId);

  useEffect(() => {
    if (!!dealId && dealDuration === 0) {
      editDeal({
        variables: {
          id: dealId,
          stageId: canceledStageId,
        },
      });
    }
  }, [dealDuration]);
  return <div></div>;
};
export default CheckDealDuration;
