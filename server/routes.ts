
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === PRODUCTS ===
  app.get(api.products.list.path, async (req, res) => {
    const input = api.products.list.input?.parse(req.query);
    const products = await storage.getProducts(input);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  // === CATEGORIES ===
  app.get(api.categories.list.path, async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  // === MESSAGES ===
  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // === TESTIMONIALS ===
  app.get(api.testimonials.list.path, async (req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const categories = await storage.getCategories();
  if (categories.length === 0) {
    console.log("Seeding database...");
    
    // Categories
    const catSpices = await storage.createCategory({ name: "Spices & Seasonings", slug: "spices", description: "Authentic African spices" });
    const catGrains = await storage.createCategory({ name: "Grains & Flours", slug: "grains", description: "Rice, Fufu flour, Garri" });
    const catSnacks = await storage.createCategory({ name: "Snacks & Drinks", slug: "snacks", description: "Chin chin, Malta, and more" });
    const catProduce = await storage.createCategory({ name: "Fresh Produce", slug: "produce", description: "Yam, Plantain, Vegetables" });
    const catOils = await storage.createCategory({ name: "Oils & Sauces", slug: "oils", description: "Palm oil, Groundnut oil, Sauces" });

    // Products - Spices
    await storage.createProduct({
      name: "Jollof Rice Spice Blend",
      description: "The perfect blend of spices for authentic Jollof Rice. Includes curry, thyme, bay leaves, and secret seasonings.",
      price: "5.99",
      categoryId: catSpices.id,
      imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
      isFeatured: true,
      inStock: true
    });

    await storage.createProduct({
      name: "Suya Spice Mix",
      description: "Traditional Nigerian suya pepper blend. Perfect for grilled meats and kebabs.",
      price: "4.99",
      categoryId: catSpices.id,
      imageUrl: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    await storage.createProduct({
      name: "Ground Crayfish",
      description: "Finely ground crayfish for soups and stews. Essential for Nigerian cooking.",
      price: "7.99",
      categoryId: catSpices.id,
      imageUrl: "https://images.unsplash.com/photo-1599909533681-74e6c306893c?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    // Products - Grains
    await storage.createProduct({
      name: "Premium Pounded Yam Flour",
      description: "Smooth and easy to prepare pounded yam flour. Just add hot water for perfect swallow.",
      price: "12.50",
      categoryId: catGrains.id,
      imageUrl: "https://images.unsplash.com/photo-1628838380846-953330cb7035?w=800&q=80",
      isFeatured: true,
      inStock: true
    });
    
    await storage.createProduct({
      name: "Garri (Yellow)",
      description: "Premium quality yellow garri. Perfect for eba or soaking.",
      price: "8.99",
      categoryId: catGrains.id,
      imageUrl: "https://images.unsplash.com/photo-1630402636952-475262799307?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    await storage.createProduct({
      name: "Ofada Rice",
      description: "Aromatic Nigerian brown rice. Best served with ofada sauce.",
      price: "15.99",
      categoryId: catGrains.id,
      imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
      isFeatured: true,
      inStock: true
    });

    await storage.createProduct({
      name: "Semolina Flour",
      description: "Fine semolina for making delicious wheat swallow.",
      price: "6.99",
      categoryId: catGrains.id,
      imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    // Products - Snacks
    await storage.createProduct({
      name: "Chin Chin (Large)",
      description: "Crunchy and sweet fried dough snack. A Nigerian party favorite.",
      price: "6.50",
      categoryId: catSnacks.id,
      imageUrl: "https://images.unsplash.com/photo-1621255554366-38297b4b3952?w=800&q=80",
      isFeatured: true,
      inStock: true
    });

    await storage.createProduct({
      name: "Malta Guinness (6-Pack)",
      description: "Rich, sweet non-alcoholic malt drink. Refreshing and energizing.",
      price: "12.00",
      categoryId: catSnacks.id,
      imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    await storage.createProduct({
      name: "Plantain Chips",
      description: "Crispy fried plantain chips. Lightly salted for the perfect snack.",
      price: "4.50",
      categoryId: catSnacks.id,
      imageUrl: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    // Products - Produce
    await storage.createProduct({
      name: "Fresh Plantains (Bundle)",
      description: "Sweet, ripe plantains directly from trusted farms. Perfect for frying or boiling.",
      price: "4.00",
      categoryId: catProduce.id,
      imageUrl: "https://images.unsplash.com/photo-1603052875302-d376b7c0638a?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    await storage.createProduct({
      name: "Fresh Yam Tuber",
      description: "Large, fresh yam tuber. Great for pottage, porridge, or frying.",
      price: "8.99",
      categoryId: catProduce.id,
      imageUrl: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    await storage.createProduct({
      name: "Scotch Bonnet Peppers",
      description: "Fresh, fiery scotch bonnet peppers. Essential for authentic heat.",
      price: "3.99",
      categoryId: catProduce.id,
      imageUrl: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    // Products - Oils
    await storage.createProduct({
      name: "Pure Palm Oil (1L)",
      description: "Authentic red palm oil. Essential for soups and stews.",
      price: "9.99",
      categoryId: catOils.id,
      imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
      isFeatured: true,
      inStock: true
    });

    await storage.createProduct({
      name: "Groundnut Oil (1L)",
      description: "Premium groundnut oil for frying and cooking.",
      price: "8.50",
      categoryId: catOils.id,
      imageUrl: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    // Testimonials
    await storage.createTestimonial({
      name: "Chioma A.",
      content: "Roshdah Market brings me back home! The ingredients are always fresh and the service is excellent. I recommend them to everyone.",
      rating: 5,
      role: "Loyal Customer"
    });

    await storage.createTestimonial({
      name: "David K.",
      content: "Best place to get authentic spices for my cooking. The Jollof spice blend is incredible!",
      rating: 5,
      role: "Home Chef"
    });

    await storage.createTestimonial({
      name: "Amara O.",
      content: "Their small chops catering made my wedding unforgettable. Guests couldn't stop talking about the puff-puff!",
      rating: 5,
      role: "Event Host"
    });

    await storage.createTestimonial({
      name: "Michael T.",
      content: "Finally found a place with real Nigerian ingredients. The palm oil quality is unmatched.",
      rating: 5,
      role: "Restaurant Owner"
    });

    await storage.createTestimonial({
      name: "Fatima B.",
      content: "Quick delivery and everything was packaged perfectly. Will definitely order again!",
      rating: 5,
      role: "Online Shopper"
    });
    
    console.log("Database seeded successfully!");
  }
}
