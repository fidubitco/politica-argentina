import { z } from 'zod';

export const articleSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
    excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
    content: z.string().min(50, 'Content must be at least 50 characters'),
    categoryId: z.string().uuid('Invalid category ID'),
    authorId: z.string().uuid('Invalid author ID'),
    image: z.string().optional(),
    published: z.boolean().optional(),
    featured: z.boolean().optional(),
});

export const articleUpdateSchema = articleSchema.partial();
