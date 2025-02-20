import { useQuery } from "@apollo/client";
import { queries } from "../graphql/sales";
import { useAtomValue } from "jotai";
import { currentConfigAtom } from "@/store/config";

export const useStages = () => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data, loading } = useQuery(queries.stages, {
    variables: {
      pipelineId: currentConfig?.pipelineConfig.pipelineId,
    },
  });
  return { stages: data?.salesStages, loading };
};

export const useTags = () => {
  const { data, loading } = useQuery(queries.tags, {
    variables: { type: "sales:deal" },
  });
  return { tags: data?.tags, loading };
};

export const useLabels = () => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data, loading } = useQuery(queries.salesPipelineLabels, {
    variables: { pipelineId: currentConfig?.pipelineConfig.pipelineId },
  });
  return { labels: data?.salesPipelineLabels, loading };
};
