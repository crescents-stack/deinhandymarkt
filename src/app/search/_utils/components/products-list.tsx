import ProductsCard from "@/components/molecules/products-card";
import { products } from "../../../../components/molecules/products-carousel";

const ProductsList = () => {
    
  return (
    <div className="text-9xl flex flex-col gap-[20px]">
      <ul className="flex items-center justify-start gap-[8px]">
        <li className="px-[12px] py-[6px] bg-muted rounded-[4px] text-gray-500">All cases</li>
        <li className="px-[12px] py-[6px] bg-muted rounded-[4px] text-gray-500">Chargers</li>
      </ul>
      <div className="grid grid-cols-2 min-[1000px]:grid-cols-3 min-[1080px]:grid-cols-2 min-[1330px]:grid-cols-3 gap-[10px] sm:gap-[20px]">
        {products.map((item: any) => {
          return (
            <div
              key={item.id}
              className="group bg-white hover:bg-muted border border-dark_gray rounded-[8px]"
            >
              <ProductsCard details={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsList;
