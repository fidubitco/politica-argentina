import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class CategoryService {
    static async getCategories() {
        return prisma.category.findMany({
            orderBy: { name: 'asc' },
        });
    }

    static async createCategory(data: Prisma.CategoryCreateInput) {
        return prisma.category.create({
            data,
        });
    }
}
