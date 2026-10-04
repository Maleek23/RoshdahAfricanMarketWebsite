import { Navigation } from "@/components/Navigation";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { Truck, Utensils, Globe, Package } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Marquee />

      {/* Header */}
      <div className="border-b-2 border-primary">
        <div className="max-w-[1200px] mx-auto px-5 pt-14 pb-12 text-center">
          <span className="kicker mb-5">★ More Than Groceries ★</span>
          <h1 className="uppercase font-black text-[clamp(2.8rem,7vw,4.5rem)] leading-[0.95] mb-5">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-[#d8d4c9] max-w-2xl mx-auto">
            Catering that steals the show. Logistics that cross oceans. We do it all.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-20 space-y-24">
        {/* Service 1: Small Chops */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="sticker bg-secondary text-white mb-5 -rotate-2">
              <Utensils className="w-5 h-5 inline mr-2 -mt-1" /> Catering
            </div>
            <h2 className="uppercase font-black text-4xl mb-5">
              Roshdah <span className="text-secondary">Small Chops</span>
            </h2>
            <p className="text-lg text-[#d8d4c9] leading-relaxed mb-6">
              Elevate your events with authentic African finger foods. From puff-puff to samosas,
              spring rolls, and spicy gizzards — we bring the party to your taste buds.
            </p>
            <ul className="space-y-3 mb-8">
              {["Wedding & Corporate Event Catering", "Custom Party Platters", "Bulk Orders for Resellers"].map((li) => (
                <li key={li} className="flex items-center gap-3 font-medium">
                  <span className="text-primary font-black">✦</span> {li}
                </li>
              ))}
            </ul>
            <Link href="/book-catering" className="street-btn street-btn-orange">
              Book Catering
            </Link>
          </div>
          <div className="order-1 lg:order-2 rotate-2">
            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop"
              alt="Small Chops Catering"
              className="border-[3px] border-foreground w-full h-[380px] object-cover"
              style={{ boxShadow: "8px 8px 0 #0e0e0c" }}
            />
          </div>
        </div>

        {/* Service 2: Logistics */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="-rotate-2">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
              alt="Global Logistics"
              className="border-[3px] border-foreground w-full h-[380px] object-cover"
              style={{ boxShadow: "8px 8px 0 #0e0e0c" }}
            />
          </div>
          <div>
            <div className="sticker bg-primary text-black mb-5 rotate-2">
              <Globe className="w-5 h-5 inline mr-2 -mt-1" /> Logistics
            </div>
            <h2 className="uppercase font-black text-4xl mb-5">
              Quickway <span className="text-primary">Global Logistics</span>
            </h2>
            <p className="text-lg text-[#d8d4c9] leading-relaxed mb-6">
              We bridge the gap between continents. Reliable freight forwarding, customs clearing,
              and door-to-door delivery between Africa and the world.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="brutal bg-[#f4f1ea] text-black p-5">
                <Package className="w-6 h-6 text-secondary mb-2" />
                <h4 className="!text-black font-display font-extrabold uppercase">Air Freight</h4>
                <p className="text-sm text-[#555]">Fast delivery for perishables</p>
              </div>
              <div className="brutal bg-[#f4f1ea] text-black p-5">
                <Truck className="w-6 h-6 text-secondary mb-2" />
                <h4 className="!text-black font-display font-extrabold uppercase">Sea Freight</h4>
                <p className="text-sm text-[#555]">Cost-effective bulk shipping</p>
              </div>
            </div>
            <Link href="/contact" className="street-btn street-btn-lime">
              Get Shipping Quote
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
