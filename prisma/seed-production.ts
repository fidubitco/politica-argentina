import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const PRODUCTION_NEWS = [
    {
        title: "Argentina avanza en acuerdos comerciales con la Unión Europea",
        excerpt: "El gobierno nacional anunció importantes progresos en las negociaciones para fortalecer los lazos comerciales con el bloque europeo.",
        content: "En una conferencia de prensa realizada en Casa Rosada, el Ministro de Relaciones Exteriores confirmó que las conversaciones con representantes de la Unión Europea han alcanzado un punto crucial. Los acuerdos preliminares incluyen la reducción de aranceles para productos agrícolas argentinos y la facilitación de inversiones europeas en infraestructura. Expertos económicos consideran que este avance podría significar un impulso significativo para las exportaciones nacionales en los próximos años.",
        category: "Politica",
        image: "/placeholder.jpg",
        featured: true,
        published: true
    },
    {
        title: "Inflación mensual registra una baja histórica",
        excerpt: "El INDEC reportó una desaceleración en el índice de precios al consumidor, marcando un hito en la política económica actual.",
        content: "Según los datos oficiales publicados por el Instituto Nacional de Estadística y Censos, la inflación mensual alcanzó su nivel más bajo en los últimos tres años. Los analistas atribuyen esta tendencia a la combinación de políticas monetarias restrictivas y la estabilización del tipo de cambio. El sector comercial muestra señales de recuperación, mientras que el poder adquisitivo de los hogares comienza a mostrar mejoras graduales.",
        category: "Economia",
        image: "/placeholder.jpg",
        featured: false,
        published: true
    },
    {
        title: "Nueva ley de educación digital llega al Congreso",
        excerpt: "Diputados presentan un proyecto para modernizar el sistema educativo con tecnología de última generación.",
        content: "La iniciativa legislativa propone la incorporación obligatoria de herramientas digitales en todos los niveles educativos del país. El proyecto incluye la provisión de tablets para estudiantes de escuelas públicas, capacitación docente en nuevas tecnologías y la creación de una plataforma nacional de contenidos educativos. Organizaciones de educadores y padres han expresado su apoyo, aunque señalan la necesidad de garantizar la conectividad en zonas rurales.",
        category: "Sociedad",
        image: "/placeholder.jpg",
        featured: false,
        published: true
    },
    {
        title: "Cumbre del G20: Argentina propone agenda climática",
        excerpt: "El presidente argentino presentó una propuesta integral para combatir el cambio climático en el encuentro de líderes mundiales.",
        content: "Durante su intervención en la cumbre del G20, el mandatario argentino destacó la urgencia de implementar políticas ambientales coordinadas a nivel global. La propuesta incluye compromisos de reducción de emisiones, inversión en energías renovables y protección de ecosistemas críticos. La iniciativa recibió el respaldo de varios países latinoamericanos y europeos, generando expectativas sobre posibles acuerdos vinculantes.",
        category: "Mundo",
        image: "/placeholder.jpg",
        featured: false,
        published: true
    },
    {
        title: "La Selección Argentina se consagra campeona en torneo amistoso",
        excerpt: "El equipo nacional venció en la final y mantiene su racha invicta en competencias internacionales.",
        content: "Con un desempeño sobresaliente, la selección argentina de fútbol conquistó el título del torneo amistoso celebrado en Europa. El equipo dirigido por Lionel Scaloni demostró solidez defensiva y efectividad ofensiva, consolidándose como uno de los favoritos para las próximas competencias oficiales. Los hinchas celebraron en todo el país, mientras que los jugadores agradecieron el apoyo incondicional de la afición.",
        category: "Deportes",
        image: "/placeholder.jpg",
        featured: false,
        published: true
    },
    {
        title: "Debate sobre reforma judicial divide opiniones",
        excerpt: "Expertos analizan las implicancias de la propuesta que busca modificar el sistema de justicia argentino.",
        content: "La reforma judicial propuesta por el gobierno ha generado un intenso debate en la sociedad argentina. Mientras que sus impulsores argumentan que modernizará y agilizará los procesos judiciales, los críticos advierten sobre posibles riesgos para la independencia del poder judicial. Organizaciones de derechos humanos, colegios de abogados y partidos políticos han expresado posturas encontradas, solicitando mayor transparencia en el proceso legislativo.",
        category: "Opinion",
        image: "/placeholder.jpg",
        featured: false,
        published: true
    }
];

async function main() {
    console.log('🌱 Starting production database seed...');

    try {
        // Create Admin User
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await prisma.user.upsert({
            where: { email: 'admin@politica.com.ar' },
            update: {},
            create: {
                email: 'admin@politica.com.ar',
                name: 'Administrador',
                password: hashedPassword,
                role: 'ADMIN',
            },
        });
        console.log(`✅ Created admin user: ${admin.email}`);

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
            console.log(`✅ Created category: ${category.name}`);
        }

        // Create Articles
        let articleCount = 0;
        for (const news of PRODUCTION_NEWS) {
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
            articleCount++;
            console.log(`✅ Created article: ${article.title}`);
        }

        console.log(`\n🎉 Production seeding completed successfully!`);
        console.log(`📊 Summary:`);
        console.log(`   - 1 admin user created`);
        console.log(`   - ${categories.length} categories created`);
        console.log(`   - ${articleCount} articles created`);
        console.log(`\n🔐 Login credentials:`);
        console.log(`   Email: admin@politica.com.ar`);
        console.log(`   Password: admin123`);
        console.log(`\n⚠️  Remember to change the admin password after first login!`);

    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
