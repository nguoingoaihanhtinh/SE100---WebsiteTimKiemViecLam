import { Checkbox } from "antd";
import { useState } from "react";
const schedules = [
  {
    value: "Full time",
  },
  {
    value: "Intern",
  },
  {
    value: "Freelance",
  },
  {
    value: "Contractual",
  },
];
const FilterContent = () => {
  const [scheSlt, setScheSlt] = useState([]);
  return (
    <div className="flex flex-col pb-4 gap-2 px-4 bg-white rounded-[12px] border-[1px]">
      <div className="title flex justify-center mt-2">
        <p className="text-2xl font-semibold text-black mt-2">Filters</p>
      </div>
      <div className="schedule">
        <p className="text-md text-gray-500 mb-2">Working schedule</p>
        <div className="checkboxes flex flex-col gap-2 ">
          {schedules.map((sche, idx) => (
            <div
              key={idx}
              onClick={() => {
                setScheSlt((prev) => {
                  if (prev.includes(sche.value)) {
                    return prev.filter((item) => item !== sche.value);
                  } else {
                    return [...prev, sche.value];
                  }
                });
              }}
              className="flex gap-3"
            >
              <Checkbox checked={scheSlt.includes(sche.value)} />{" "}
              <span className="text-primary-color cursor-pointer">{sche.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterContent;
