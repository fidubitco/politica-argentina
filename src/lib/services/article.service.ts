import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class ArticleService {
    static async getArticles(params: {
        published?: boolean;
        featured?: boolean;
        categoryId?: string;
        limit?: number;
        skip?: number;
    } = {}) {
        const { published, featured, categoryId, limit, skip } = params;

        const where: Prisma.ArticleWhereInput = {};
        if (published !== undefined) where.published = published;
        if (featured !== undefined) where.featured = featured;
        if (categoryId) where.categoryId = categoryId;

        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where,
                include: { category: true, author: true },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip: skip,
            }),
            prisma.article.count({ where }),
        ]);

        return { articles, total };
    }

    static async getArticleBySlug(slug: string) {
        return prisma.article.findUnique({
            where: { slug },
            include: { category: true, author: true },
        });
    }

    static async getArticleById(id: string) {
        return prisma.article.findUnique({
            where: { id },
            include: { category: true, author: true },
        });
    }

    static async createArticle(data: Prisma.ArticleCreateInput) {
        return prisma.article.create({
            data,
            include: { category: true, author: true },
        });
    }

    static async updateArticle(id: string, data: Prisma.ArticleUpdateInput) {
        return prisma.article.update({
            where: { id },
            data,
            include: { category: true, author: true },
        });
    }

    static async deleteArticle(id: string) {
        return prisma.article.delete({
            where: { id },
        });
    }
}
