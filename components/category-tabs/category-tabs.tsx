import CategoryTab from "../catgory-tab/category-tab";

type Tab = {
  name: string;
  path: string;
};

const CategoryTabs = ({ tabs }: { tabs: Tab[] }) => {
  return (
    <div className="no-scrollbar overflow-x-scroll flex gap-3">
      {tabs.map((tab, index) => {
        return <CategoryTab {...tab} key={index} />;
      })}
    </div>
  );
};
export default CategoryTabs;
