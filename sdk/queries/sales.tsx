import { useQuery } from "@apollo/client";
import { queries } from "../graphql/sales";
import { useAtomValue } from "jotai";
import { currentConfigAtom } from "@/store/config";
import { IFullDeal, IStage, ITag } from "@/types/sales";

export const useStages = () => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data, loading } = useQuery(queries.stages, {
    variables: {
      pipelineId: currentConfig?.pipelineConfig.pipelineId,
    },
    skip: !currentConfig,
  });
  const stages: IStage[] = data?.salesStages;

  const handleStageId = (id: string) => {
    const stage = stages?.find((stage) => stage._id === id);

    return stage;
  };

  return { handleStageId, stages, loading };
};

export const useTags = () => {
  const { data, loading } = useQuery(queries.tags, {
    variables: { type: "sales:deal" },
  });

  const tags: ITag[] = data?.tags || [];

  return { tags, loading };
};

export const useLabels = () => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data, loading } = useQuery(queries.salesPipelineLabels, {
    variables: { pipelineId: currentConfig?.pipelineConfig.pipelineId },
    notifyOnNetworkStatusChange: true,
  });
  return { labels: data?.salesPipelineLabels, loading };
};

export const useDealDetail = (id: string) => {
  const { data, loading, refetch } = useQuery(queries.dealFullDetail, {
    variables: { id },
    skip: !id,
    notifyOnNetworkStatusChange: true,
  });

  const dealDetail: IFullDeal = data?.dealDetail;

  return { dealDetail, loading, refetch };
};
