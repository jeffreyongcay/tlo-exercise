"use client";
import { useEffect, useState } from "react";
import data from "@/json/response.json";
import ProductList from "@/components/home/product-list";
import TopBarFilter from "@/components/home/top-bar-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const results = data.results as ProductData[];
  const [products, setProducts] = useState<ProductData[]>(results);
  const [searchedProducts, setSearchedProducts] = useState<ProductData[]>([]);
  const [searchValue, setSearchValue] = useState("");

  function search() {
    let search = searchValue.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search)
    );
    setSearchedProducts(filteredProducts);
  }

  useEffect(() => {
    search();
  }, [products, searchValue]);

  return (
    <div className="p-10">
      <div className="mb-5">
        <div className="flex">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <TopBarFilter
        products={results}
        filteredProducts={searchedProducts}
        options={data.sorting.options}
        sortedProducts={(products) => setProducts(products)}
      />
      <ProductList products={searchedProducts} />
    </div>
  );
}
