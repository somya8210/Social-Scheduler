import { z } from "zod";

export const insertPostSchema = z.object({
  content: z.string(),
  platforms: z.array(z.string()),
  mediaUrl: z.string().nullable().optional(),
  scheduledTime: z.union([z.string(), z.date()]), // accept Date or ISO string
  status: z.string().optional(),
});

export const postSchema = insertPostSchema.extend({
  id: z.number(),
  status: z.string(),
});

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = z.infer<typeof postSchema>;
