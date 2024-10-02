"use client";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

const ProductCardRating = () => {
  const ProgressWithTitle = ({
    title,
    value,
  }: {
    title: string;
    value: number;
  }) => {
    const fixedValue = Math.floor(((value * 5) / 100) * 10) / 10;
    return (
      <div className="flex flex-col gap-2">
        <div className="text-textlg flex justify-between">
          <h3>{title}</h3>
          <h3>{fixedValue}</h3>
        </div>
        <Progress value={value} />
      </div>
    );
  };
  const progressArray = [
    { name: "Comfortable", value: 95 },
    { name: "Cleanliness", value: 87 },
    { name: "Facilities", value: 90 },
  ];
  return (
    <div className="w-[40%] flex flex-col gap-12 p-8 border rounded-3xl">
      <div className="space-y-8">
        <h2 className="text-textxl font-bold">Reviews and ratings</h2>
        <div className="flex gap-3 items-center">
          <p className="text-secondary-foreground bg-secondary px-3 py-2 rounded-sm font-bold">
            8.2
          </p>
          <div className="flex flex-col">
            <span className="font-bold text-textmd text-black">Very good</span>
            <span className="text-black/70 text-textxs">
              (Based on 580 reviews)
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {progressArray.map((progress, index) => {
          return (
            <ProgressWithTitle
              title={progress.name}
              value={progress.value}
              key={index}
            />
          );
        })}
      </div>
      <Button variant={"secondary"} size="lg" className="font-bold">
        See feedbacks
      </Button>
    </div>
  );
};
export default ProductCardRating;
