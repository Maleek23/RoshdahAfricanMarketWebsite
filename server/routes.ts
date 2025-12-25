
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

    // Products
    await storage.createProduct({
      name: "Jollof Rice Spice Blend",
      description: "The perfect blend of spices for authentic Jollof Rice.",
      price: "5.99",
      categoryId: catSpices.id,
      imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
      isFeatured: true,
      inStock: true
    });

    await storage.createProduct({
      name: "Premium Pounded Yam Flour",
      description: "Smooth and easy to prepare pounded yam flour.",
      price: "12.50",
      categoryId: catGrains.id,
      imageUrl: "https://images.unsplash.com/photo-1628838380846-953330cb7035?w=800&q=80",
      isFeatured: true,
      inStock: true
    });

    await storage.createProduct({
      name: "Fresh Plantains (Bundle)",
      description: "Sweet, ripe plantains directly from the farm.",
      price: "4.00",
      categoryId: catProduce.id,
      imageUrl: "https://images.unsplash.com/photo-1603052875302-d376b7c0638a?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    await storage.createProduct({
      name: "Chin Chin",
      description: "Crunchy and sweet fried dough snack.",
      price: "3.50",
      categoryId: catSnacks.id,
      imageUrl: "https://images.unsplash.com/photo-1621255554366-38297b4b3952?w=800&q=80",
      isFeatured: true,
      inStock: true
    });
    
    await storage.createProduct({
      name: "Garri (Cassava Grits)",
      description: "Available in Yellow and White varieties.",
      price: "8.99",
      categoryId: catGrains.id,
      imageUrl: "https://images.unsplash.com/photo-1630402636952-475262799307?w=800&q=80",
      isFeatured: false,
      inStock: true
    });

    // Testimonials
    await storage.createTestimonial({
      name: "Chioma A.",
      content: "Roshdah Market brings me back home! The ingredients are always fresh.",
      rating: 5,
      role: "Loyal Customer"
    });

    await storage.createTestimonial({
      name: "David K.",
      content: "Best place to get authentic spices for my cooking.",
      rating: 5,
      role: "Chef"
    });
    
    console.log("Database seeded successfully!");
  }
}
