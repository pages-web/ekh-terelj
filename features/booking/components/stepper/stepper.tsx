import { Link } from "@/i18n/routing";
import Step from "./step";

type Steps = {
  title: string;
  path: string;
};

const Stepper = ({
  steps,
  currentActive,
}: {
  steps: Steps[];
  currentActive: number;
}) => {
  return (
    <div className="flex justify-center items-center relative h-[80px]">
      <div className="w-full flex justify-between absolute top-[28px] md:top-[22px] left-0">
        {steps.map((step, index) => {
          return (
            // <Link href={step.path} key={index}>
            <Step
              key={index}
              title={step.title}
              index={index + 1}
              isDone={index < currentActive}
              isCurrent={index === currentActive}
              // isNext={index === currentActive + 1}
            />
            // </Link>
          );
        })}
      </div>

      <div className="w-[80%] sm:w-[86%] md:w-[89%] border-b-2 -z-10"></div>
    </div>
  );
};
export default Stepper;
