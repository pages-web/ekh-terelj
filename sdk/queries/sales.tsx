import { useQuery } from "@apollo/client";
import { queries } from "../graphql/sales";

export const useStages = () => {
  const { data, loading } = useQuery(queries.stages, {
    variables: {
      pipelineId: process.env.NEXT_PUBLIC_PIPELINE_ID,
    },
  });
  return { stages: data?.salesStages, loading };
};

export const useTags = () => {
  const { data, loading } = useQuery(queries.tags);
  return { tags: data?.tags, loading };
};

export const useLabels = () => {
  const { data, loading } = useQuery(queries.salesPipelineLabels, {
    variables: { pipelineId: process.env.NEXT_PUBLIC_PIPELINE_ID },
  });
  return { labels: data?.salesPipelineLabels, loading };
};
