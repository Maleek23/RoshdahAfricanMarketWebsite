import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Truck, Utensils, Globe, Package } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="relative py-32 bg-foreground text-background overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Going beyond just groceries. We offer comprehensive solutions for catering and global logistics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        
        {/* Service 1: Small Chops */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4">
              <Utensils className="w-8 h-8" />
            </div>
            <h2 className="font-display text-4xl font-bold">Roshdah Small Chops</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Elevate your events with our authentic African finger foods. From puff-puff to samosas, spring rolls, and spicy gizzards, we bring the party to your taste buds.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span>Wedding & Corporate Event Catering</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span>Custom Party Platters</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span>Bulk Orders for Resellers</span>
              </li>
            </ul>
            <Link href="/book-catering">
              <Button size="lg" className="mt-4 bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/20">
                Book Catering
              </Button>
            </Link>
          </div>
          <div className="order-1 lg:order-2">
             {/* unsplash: tray of appetizers pastries */}
            <img 
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" 
              alt="Small Chops Catering" 
              className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white"
            />
          </div>
        </div>

        {/* Service 2: Logistics */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
             {/* unsplash: shipping containers cargo global logistics */}
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" 
              alt="Global Logistics" 
              className="rounded-3xl shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white"
            />
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
              <Globe className="w-8 h-8" />
            </div>
            <h2 className="font-display text-4xl font-bold">Quickway Global Logistics</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We bridge the gap between continents. Reliable freight forwarding, customs clearing, and door-to-door delivery services between Africa and the world.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-xl bg-muted/20">
                <Package className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-bold">Air Freight</h4>
                <p className="text-sm text-muted-foreground">Fast delivery for perishables</p>
              </div>
              <div className="p-4 border border-border rounded-xl bg-muted/20">
                <Truck className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-bold">Sea Freight</h4>
                <p className="text-sm text-muted-foreground">Cost-effective bulk shipping</p>
              </div>
            </div>
            <Link href="/contact">
              <Button size="lg" className="mt-4 shadow-lg shadow-primary/20">
                Get Shipping Quote
              </Button>
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
