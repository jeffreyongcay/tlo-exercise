import React from "react";

interface Props {
  data: ProductData;
}

const CardItem: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative rounded border border-[#e6e6e6] p-4 bg-white space-y-3 cursor-pointer">
      <div>
        <img src={data.thumbnailImageUrl} />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-rubik">{data.name}</h3>
        <div>
          <span className="text font-rubik font-bold">${data.price}</span>
          {data.msrp && (
            <span className="text-sm text-red-500 ml-2 line-through">
              ${data.msrp}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem;
