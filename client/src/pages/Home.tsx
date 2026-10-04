import { Link } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { useTestimonials } from "@/hooks/use-content";
import { ProductCard } from "@/components/ProductCard";
import { Navigation } from "@/components/Navigation";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";

const CATEGORIES = [
  { emoji: "🌶️", name: "Spices & Seasonings", desc: "Suya, jollof blends & more" },
  { emoji: "🌾", name: "Grains & Flours", desc: "Yam flour, garri, ofada" },
  { emoji: "🍿", name: "Snacks & Drinks", desc: "Chin chin, Malta & more" },
  { emoji: "🥔", name: "Fresh Produce", desc: "Yam, plantain, peppers" },
  { emoji: "🫗", name: "Oils & Sauces", desc: "Palm oil, groundnut oil" },
];

function Hero() {
  return (
    <section className="relative py-[90px] pb-[70px] overflow-hidden bg-[#0e0e0c]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 85% 15%, rgba(198,242,78,.14) 0 220px, transparent 221px), radial-gradient(circle at 8% 85%, rgba(255,92,31,.16) 0 260px, transparent 261px)",
        }}
      />
      <div className="max-w-[1200px] mx-auto px-5 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">
        <div>
          <span className="kicker mb-[22px]">★ African Grocery + Catering ★</span>
          <h1 className="uppercase font-black leading-[0.95] text-[clamp(3rem,8vw,6.2rem)] mb-5">
            Real African<br />
            <span className="text-primary">Food.</span> <span className="text-secondary">No&nbsp;Games.</span>
          </h1>
          <p className="text-[1.15rem] max-w-[34rem] mb-8 text-[#d8d4c9]">
            The flavors you grew up on — fresh yam, fiery suya spice, party-perfect small chops — stocked fresh and shipped to your door. This is home, delivered.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/products" className="street-btn street-btn-lime">
              Shop the Market
            </Link>
            <Link href="/book-catering" className="street-btn street-btn-ghost">
              Book Catering
            </Link>
          </div>
        </div>
        <div className="relative rotate-2 hidden md:block">
          <img
            className="border-[3px] border-foreground w-full h-[440px] object-cover"
            style={{ boxShadow: "8px 8px 0 #0e0e0c" }}
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80"
            alt="Colorful African spices in bowls"
          />
          <div className="sticker absolute bg-primary text-black -top-[22px] -left-[18px] -rotate-[8deg]">100% Authentic</div>
          <div className="sticker absolute bg-secondary text-white bottom-[34px] -right-[14px] rotate-[6deg]">Ships Nationwide</div>
          <div className="sticker absolute bg-accent text-black -bottom-[18px] left-8 -rotate-[4deg] !text-[0.8rem]">★ Family Owned ★</div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="bg-[#f4f1ea] text-black border-y-2 border-black py-[72px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex items-end justify-between mb-9 flex-wrap gap-3">
          <h2 className="!text-black uppercase font-black text-[clamp(2rem,5vw,3.4rem)]">
            Shop by <span className="hl">Craving</span>
          </h2>
          <Link href="/products" className="sec-link !text-black hover:!text-secondary">
            View everything →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              href="/products"
              className={`brutal brutal-hover bg-white p-[26px_18px] text-center font-display font-extrabold uppercase text-[1rem] ${i % 2 === 0 ? "tilt-l" : "tilt-r"}`}
            >
              <span className="text-[2.2rem] block mb-3">{cat.emoji}</span>
              {cat.name}
              <small className="block font-body font-medium normal-case text-[0.8rem] text-[#555] mt-2">{cat.desc}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const { data: products, isLoading } = useProducts({ featured: true });

  return (
    <section className="py-[72px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex items-end justify-between mb-9 flex-wrap gap-3">
          <h2 className="uppercase font-black text-[clamp(2rem,5vw,3.4rem)]">
            Featured <span className="text-primary">Heat</span>
          </h2>
          <Link href="/products" className="sec-link">
            Shop all →
          </Link>
        </div>
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="brutal bg-[#1a1a18] h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            {products?.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function HypeStrip() {
  const items = [
    { emoji: "🌍", title: "Farm-Direct", desc: "Sourced straight from trusted farms and importers. No middlemen, no stale stock — just the real thing." },
    { emoji: "📦", title: "Ships Nationwide", desc: "From Lagos to Los Angeles — your cravings packed tight and delivered fresh, anywhere in the country." },
    { emoji: "💒", title: "Wedding Catering", desc: "Small chops, jollof, and full spreads for weddings and events. Your guests will talk about it for years." },
  ];
  return (
    <section className="bg-accent text-black border-y-2 border-black !py-0">
      <div className="grid md:grid-cols-3">
        {items.map((item, i) => (
          <div key={item.title} className={`px-7 py-10 text-center ${i < items.length - 1 ? "md:border-r-2 md:border-black border-b-2 md:border-b-0 border-black" : ""}`}>
            <span className="font-display font-black text-[2.6rem] block mb-2">{item.emoji}</span>
            <h3 className="!text-black uppercase font-black text-[1.25rem] mb-2">{item.title}</h3>
            <p className="text-[0.95rem]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Catering() {
  return (
    <section className="bg-primary text-black border-b-2 border-black py-[72px]">
      <div className="max-w-[1200px] mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="kicker !bg-black !text-primary mb-5">★ Catering ★</span>
          <h2 className="!text-black uppercase font-black text-[clamp(2.4rem,6vw,4.2rem)] mb-[18px] leading-[0.95]">
            Weddings &amp; Events? We Run the Food.
          </h2>
          <p className="text-[1.1rem] font-medium max-w-[30rem] mb-7">
            From intimate birthdays to 500-guest weddings, Roshdah Catering brings the full party — small chops platters, jollof rice stations, puff-puff on demand, and everything in between.
          </p>
          <ul className="list-none mb-7 grid gap-2.5">
            {["Small chops platters", "Jollof & fried rice stations", "Full wedding spreads", "Corporate & party packages"].map((li) => (
              <li key={li} className="font-display font-extrabold uppercase text-[0.95rem]">
                <span className="text-secondary">✦ </span>
                {li}
              </li>
            ))}
          </ul>
          <Link href="/book-catering" className="street-btn street-btn-black">
            Get a Free Quote
          </Link>
        </div>
        <div>
          <img
            className="border-[3px] border-black w-full h-[380px] object-cover -rotate-2"
            style={{ boxShadow: "8px 8px 0 #0e0e0c" }}
            src="https://images.unsplash.com/photo-1621255554366-38297b4b3952?w=800&q=80"
            alt="Catering small chops platter"
          />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { data: testimonials } = useTestimonials();
  if (!testimonials?.length) return null;

  const tilts = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]"];
  return (
    <section className="py-[72px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex items-end justify-between mb-9 flex-wrap gap-3">
          <h2 className="uppercase font-black text-[clamp(2rem,5vw,3.4rem)]">
            The Streets <span className="text-secondary">Talk</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-[22px]">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={i} className={`brutal p-7 relative ${tilts[i % 3]} ${i === 1 ? "bg-accent" : "bg-[#f4f1ea]"} text-black`}>
              <div className="text-secondary text-[1.2rem] tracking-[2px] mb-3">★★★★★</div>
              <p className="text-[1rem] mb-[18px] font-medium">"{t.content}"</p>
              <div className="font-display font-extrabold uppercase text-[0.85rem] tracking-wide">
                {t.name}
                <small className="block font-body font-medium normal-case text-[#555] mt-1">{t.role || "Customer"}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Marquee />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <HypeStrip />
        <Catering />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
