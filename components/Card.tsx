import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    title?: string;
    subtitle?: string;
    date?: string;
    description?: string;
    className?: string;
    children?: React.ReactNode;
    isLocked?: boolean;
}

export const Card = ({
    title,
    subtitle,
    date,
    description,
    className,
    children,
    isLocked = false,
}: CardProps) => {
    return (
        <div 
            className={cn(
                "group relative rounded-lg bg-background/50 p-6 shadow-lg backdrop-blur-sm",
                "border border-border/50 hover:border-border/80 transition-all duration-300",
                "hover:shadow-xl hover:-translate-y-1",
                className
            )}
        >
            {isLocked && (
                <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-secondary/80 rounded-full">
                    LOCKED
                </div>
            )}
            
            <div className="space-y-4">
                {(title || subtitle || date) && (
                    <div className="space-y-2">
                        {title && (
                            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                        )}
                        <div className="flex justify-between items-center text-muted-foreground">
                            {subtitle && <div className="text-sm">{subtitle}</div>}
                            {date && <div className="text-sm">{date}</div>}
                        </div>
                    </div>
                )}
                
                {description && (
                    <p className="text-muted-foreground">{description}</p>
                )}
                
                {children}
            </div>
        </div>
    );
};
