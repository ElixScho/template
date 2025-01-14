import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

interface Symbol {
    id: number;
    char: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

const symbols = [
    // Keyboard Symbols
    '⌘', '⌥', '⇧', '⌃', '↵', '⌫', '⇪', 
    // Arrows
    '↑', '→', '↓', '←', '⇄', '↔', '⇋',
    // Programming Symbols
    '{', '}', '[', ']', '(', ')', '<', '>',
    '&&', '||', '=>', '!=', '==', '===',
    // Math Symbols
    '∑', '∞', '≠', '≈', '±', '÷', '×',
    // Special Characters
    '⚡', '✨', '💻', '🚀', '⚙️', '🔧',
    // Code Snippets
    'if', 'for', 'var', 'let', 'const',
    // Terminal
    '$', '>', '|', '/', '_', '#', '@'
];

export const LogoSymbols = () => {
    const [activeSymbols, setActiveSymbols] = useState<Symbol[]>([]);

    const createSymbol = useCallback(() => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const distance = 150;

        return {
            id: Date.now() + Math.random(),
            char: symbols[Math.floor(Math.random() * symbols.length)],
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotation: Math.random() * 360,
            scale: 1 + Math.random() * 0.5,
        };
    }, []);

    const triggerSymbols = useCallback(() => {
        // Increased number of symbols
        const newSymbols = Array(12).fill(null).map(createSymbol);
        setActiveSymbols(prev => [...prev, ...newSymbols]);

        setTimeout(() => {
            setActiveSymbols(prev => 
                prev.filter(symbol => 
                    symbol.id !== newSymbols[0].id
                )
            );
        }, 1500);
    }, [createSymbol]);

    useEffect(() => {
        (window as any).triggerLogoSymbols = triggerSymbols;
        return () => {
            delete (window as any).triggerLogoSymbols;
        };
    }, [triggerSymbols]);

    return (
        <div className="absolute inset-0 pointer-events-none">
            <AnimatePresence>
                {activeSymbols.map((symbol) => (
                    <motion.div
                        key={symbol.id}
                        initial={{ 
                            x: 0, 
                            y: 0, 
                            scale: 0,
                            rotate: 0,
                            opacity: 0 
                        }}
                        animate={{ 
                            x: symbol.x,
                            y: symbol.y,
                            scale: symbol.scale,
                            rotate: symbol.rotation,
                            opacity: [0, 1, 1, 0]
                        }}
                        exit={{ 
                            scale: 0,
                            opacity: 0 
                        }}
                        transition={{ 
                            duration: 1.5,
                            ease: "easeOut"
                        }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-mono"
                    >
                        {symbol.char}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
