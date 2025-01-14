'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const posts = [
    {
        title: "Building Scalable Next.js Applications",
        excerpt: "Eine detaillierte Anleitung zur Entwicklung skalierbarer Webanwendungen mit Next.js und React.",
        date: "2024-01-15",
        readTime: "10 min",
        tags: ["Next.js", "React", "Performance", "Architecture"]
    },
    {
        title: "Clean Code Practices in TypeScript",
        excerpt: "Best Practices und Patterns für sauberen, wartbaren TypeScript-Code.",
        date: "2024-01-10",
        readTime: "8 min",
        tags: ["TypeScript", "Clean Code", "Best Practices"]
    },
    {
        title: "Docker für Entwickler",
        excerpt: "Ein praktischer Leitfaden zur Verwendung von Docker in der Webentwicklung.",
        date: "2024-01-05",
        readTime: "12 min",
        tags: ["Docker", "DevOps", "Development"]
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl font-bold mb-8">Blog</h1>
                    
                    <div className="space-y-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
                            >
                                <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <time>{post.date}</time>
                                            <span>{post.readTime} Lesezeit</span>
                                        </div>
                                        
                                        <h2 className="text-2xl font-bold hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        
                                        <p className="text-muted-foreground">
                                            {post.excerpt}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
