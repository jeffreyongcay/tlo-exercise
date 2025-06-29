"use client";
import CardItem from "@/components/custom-ui/card-item";
import Image from "next/image";
import { useEffect, useState } from "react";
import data from '@/json/response.json';

export default function Home() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  useEffect(() => {
    console.log(JSON.stringify(data.results[0]));
  }, [data]);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {data.results.map((item, index) => (
          <CardItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
}
