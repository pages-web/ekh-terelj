import { useStages } from "@/sdk/queries/sales";

const handleStageId = (id: string) => {
  const { stages } = useStages();

  const stage = stages?.find((stage) => stage._id === id);

  return stage;
};

export default handleStageId;
