"use client";
import { useEffect, useState } from "react";
import data from "@/json/response.json";
import ProductList from "@/components/home/product-list";
import TopBarFilter from "@/components/home/top-bar-filter";

export default function Home() {
  const [products, setProducts] = useState(data.results);

  useEffect(() => {
    setProducts(data.results);
  }, [data.results]);

  return (
    <div className="p-10">
      <TopBarFilter
        products={products}
        options={data.sorting.options}
        onSelected={(index) => alert(index)}
        sortedProducts={(products) => setProducts(products)}
      />
      <ProductList products={products} />
    </div>
  );
}
