import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-4 py-32">
        <h1 className="font-display text-5xl font-bold mb-8 text-center">Our Story</h1>
        
        <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed">
          <p className="text-xl text-foreground font-medium mb-8 text-center">
            Founded with a passion for connecting people to their roots through food.
          </p>

          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop" 
            alt="Market Stalls" 
            className="w-full h-64 object-cover rounded-3xl mb-12 shadow-xl"
          />

          <p className="mb-6">
            Roshdah African Market began as a small family venture, driven by the difficulty of finding authentic, high-quality African ingredients in the diaspora. What started as a small corner shop has grown into a comprehensive hub for African culture, food, and logistics.
          </p>

          <p className="mb-6">
            We believe that food is more than just sustenance—it is memory, culture, and community. That's why we go the extra mile to source fresh produce directly from trusted farmers and suppliers across the continent.
          </p>

          <h3 className="text-2xl font-display font-bold text-foreground mt-12 mb-4">Our Mission</h3>
          <p className="mb-6">
            To provide the most authentic African culinary experience while building a bridge for commerce through reliable logistics. Whether you are craving the taste of home or a business looking to import goods, we are your trusted partner.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
