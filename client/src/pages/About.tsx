import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, Users, Truck, Award } from "lucide-react";

const stats = [
  { value: "10+", label: "Years of Service" },
  { value: "5000+", label: "Happy Customers" },
  { value: "200+", label: "Products" },
  { value: "15+", label: "Countries Served" },
];

const values = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Passion for Quality",
    desc: "Every product is hand-selected to ensure the highest quality reaches your kitchen."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community First",
    desc: "We're more than a store - we're a gathering place for African culture and traditions."
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Reliable Delivery",
    desc: "From our warehouse to your doorstep, we ensure your items arrive fresh and on time."
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Authentic Sourcing",
    desc: "We work directly with farmers and suppliers across Africa to bring you genuine products."
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Founded with a passion for connecting people to their roots through food, 
              Roshdah African Market has grown from a small family venture into a comprehensive 
              hub for African culture, food, and logistics.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-12 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop" 
              alt="African Market" 
              className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-display text-4xl font-bold">From Our Family to Yours</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Roshdah African Market began as a small family venture, driven by the difficulty 
              of finding authentic, high-quality African ingredients in the diaspora. What started 
              as a corner shop has grown into a comprehensive destination for African food lovers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that food is more than just sustenance—it is memory, culture, and community. 
              That's why we go the extra mile to source fresh produce directly from trusted farmers 
              and suppliers across the continent.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we proudly serve thousands of customers, helping them recreate the tastes and 
              flavors of home, no matter where they are in the world.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-muted/30 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              To provide the most authentic African culinary experience while building a bridge 
              for commerce through reliable logistics. Whether you're craving the taste of home 
              or a business looking to import goods, we're your trusted partner.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">Ready to Experience Africa?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our collection of authentic ingredients, or reach out to learn about our catering and logistics services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                Shop Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
