import { useMutation } from "@apollo/client";
import { mutations } from "../graphql/sales";
import { useAtomValue } from "jotai";
import { currentConfigAtom } from "@/store/config";

export const useLabelAdd = () => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const [addLabel, { data, loading }] = useMutation(mutations.addLabel, {
    variables: { pipelineId: currentConfig?.pipelineConfig.pipelineId },
  });
  return { addLabel, label: data?.salesPipelineLabelsAdd, loading };
};
