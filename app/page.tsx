'use client';

import Header from '@/components/header';
import { ProjectCard } from '@/components/ProjectCard';
import Link from 'next/link';

const sections = [
    {
        id: 'about',
        title: "Über Mich",
        image: "/sections/images/about.jpg",
        description: "Full Stack Developer mit Leidenschaft für moderne Webtechnologien und Clean Code.",
        content: {
            skills: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "AWS",
                "MongoDB",
                "PostgreSQL"
            ],
            goal: "Spezialisierung auf Cloud-native Architekturen und moderne Full-Stack-Entwicklung"
        }
    },
    {
        id: 'projects',
        title: "projects",
        image: "/sections/images/portfolio.jpg",
        description: "Ein modernes CMS-System für Portfolios",
        content: {
            github: "https://github.com/yourusername/portfolio-cms",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
            features: [
                "Headless CMS Integration",
                "Markdown Support",
                "Image Optimization"
            ]
        }
    },
    {
        id: 'blog',
        title: "Tech Blog",
        image: "/sections/images/blog.jpg",
        description: "Technische Artikel und Tutorials",
        content: {
            categories: ["Web Development", "Cloud Computing", "Best Practices"],
            featured: ["Next.js 13 Features", "AWS Lambda Guide"]
        }
    },
    {
        id: 'contact',
        title: "Kontakt",
        image: "/sections/images/contact.jpg",
        description: "Lass uns in Kontakt treten",
        content: {
            email: "your.email@example.com",
            social: ["GitHub", "LinkedIn"]
        }
    }
];

export default function Index() {
    return (
        <main className="h-screen bg-background overflow-hidden">
            <Header className="absolute top-0 left-0 right-0 z-50" />
            
            {/* Main Content */}
            <div className="h-screen flex">
                {sections.map((section) => (
                    <Link 
                        key={section.id} 
                        href={`/${section.id}`}
                        className="flex-1 h-full min-w-[250px] transition-all duration-300 hover:flex-[1.2]"
                    >
                        <ProjectCard
                            title={section.title}
                            image={section.image}
                            description={section.description}
                            className="h-full rounded-none"
                        />
                    </Link>
                ))}
            </div>
        </main>
    );
}
