import { Navigation } from "@/components/Navigation";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { Heart, Users, Truck, Award } from "lucide-react";

const stats = [
  { value: "10+", label: "Years of Service" },
  { value: "5000+", label: "Happy Customers" },
  { value: "200+", label: "Products" },
  { value: "15+", label: "Countries Served" },
];

const values = [
  { icon: <Heart className="w-6 h-6" />, title: "Passion for Quality", desc: "Every product is hand-selected to ensure the highest quality reaches your kitchen." },
  { icon: <Users className="w-6 h-6" />, title: "Community First", desc: "We're more than a store — we're a gathering place for African culture and traditions." },
  { icon: <Truck className="w-6 h-6" />, title: "Reliable Delivery", desc: "From our warehouse to your doorstep, we ensure your items arrive fresh and on time." },
  { icon: <Award className="w-6 h-6" />, title: "Authentic Sourcing", desc: "We work directly with farmers and suppliers across Africa to bring you genuine products." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Marquee />

      {/* Hero */}
      <div className="border-b-2 border-primary">
        <div className="max-w-[1200px] mx-auto px-5 pt-14 pb-12 text-center">
          <span className="kicker mb-5">★ Our Story ★</span>
          <h1 className="uppercase font-black text-[clamp(2.8rem,7vw,4.5rem)] leading-[0.95] mb-5">
            Rooted in <span className="text-primary">Culture</span>
          </h1>
          <p className="text-xl text-[#d8d4c9] leading-relaxed max-w-3xl mx-auto">
            Founded with a passion for connecting people to their roots through food,
            Roshdah African Market grew from a small family venture into a hub for African culture, food, and logistics.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-5 -mt-0 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={`brutal bg-[#f4f1ea] text-black p-6 text-center ${i % 2 === 0 ? "tilt-l" : "tilt-r"}`}>
              <div className="font-display font-black text-4xl text-secondary">{stat.value}</div>
              <div className="font-display font-extrabold uppercase text-[0.75rem] tracking-wide text-[#555] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rotate-2">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"
              alt="African Market"
              className="border-[3px] border-foreground w-full h-[400px] object-cover"
              style={{ boxShadow: "8px 8px 0 #0e0e0c" }}
            />
          </div>
          <div>
            <h2 className="uppercase font-black text-4xl mb-6">
              From Our Family <span className="text-primary">to Yours</span>
            </h2>
            <div className="space-y-5 text-lg text-[#d8d4c9] leading-relaxed">
              <p>
                Roshdah African Market began as a small family venture, driven by the difficulty
                of finding authentic, high-quality African ingredients in the diaspora. What started
                as a corner shop is now a destination for African food lovers.
              </p>
              <p>
                We believe food is more than sustenance — it is memory, culture, and community.
                That's why we go the extra mile to source fresh produce directly from trusted farmers
                across the continent.
              </p>
              <p>
                Today, we serve thousands of customers, helping them recreate the tastes of home,
                no matter where they are in the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[#f4f1ea] text-black border-y-2 border-black py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="!text-black uppercase font-black text-4xl mb-10 text-center">
            What We <span className="hl">Stand For</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <div key={i} className={`brutal brutal-hover bg-white p-6 ${i % 2 === 0 ? "tilt-l" : "tilt-r"}`}>
                <div className="w-12 h-12 bg-primary border-2 border-black flex items-center justify-center text-black mb-4">
                  {value.icon}
                </div>
                <h3 className="!text-black font-display font-extrabold uppercase text-lg mb-2">{value.title}</h3>
                <p className="text-[#555] text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="uppercase font-black text-4xl mb-5">Ready to Taste <span className="text-primary">Home?</span></h2>
          <p className="text-lg text-[#a9a49a] mb-8">
            Explore the market, or hit us up about catering and logistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="street-btn street-btn-lime">
              Shop Products
            </Link>
            <Link href="/contact" className="street-btn street-btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
