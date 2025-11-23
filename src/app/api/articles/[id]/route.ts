import { NextRequest, NextResponse } from 'next/server';
import { ArticleService } from '@/lib/services/article.service';
import { articleUpdateSchema } from '@/lib/validations/article.schema';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const article = await ArticleService.getArticleById(id);

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Validate request body
        const validatedData = articleUpdateSchema.parse(body);

        // Prepare update data
        const updateData: any = { ...validatedData };
        if (validatedData.categoryId) {
            updateData.category = { connect: { id: validatedData.categoryId } };
            delete updateData.categoryId;
        }
        if (validatedData.authorId) {
            updateData.author = { connect: { id: validatedData.authorId } };
            delete updateData.authorId;
        }

        const article = await ArticleService.updateArticle(id, updateData);

        return NextResponse.json(article);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation Error', details: (error as any).errors }, { status: 400 });
        }
        console.error('Error updating article:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await ArticleService.deleteArticle(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting article:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
