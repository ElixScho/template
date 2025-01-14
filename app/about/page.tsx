'use client';

import { motion } from 'framer-motion';

const skills = {
    Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express', 'Python', 'FastAPI'],
    Database: ['PostgreSQL', 'MongoDB', 'Redis'],
    DevOps: ['Docker', 'AWS', 'CI/CD', 'Git'],
    Tools: ['VS Code', 'Figma', 'Postman']
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl font-bold mb-8">Über Mich</h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground mb-12"
                    >
                        Als Full Stack Developer liegt meine Leidenschaft in der Entwicklung 
                        moderner Webanwendungen. Mit einem starken Fokus auf Clean Code und 
                        Best Practices strebe ich danach, skalierbare und wartbare Lösungen 
                        zu schaffen.
                    </motion.p>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {Object.entries(skills).map(([category, skillList]) => (
                            <motion.div
                                key={category}
                                variants={item}
                                className="space-y-4"
                            >
                                <h2 className="text-2xl font-semibold">{category}</h2>
                                <ul className="space-y-2">
                                    {skillList.map((skill) => (
                                        <motion.li
                                            key={skill}
                                            variants={item}
                                            className="flex items-center space-x-2"
                                        >
                                            <span className="w-2 h-2 bg-primary rounded-full" />
                                            <span>{skill}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 p-6 bg-card rounded-lg"
                    >
                        <h2 className="text-2xl font-semibold mb-4">Ziele</h2>
                        <p className="text-muted-foreground">
                            Mein Fokus liegt auf der Entwicklung von Cloud-nativen Architekturen 
                            und der kontinuierlichen Verbesserung meiner Full-Stack-Entwicklungsfähigkeiten. 
                            Ich strebe danach, innovative Lösungen zu schaffen, die nicht nur technisch 
                            exzellent sind, sondern auch einen echten Mehrwert für Benutzer bieten.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
