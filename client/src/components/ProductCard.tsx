import { Link } from "wouter";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-muted">
        {product.isFeatured && (
          <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Featured
          </span>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link href={`/product/${product.id}`} className="bg-white text-black px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
            View Details
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="font-sans font-bold text-lg text-primary">
            ${product.price}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <button 
          className="w-full mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm
          bg-secondary/10 text-secondary hover:bg-secondary hover:text-white
          transition-colors duration-200"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
