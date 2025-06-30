import React, { useEffect, useState } from "react";
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
import { DualRangeSlider } from "../custom-ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";

interface Props {
  products: ProductData[];
  filteredProducts?: ProductData[];
  options: SortData[];
  sortedProducts: (products: ProductData[]) => void;
}

type BrandData = { brand: string; selected: boolean };

const TopBarFilter: React.FC<Props> = ({
  products,
  filteredProducts,
  options,
  sortedProducts,
}) => {
  const [values, setValues] = useState([0, 100]);
  const [baseValues, setBaseValues] = useState([0, 100]);
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleSelected() {
    let nProducts = [...products];
    const index = selectedIndex;
    let option = options[index];
    nProducts = nProducts.filter((product) => {
      let price = parseFloat(product.price);
      return price >= values[0] && price <= values[1];
    });
    if (brands.some((b) => b.selected)) {
      nProducts = nProducts.filter((product) => {
        let brand = product.brand;
        let brandData = brands.find((b) => b.brand === brand);
        return brandData ? brandData.selected : true;
      });
    }
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

  useEffect(() => {
    handleSelected();
  }, [values, selectedIndex, brands]);

  useEffect(() => {
    let nProducts = [...products];
    let maxPrice = 0;
    let minPrice = 0;
    let brands: BrandData[] = [];
    nProducts.forEach((product) => {
      let price = parseFloat(product.price);
      if (price > maxPrice) {
        maxPrice = price;
      }
      if (minPrice == 0 || price < minPrice) {
        minPrice = price;
      }
      if (!brands.some((b) => b.brand === product.brand)) {
        brands.push({ brand: product.brand, selected: false });
      }
    });
    setValues([minPrice, maxPrice]);
    setBaseValues([minPrice, maxPrice]);
    setBrands(brands);
  }, []);

  function handleSelectedBrand(index: number) {
    let nBrands = [...brands];
    nBrands[index].selected = !nBrands[index].selected;
    setBrands(nBrands);
  }

  const brandsSelectedCount = brands.filter((b) => b.selected).length;

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {filteredProducts?.length}{" "}
          {pluralize(filteredProducts?.length ?? 0, "Product")}
        </h1>
      </div>
      <div className="flex items-center flex-wrap">
        <div className="flex items-center w-[400px] space-x-2">
          <span className="text-sm text-gray-500">Price</span>
          <DualRangeSlider
            label={(value) => value}
            value={values}
            onValueChange={setValues}
            min={baseValues[0]}
            max={baseValues[1]}
            step={1}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Brands</span>
          <Popover>
            <PopoverTrigger>
              {brandsSelectedCount > 0
                ? `Selected (${brandsSelectedCount})`
                : `Select`}
            </PopoverTrigger>
            <PopoverContent className="space-y-2.5">
              {" "}
              {brands.map((data, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Checkbox
                    checked={data.selected}
                    onCheckedChange={() => handleSelectedBrand(index)}
                  />{" "}
                  <span>{data.brand}</span>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <Select onValueChange={(value) => setSelectedIndex(Number(value))}>
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
    </div>
  );
};

export default TopBarFilter;
