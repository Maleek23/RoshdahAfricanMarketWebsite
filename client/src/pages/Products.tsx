import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts, useCategories } from "@/hooks/use-products";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  
  const { data: products, isLoading: loadingProducts } = useProducts({ 
    search: search || undefined,
    categoryId: selectedCategory
  });
  
  const { data: categories } = useCategories();

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="pt-32 pb-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl font-bold mb-6">Our Market</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Browse our extensive collection of authentic African groceries, spices, and household items.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="font-display font-bold text-xl mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9 bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(undefined)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === undefined 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  All Products
                </button>
                {categories?.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.id 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            
            {(search || selectedCategory !== undefined) && (
              <Button variant="outline" className="w-full" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" /> Clear Filters
              </Button>
            )}
          </aside>

          {/* Mobile Filter Sheet */}
          <div className="lg:hidden mb-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="w-4 h-4 mr-2" /> Filters & Search
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-8">
                  <div>
                    <h3 className="font-bold mb-4">Search</h3>
                    <Input 
                      placeholder="Search..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">Categories</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory(undefined)}
                        className={`w-full text-left px-3 py-2 rounded-md ${!selectedCategory ? 'bg-primary/10 text-primary' : ''}`}
                      >
                        All
                      </button>
                      {categories?.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full text-left px-3 py-2 rounded-md ${selectedCategory === cat.id ? 'bg-primary/10 text-primary' : ''}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {loadingProducts ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-muted rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center py-24 bg-muted/20 rounded-3xl">
                <h3 className="text-xl font-bold text-muted-foreground">No products found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
                <Button variant="link" onClick={clearFilters} className="mt-4 text-primary">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
