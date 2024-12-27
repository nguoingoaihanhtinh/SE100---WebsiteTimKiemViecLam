import { Select } from "antd";

const FilterContent = ({ setSortBy }) => {
  return (
    <div className="flex flex-col pb-4 gap-2 px-4 bg-white rounded-[12px] border-[1px]">
      <div className="title flex justify-center mt-2">
        <p className="text-2xl font-semibold text-black mt-2">Sort by</p>
      </div>
      <Select
        defaultValue="createdAt"
        style={{ width: `100%`, height: 40 }}
        onChange={(e) => {
          if (setSortBy) {
            setSortBy(e);
          }
        }}
        options={[
          { value: "salary_from", label: "Salary Up" },
          { value: "-salary_from", label: "Salary Down" },
          { value: "createdAt", label: "Newest" },
          { value: "-createdAt", label: "Oldest" },
          { value: "title", label: "A -> Z" },
          { value: "-title", label: "Z -> A" },
        ]}
      />
    </div>
  );
};

export default FilterContent;
