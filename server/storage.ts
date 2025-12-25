
import { db } from "./db";
import {
  products,
  categories,
  messages,
  testimonials,
  type Product,
  type InsertProduct,
  type Category,
  type InsertCategory,
  type Message,
  type InsertMessage,
  type Testimonial,
  type InsertTestimonial,
  type ProductQueryParams
} from "@shared/schema";
import { eq, like, and, desc } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(params?: ProductQueryParams): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class DatabaseStorage implements IStorage {
  // Products
  async getProducts(params?: ProductQueryParams): Promise<Product[]> {
    const conditions = [];
    
    if (params?.categoryId) {
      conditions.push(eq(products.categoryId, params.categoryId));
    }
    
    if (params?.featured) {
      conditions.push(eq(products.isFeatured, true));
    }
    
    if (params?.search) {
      conditions.push(like(products.name, `%${params.search}%`));
    }
    
    return await db.select()
      .from(products)
      .where(conditions.length > 0 ? and(...conditions) : undefined);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  // Messages
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }
}

export const storage = new DatabaseStorage();
