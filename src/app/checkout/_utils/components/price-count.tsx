import { CheckCheck } from "lucide-react";

const PriceCount = () => {
  return (
    <div className="border-t border-dashed">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-[16px] py-[20px]">
        <div className="flex flex-col gap-[12px]">
          <h5 className="text-[14px] md:text-[16px] font-semibold">
            Shop Safely without Risk!
          </h5>
          <ul className="flex flex-col gap-[8px]">
            {[
              { id: 1, text: "Secure payment with SSL encryption" },
              { id: 2, text: "3 year guarantee" },
              { id: 3, text: "Data protection" },
              { id: 4, text: "14 day return policy" },
              { id: 5, text: "Over 1,500,000 customers" },
            ].map((item) => {
              return (
                <li key={item.id} className="flex items-center gap-[8px]">
                  <CheckCheck className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
                  <p>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col items-start justify-start md:items-end md:justify-end gap-[8px]">
          <p>
            Sub total <span>$444</span>
          </p>
          <div className="flex flex-col items-start justify-start md:items-end md:justify-end gap-[4px]">
            <p>
              Shipping charge <span>$4.66</span>
            </p>
            <p>
              Includes VAT <span>$3.44</span>
            </p>
          </div>
          <p>
            Total <span>$452</span>
          </p>
          <div className="flex flex-col items-start justify-start md:items-end md:justify-end gap-[4px]">
            <p className="text-secondary">Available Immediately</p>
            <p>Delivery time: 1-2 Working days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCount;
