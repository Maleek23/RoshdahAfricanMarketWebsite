import { useState } from "react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="brutal brutal-hover bg-[#f4f1ea] text-black flex flex-col overflow-hidden">
      <Link href={`/product/${product.id}`} className="block border-b-2 border-black relative">
        {product.isFeatured && (
          <span className="prod-tag absolute top-3 left-3 z-10">Bestseller</span>
        )}
        <img
          src={product.imageUrl || ""}
          alt={product.name}
          className="h-[190px] w-full object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="!text-black font-display font-extrabold uppercase text-[1.02rem] leading-tight hover:text-secondary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="font-display font-black text-[1.35rem] text-black">${product.price}</div>
        <button
          onClick={handleAdd}
          className={`mt-auto font-display font-extrabold uppercase text-[0.9rem] tracking-wide p-3.5 cursor-pointer transition-colors ${
            added ? "bg-primary text-black" : "bg-black text-primary hover:bg-secondary hover:text-white"
          }`}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
