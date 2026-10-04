import { useRoute, Link } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { Navigation } from "@/components/Navigation";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Check, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: product, isLoading, isError } = useProduct(id);
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-[1200px] mx-auto px-5 py-32 flex justify-center">
          <div className="font-display font-black uppercase text-primary text-xl animate-pulse">Loading the goods...</div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="uppercase font-black text-4xl mb-4">Product Not Found</h1>
          <p className="text-[#a9a49a] mb-8">That item ain't on the shelf.</p>
          <Link href="/products" className="street-btn street-btn-lime street-btn-sm">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Marquee />

      <div className="max-w-[1200px] mx-auto px-5 py-12">
        <Link href="/products" className="sec-link inline-flex items-center mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="brutal relative bg-[#f4f1ea] overflow-hidden">
            <img src={product.imageUrl || ""} alt={product.name} className="w-full aspect-square object-cover" />
            {product.isFeatured && (
              <span className="prod-tag absolute top-4 left-4 !text-[0.8rem] !px-3 !py-1.5">Bestseller</span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="kicker mb-5 self-start">★ Authentic Selection ★</div>
            <h1 className="uppercase font-black text-4xl md:text-5xl leading-[0.95] mb-4">{product.name}</h1>
            <div className="font-display font-black text-4xl text-primary mb-6">${product.price}</div>

            <p className="text-lg text-[#d8d4c9] leading-relaxed mb-8 pb-8 border-b-2 border-[#2a2a26]">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center bg-[#f4f1ea] text-black border-2 border-black shadow-[3px_3px_0_#000]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 font-black text-lg hover:bg-accent transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-12 text-center font-display font-extrabold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 font-black text-lg hover:bg-accent transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAdd}
                className={`street-btn flex-1 min-w-[220px] ${added ? "street-btn-lime" : "street-btn-black"}`}
              >
                {added ? "Added ✓" : "Add to Cart"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="brutal bg-[#f4f1ea] text-black p-4 flex items-start gap-3">
                <Truck className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <div>
                  <h4 className="!text-black font-display font-extrabold uppercase text-sm">Fast Shipping</h4>
                  <p className="text-xs text-[#555] mt-1">Via Quickway Logistics</p>
                </div>
              </div>
              <div className="brutal bg-[#f4f1ea] text-black p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <div>
                  <h4 className="!text-black font-display font-extrabold uppercase text-sm">Quality Guarantee</h4>
                  <p className="text-xs text-[#555] mt-1">Authentic & Fresh</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#a9a49a]">
              <Check className="w-4 h-4 text-primary" />
              {product.inStock ? "In Stock & Ready to Ship" : "Currently Out of Stock"}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
