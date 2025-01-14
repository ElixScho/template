'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Github } from 'lucide-react';
import { LogoSymbols } from './LogoSymbols';

interface HeaderProps {
    className?: string;
}

const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/yourusername' },
    { icon: Instagram, href: 'https://instagram.com/yourusername' },
    { icon: Github, href: 'https://github.com/yourusername' }
];

const Header = ({ className }: HeaderProps) => {
    const handleLogoClick = () => {
        // Trigger the symbol animation through the window object
        if (typeof window !== 'undefined' && (window as any).triggerLogoSymbols) {
            (window as any).triggerLogoSymbols();
        }
    };

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 py-2",
            className
        )}>
            <div className="container mx-auto">
                <div className="flex items-center justify-between h-12">
                    {/* Logo */}
                    <div className="relative">
                        <Link href="/" onClick={handleLogoClick}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "relative h-10 rounded-md overflow-hidden",
                                    "bg-black/40 backdrop-blur-sm",
                                    "transition-all duration-200",
                                    "hover:bg-black/60"
                                )}
                            >
                                <Image
                                    src="/images/logo.jpg"
                                    alt="FS Logo"
                                    width={120}
                                    height={40}
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>
                        </Link>
                        <LogoSymbols />
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center space-x-4">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "p-2 rounded-md",
                                    "bg-black/40 backdrop-blur-sm",
                                    "text-white/90 hover:text-white",
                                    "transition-all duration-200",
                                    "hover:bg-black/60"
                                )}
                                whileHover={{ y: -1 }}
                                whileTap={{ y: 1 }}
                            >
                                <social.icon className="w-4 h-4" />
                            </motion.a>
                        ))}
                        <Link 
                            href="/connect"
                            className={cn(
                                "px-3 py-1.5 rounded-md",
                                "bg-black/40 backdrop-blur-sm",
                                "text-sm text-white/90 hover:text-white",
                                "tracking-widest font-light",
                                "transition-all duration-200",
                                "hover:bg-black/60"
                            )}
                        >
                            CONNECT
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
