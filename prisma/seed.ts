import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const MOCK_NEWS = [
    {
        title: "Elecciones Legislativas 2025: Todo lo que tenés que saber",
        excerpt: "Análisis profundo de los candidatos, las propuestas y el escenario político de cara a las próximas elecciones legislativas.",
        content: "Contenido completo del artículo...",
        category: "Politica",
        image: "/placeholder.jpg",
        featured: true,
        published: true
    },
    {
        title: "El impacto de la Inteligencia Artificial en la economía argentina",
        excerpt: "Cómo las nuevas tecnologías están transformando el mercado laboral y las oportunidades de negocio en el país.",
        content: "Contenido completo del artículo...",
        category: "Economia",
        image: "/placeholder.jpg",
        featured: false,
        published: true
    },
    {
        title: "Nuevas medidas para el sector agropecuario",
        excerpt: "El gobierno anunció un paquete de incentivos para fomentar la exportación y la producción nacional.",
        content: "Contenido completo del artículo...",
        category: "Economia",
        image: "/placeholder.jpg",
        featured: false,
        published: true
    },
    {
        title: "Avances en la medicina: Nuevo tratamiento desarrollado en Argentina",
        excerpt: "Científicos del CONICET lograron un hito importante en la lucha contra enfermedades neurodegenerativas.",
        content: "Contenido completo del artículo...",
        category: "Sociedad",
        image: "/placeholder.jpg",
        featured: false,
        published: true
    },
    {
        title: "La Selección Argentina se prepara para la Copa América",
        excerpt: "Scaloni define la lista de convocados y los amistosos previos al torneo continental.",
        content: "Contenido completo del artículo...",
        category: "Deportes",
        image: "/placeholder.jpg",
        featured: false,
        published: true
    }
];

async function main() {
    console.log('Start seeding ...');

    // Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@politica.com.ar' },
        update: {},
        create: {
            email: 'admin@politica.com.ar',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });
    console.log(`Created user: ${admin.email}`);

    // Create Categories
    const categories = ['Politica', 'Economia', 'Sociedad', 'Mundo', 'Deportes', 'Opinion'];
    const categoryMap = new Map();

    for (const catName of categories) {
        const slug = catName.toLowerCase();
        const category = await prisma.category.upsert({
            where: { slug },
            update: {},
            create: {
                name: catName,
                slug,
            },
        });
        categoryMap.set(catName, category.id);
        console.log(`Created category: ${category.name}`);
    }

    // Create Articles
    for (const news of MOCK_NEWS) {
        const categoryId = categoryMap.get(news.category);
        if (!categoryId) continue;

        const slug = news.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const article = await prisma.article.upsert({
            where: { slug },
            update: {},
            create: {
                title: news.title,
                slug,
                excerpt: news.excerpt,
                content: news.content,
                image: news.image,
                published: news.published,
                featured: news.featured,
                categoryId: categoryId,
                authorId: admin.id,
            },
        });
        console.log(`Created article: ${article.title}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
