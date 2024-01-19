const OrdersFrom = () => {
  return (
    <div className="pt-[32px]">
      <h4 className="font-semibold pb-[12px]">Orders from</h4>
      <div className="grid grid-cols-1 gap-[16px]">
        {ordersFrom.map((item) => {
          const { id, location, orderedTimes } = item;
          const barWidth = (orderedTimes / ordersFrom[0].orderedTimes) * 60;
          return (
            <div key={id} className="flex items-center gap-[16px]">
              <div
                className="h-[32px] rounded-[10px] border border-dark_gray bg-muted"
                style={{
                  minWidth: `${barWidth}%`,
                }}
              ></div>
              <p className="text-gray-500 font-medium z-10">
                {location}&nbsp;{orderedTimes}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersFrom;

const ordersFrom = [
  {
    id: 1,
    location: "Berlin",
    orderedTimes: 110,
  },
  {
    id: 2,
    location: "Berlin",
    orderedTimes: 97,
  },
  {
    id: 3,
    location: "Berlin",
    orderedTimes: 30,
  },
  {
    id: 4,
    location: "Berlin",
    orderedTimes: 21,
  },
  {
    id: 5,
    location: "Berlin",
    orderedTimes: 11,
  },
  {
    id: 6,
    location: "Berlin",
    orderedTimes: 7,
  },
];
