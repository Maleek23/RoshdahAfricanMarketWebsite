import { useRoute, Link } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: product, isLoading, isError } = useProduct(id);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-32 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden bg-muted aspect-square shadow-2xl">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isFeatured && (
              <span className="absolute top-6 left-6 bg-primary text-primary-foreground font-bold px-4 py-1.5 rounded-full shadow-lg">
                Featured Item
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-2 text-primary font-medium tracking-wide uppercase text-sm">
              Authentic Selection
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {product.name}
            </h1>
            <div className="text-3xl font-bold text-primary mb-6">
              ${product.price}
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-b border-border pb-8">
              {product.description}
            </p>

            {/* Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button size="lg" className="flex-1 rounded-xl h-12 text-lg shadow-xl shadow-primary/20">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                  <Truck className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Fast Shipping</h4>
                    <p className="text-xs text-muted-foreground mt-1">Via Quickway Logistics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Quality Guarantee</h4>
                    <p className="text-xs text-muted-foreground mt-1">Authentic & Fresh</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                <Check className="w-4 h-4 text-green-500" />
                {product.inStock ? "In Stock & Ready to Ship" : "Currently Out of Stock"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
