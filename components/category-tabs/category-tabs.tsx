import CategoryTab from "../catgory-tab/category-tab";

type Tab = {
  name: string;
  path: string;
};

const CategoryTabs = ({ tabs, defaultTab }: { tabs: Tab[]; defaultTab?: Tab }) => {
  return (
    <div className="flex gap-3">
      {tabs.map((tab, index) => {
        return <CategoryTab {...tab} key={index} />;
      })}
    </div>
  );
};
export default CategoryTabs;
