import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pluralize } from "@/lib/helper";

interface Props {
  products: ProductData[];
  options: SortData[];
  sortedProducts: (products: ProductData[]) => void;
}

const TopBarFilter: React.FC<Props> = ({
  products,
  options,
  sortedProducts,
}) => {
  function handleSelected(value: string) {
    let nProducts = [...products];
    const index = Number(value);
    let option = options[index];
    if (option.field == "mfield_custom_total_sale") {
      nProducts.sort((a: ProductData, b: ProductData) => {
        if (Number(b.popularity) < Number(a.popularity)) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (option.field == "title") {
      nProducts.sort((a: ProductData, b: ProductData) => {
        if (option.direction == "asc" ? a.name < b.name : b.name < a.name) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (option.field == "ss_price") {
      nProducts.sort((a: ProductData, b: ProductData) => {
        let aPrice = parseFloat(a.price);
        let bPrice = parseFloat(b.price);
        if (option.direction == "asc" ? aPrice < bPrice : bPrice < aPrice) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    sortedProducts(nProducts);
  }
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {products.length} {pluralize(products.length, "Product")}
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <Select onValueChange={handleSelected}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Please select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort</SelectLabel>
              {options?.map((data, index) => (
                <SelectItem key={index} value={String(index)}>
                  {data.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TopBarFilter;
