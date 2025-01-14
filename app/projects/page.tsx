'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
    {
        title: "Portfolio CMS",
        description: "Ein modernes Content Management System für Portfolios, entwickelt mit Next.js und Supabase.",
        image: "/images/portfolio.jpg",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
        github: "https://github.com/yourusername/portfolio-cms",
        demo: "https://demo.yoursite.com",
        challenges: [
            "Implementierung von Real-time Updates für Live-Vorschau",
            "Optimierte Bildverarbeitung und Caching",
            "Responsive Design für alle Geräte"
        ]
    },
    // Add more projects here
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto"
                >
                    <h1 className="text-4xl font-bold mb-8">Meine Projekte</h1>
                    
                    <div className="space-y-16">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card rounded-lg overflow-hidden shadow-lg"
                            >
                                {/* Project Header */}
                                <div className="relative h-[400px]">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Project Content */}
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold mb-4">
                                        {project.title}
                                    </h2>
                                    <p className="text-lg text-muted-foreground mb-6">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3">
                                            Technologien
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Challenges */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3">
                                            Herausforderungen & Lösungen
                                        </h3>
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                            {project.challenges.map((challenge) => (
                                                <li key={challenge}>{challenge}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4">
                                        <Link
                                            href={project.github}
                                            target="_blank"
                                            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                                        >
                                            GitHub
                                        </Link>
                                        <Link
                                            href={project.demo}
                                            target="_blank"
                                            className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
                                        >
                                            Live Demo
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
