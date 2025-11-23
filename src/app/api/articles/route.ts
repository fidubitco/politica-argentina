import { NextRequest, NextResponse } from 'next/server';
import { ArticleService } from '@/lib/services/article.service';
import { articleSchema } from '@/lib/validations/article.schema';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const published = searchParams.get('published') === 'true' ? true : undefined;
        const featured = searchParams.get('featured') === 'true' ? true : undefined;
        const categoryId = searchParams.get('categoryId') || undefined;
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
        const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!) : undefined;

        const result = await ArticleService.getArticles({
            published,
            featured,
            categoryId,
            limit,
            skip
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Validate request body
        const validatedData = articleSchema.parse(body);

        // Create article
        const article = await ArticleService.createArticle({
            title: validatedData.title,
            slug: validatedData.slug,
            excerpt: validatedData.excerpt,
            content: validatedData.content,
            image: validatedData.image,
            published: validatedData.published,
            featured: validatedData.featured,
            category: { connect: { id: validatedData.categoryId } },
            author: { connect: { id: validatedData.authorId } }
        });

        return NextResponse.json(article, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation Error', details: (error as any).errors }, { status: 400 });
        }
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
