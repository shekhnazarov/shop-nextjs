"use client";

import { ProductType } from "@/interfaces";
import Link from "next/link";
import { FC } from "react";
import CustomImage from "./image";

const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="h-96 flex flex-col p-6 rounded-lg hover:scale-105 transition-transform ease-out duration-200 border">
        <div className="relative flex-1 max-h-80">
          <CustomImage product={product} fill />
        </div>
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
          {product.category || "Category"}
        </h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4 line-clamp-1">
          {product.title || "Chichen Itza"}
        </h2>
        <p className="leading-relaxed text-base line-clamp-3">
          {product.description ||
            "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche"}
        </p>
      </div>
    </Link>
  );
};

export default Product;
