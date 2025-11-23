import { NextRequest, NextResponse } from 'next/server';
import { CategoryService } from '@/lib/services/category.service';

export async function GET() {
    try {
        const categories = await CategoryService.getCategories();
        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.name || !body.slug) {
            return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
        }

        const category = await CategoryService.createCategory({
            name: body.name,
            slug: body.slug,
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
