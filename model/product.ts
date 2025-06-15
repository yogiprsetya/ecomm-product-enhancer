import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(2).max(128),
  description: z.string().min(20).max(500),
});

export type Product = z.infer<typeof ProductSchema>;
