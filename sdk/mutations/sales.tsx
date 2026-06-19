import { useMutation } from "@apollo/client";
import { mutations } from "../graphql/sales";
import { useAtomValue } from "jotai";
import { currentConfigAtom } from "@/store/config";
import { useTags } from "../queries/sales";
import { IFullDeal } from "@/types/sales";
import { useCallback } from "react";

export const useLabelAdd = () => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const [addLabel, { data, loading }] = useMutation(mutations.addLabel, {
    variables: {
      cpSalesPipelineLabelsAddPipelineId2:
        currentConfig?.pipelineConfig.pipelineId,
    },
  });
  return { addLabel, label: data?.cpSalesPipelineLabelsAdd, loading };
};

export const useAddTag = () => {
  const [addTag, { loading }] = useMutation(mutations.addTag, {
    variables: { type: "sales:deal" },
  });

  return { addTag, loading };
};

export const useAddPrePaymentTag = () => {
  const { addTag, loading } = useAddTag();

  const addPrePaymentTag = (isPrePayment: boolean) => {
    const name = isPrePayment ? "Pre payment" : "Full payment";
    const colorCode = isPrePayment ? "#63D2D6" : "#4BBF6B";

    return addTag({
      variables: { name, colorCode },
      onCompleted: (data) => data.tagsAdd._id,
    });
  };

  return { addPrePaymentTag, loading };
};

export const useChangeStage = (dealDetail?: IFullDeal) => {
  const [changeStage, { data, loading }] = useMutation(mutations.dealsEdit);

  const handleChangeStage = useCallback(
    (stageId: string) => {
      if (!dealDetail || !stageId) {
        return;
      }

      return changeStage({
        variables: { _id: dealDetail._id, stageId },
      });
    },
    [changeStage, dealDetail],
  );

  return {
    handleChangeStage,
    loading,
  };
};
