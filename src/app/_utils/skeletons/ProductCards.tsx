const ProductCardSkeletons = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] sm:gap-[20px] pt-[32px]">
      {[1,2,3,4].map((item: any, index: number) => {
        return (
          <div
            key={item._id}
            className={`bg-muted border border-muted hover:border-secondary group rounded-[8px] ${
              index + 1 === 2 || index+1 === 3 ? "lg:col-span-2" : "col-span-1"
            }`}
          >
          </div>
        );
      })}
    </div>
    )
}