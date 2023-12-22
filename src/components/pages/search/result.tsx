import FilterBar from "./filterbar";
import ProductsList from "./products-list";

const Result = () => {
  return (
    <div className="bg-white">
      <div className="px-[10px] sm:px-[20px] pt-[20px] flex gap-[20px] pb-[90px] max-w-[1440px] mx-auto">
        <FilterBar />
        <ProductsList />
      </div>
    </div>
  );
};

export default Result;
