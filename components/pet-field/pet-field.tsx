import { Checkbox } from "../ui/checkbox";

const PetField = () => {
  return (
    <div className="flex justify-between items-end">
      <div className="space-y-[6px]">
        <h3 className="text-textsm font-bold">Pet friendly</h3>
        <p className="text-textxs">Only show stays that allow pets</p>
      </div>
      <Checkbox className="h-6 w-6" />
    </div>
  );
};
export default PetField;
