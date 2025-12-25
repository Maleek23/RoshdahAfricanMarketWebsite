import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Truck, UtensilsCrossed, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { useTestimonials } from "@/hooks/use-content";
import { ProductCard } from "@/components/ProductCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/10 to-transparent skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Authentic African Flavors
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] text-foreground">
            Taste the Soul of <span className="text-primary relative inline-block">
              Africa
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
            Experience the rich heritage of African cuisine. From rare spices to fresh produce, we bring the authentic market experience to your doorstep.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-full text-lg px-8 py-6 border-2 hover:bg-secondary/5">
                Our Services
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Hero Image Collage */}
          <div className="relative z-10 grid grid-cols-2 gap-4">
             {/* unsplash: variety of colorful spices in wooden bowls */}
            <img 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop" 
              alt="Spices" 
              className="rounded-3xl shadow-2xl w-full h-64 object-cover transform translate-y-12 hover:scale-105 transition-transform duration-500"
            />
             {/* unsplash: african woman in market with vegetables */}
            <img 
              src="https://images.unsplash.com/photo-1604542031651-5321d7b14d2e?q=80&w=800&auto=format&fit=crop" 
              alt="Market" 
              className="rounded-3xl shadow-2xl w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-accent" />,
      title: "Fresh & Organic",
      desc: "Sourced directly from trusted farmers ensuring top quality."
    },
    {
      icon: <Truck className="w-8 h-8 text-secondary" />,
      title: "Global Logistics",
      desc: "Fast and reliable shipping through Quickway Global Logistics."
    },
    {
      icon: <UtensilsCrossed className="w-8 h-8 text-primary" />,
      title: "Catering Services",
      desc: "Authentic small chops and meals for your special events."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-background shadow-inner flex items-center justify-center mb-6 ring-1 ring-black/5">
                {f.icon}
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Products
function FeaturedProducts() {
  const { data: products, isLoading } = useProducts({ featured: true });

  if (isLoading) return <div className="py-24 text-center">Loading featured items...</div>;

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold mb-4">Market Favorites</h2>
            <p className="text-muted-foreground max-w-lg">Hand-picked selections that our customers love the most.</p>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="hidden sm:flex group">
              View All <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center sm:hidden">
           <Link href="/products">
            <Button variant="outline" className="w-full">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  const { data: testimonials } = useTestimonials();

  if (!testimonials?.length) return null;

  return (
    <section className="py-24 bg-foreground text-background overflow-hidden relative">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4 text-primary">Community Love</h2>
          <p className="text-white/60">Don't just take our word for it.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-lg italic text-white/90 mb-6">"{t.content}"</p>
              <div>
                <div className="font-bold font-display text-lg">{t.name}</div>
                <div className="text-sm text-white/50">{t.role || 'Customer'}</div>
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
    <div className="min-h-screen bg-background font-sans">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <FeaturedProducts />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
