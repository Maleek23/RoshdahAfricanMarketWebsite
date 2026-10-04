import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts, useCategories } from "@/hooks/use-products";
import { Search, X } from "lucide-react";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  const { data: products, isLoading: loadingProducts } = useProducts({
    search: search || undefined,
    categoryId: selectedCategory,
  });

  const { data: categories } = useCategories();

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(undefined);
  };

  const chip = (active: boolean) =>
    `font-display font-extrabold uppercase text-[0.8rem] tracking-wide px-4 py-2.5 border-2 border-black cursor-pointer transition-all ${
      active
        ? "bg-primary text-black shadow-[3px_3px_0_#000]"
        : "bg-[#f4f1ea] text-black hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#000]"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Marquee />

      {/* Header */}
      <div className="border-b-2 border-primary">
        <div className="max-w-[1200px] mx-auto px-5 pt-14 pb-10">
          <span className="kicker mb-5">★ The Full Spread ★</span>
          <h1 className="uppercase font-black text-[clamp(2.8rem,7vw,4.5rem)] leading-[0.95] mb-4">
            Our <span className="text-primary">Market</span>
          </h1>
          <p className="text-[#d8d4c9] max-w-2xl text-lg">
            Every craving, covered. Spices, grains, snacks, fresh produce — the real stuff, stocked deep.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-10">
        {/* Search + filters */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center mb-8">
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
            <input
              placeholder="Search the market..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="street-input !pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button onClick={() => setSelectedCategory(undefined)} className={chip(selectedCategory === undefined)}>
              All
            </button>
            {categories?.map((cat) => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={chip(selectedCategory === cat.id)}>
                {cat.name}
              </button>
            ))}
          </div>
          {(search || selectedCategory !== undefined) && (
            <button
              onClick={clearFilters}
              className="font-display font-extrabold uppercase text-[0.8rem] tracking-wide text-primary border-b-[3px] border-primary pb-0.5 self-start lg:self-center"
            >
              <X className="w-4 h-4 inline mr-1 -mt-0.5" /> Clear
            </button>
          )}
        </div>

        {/* Grid */}
        {loadingProducts ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[22px]">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="brutal bg-[#1a1a18] h-80 animate-pulse" />
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="brutal bg-[#f4f1ea] text-black text-center py-24 px-6">
            <h3 className="!text-black uppercase font-black text-2xl mb-2">Nothing found</h3>
            <p className="text-[#555] mb-6">Try a different search or category.</p>
            <button onClick={clearFilters} className="street-btn street-btn-black street-btn-sm">
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <p className="font-display font-extrabold uppercase text-sm tracking-wide text-[#a9a49a] mb-5">
              {products?.length} item{products?.length === 1 ? "" : "s"} on the shelf
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[22px]">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
