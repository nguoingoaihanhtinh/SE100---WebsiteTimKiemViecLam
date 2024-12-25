import Security from "./Security";
import FilterContent from "./FilterContent";

const Filter = ({ setSortBy }) => {
  return (
    <div className="flex flex-col mt-6 px-5 gap-7 mb-10">
      <FilterContent setSortBy={setSortBy} />
      <Security />
    </div>
  );
};

export default Filter;
