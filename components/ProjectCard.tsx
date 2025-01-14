'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    title: string;
    image: string;
    description: string;
    className?: string;
}

export const ProjectCard = ({
    title,
    image,
    description,
    className,
}: ProjectCardProps) => {
    return (
        <div 
            className={cn(
                "relative w-full h-full overflow-hidden",
                "group transition-all duration-500",
                className
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="20vw"
                    priority
                    className="object-cover transition-all duration-700 
                             group-hover:scale-110 group-hover:brightness-75"
                />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 
                          opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2 
                             transform transition-all duration-500 translate-y-4 
                             group-hover:translate-y-0">
                    {title}
                </h3>
                <p className="text-white/90 transform transition-all duration-500 
                            translate-y-8 opacity-0 group-hover:translate-y-0 
                            group-hover:opacity-100">
                    {description}
                </p>
            </div>
        </div>
    );
};
