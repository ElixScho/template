import React from 'react';
import { Card } from './Card';

const experiences = [
    {
        title: 'Software Engineer',
        company: 'Current Company',
        date: '2023 - Present',
        description: 'Full-stack development with focus on modern web technologies. Building scalable applications using React, Next.js, and Node.js.',
    },
    {
        title: 'Frontend Developer',
        company: 'Previous Company',
        date: '2022 - 2023',
        description: 'Developed responsive web applications using React and TypeScript. Implemented modern UI/UX designs and improved performance metrics.',
    },
    // Add more experiences as needed
];

const Experience = () => {
    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold mb-2">EXPERIENCE</h2>
                        <p className="text-muted-foreground mb-8">
                            My professional journey and projects
                        </p>
                    </div>
                    
                    {experiences.map((exp, index) => (
                        <Card
                            key={index}
                            title={exp.title}
                            subtitle={exp.company}
                            date={exp.date}
                            description={exp.description}
                            className="h-full"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
