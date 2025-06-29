import React from "react";
import CardItem from "../custom-ui/card-item";

interface Props {
  products: ProductData[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
      {products.map((item, index) => (
        <CardItem key={index} data={item} />
      ))}
    </div>
  );
};

export default ProductList;
