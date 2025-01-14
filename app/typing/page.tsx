'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!",
    "The five boxing wizards jump quickly.",
    "Sphinx of black quartz, judge my vow."
];

export default function TypingPage() {
    const [text, setText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isFinished, setIsFinished] = useState(false);

    // Initialize with random text
    useEffect(() => {
        setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    }, []);

    // Calculate WPM and accuracy
    const calculateStats = useCallback(() => {
        if (!startTime) return;

        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        const wordsTyped = userInput.trim().split(' ').length;
        const currentWpm = Math.round(wordsTyped / timeElapsed);

        // Calculate accuracy
        let correct = 0;
        const userInputChars = userInput.split('');
        const textChars = text.slice(0, userInput.length).split('');
        
        textChars.forEach((char, index) => {
            if (char === userInputChars[index]) correct++;
        });

        const currentAccuracy = Math.round((correct / textChars.length) * 100);

        setWpm(currentWpm);
        setAccuracy(currentAccuracy);
    }, [startTime, userInput, text]);

    // Handle user input
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!startTime) setStartTime(Date.now());
        
        setUserInput(value);
        calculateStats();

        // Check if completed
        if (value === text) {
            setIsFinished(true);
            calculateStats();
        }
    };

    // Reset the test
    const resetTest = () => {
        setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
        setUserInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setIsFinished(false);
    };

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl font-bold mb-8">Typing Practice</h1>

                    {/* Stats Display */}
                    <div className="flex space-x-8 mb-8">
                        <div className="bg-card p-4 rounded-lg">
                            <div className="text-sm text-muted-foreground">WPM</div>
                            <div className="text-2xl font-bold">{wpm}</div>
                        </div>
                        <div className="bg-card p-4 rounded-lg">
                            <div className="text-sm text-muted-foreground">Accuracy</div>
                            <div className="text-2xl font-bold">{accuracy}%</div>
                        </div>
                    </div>

                    {/* Text Display */}
                    <div className="bg-card p-6 rounded-lg mb-6">
                        <p className="text-lg leading-relaxed font-mono">
                            {text.split('').map((char, index) => {
                                let color = 'text-muted-foreground';
                                if (index < userInput.length) {
                                    color = userInput[index] === char 
                                        ? 'text-green-500' 
                                        : 'text-red-500';
                                }
                                return (
                                    <span key={index} className={color}>
                                        {char}
                                    </span>
                                );
                            })}
                        </p>
                    </div>

                    {/* Input Field */}
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleInput}
                            disabled={isFinished}
                            className="w-full p-4 rounded-lg bg-card border border-border 
                                     focus:outline-none focus:ring-2 focus:ring-primary
                                     font-mono text-lg"
                            placeholder="Start typing..."
                        />
                        
                        <button
                            onClick={resetTest}
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg
                                     hover:bg-primary/90 transition-colors"
                        >
                            {isFinished ? 'Try Again' : 'Reset'}
                        </button>
                    </div>

                    {/* Results Modal */}
                    {isFinished && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
                        >
                            <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
                                <h2 className="text-2xl font-bold mb-4">Great job!</h2>
                                <div className="space-y-4 mb-6">
                                    <p className="text-lg">
                                        Words per minute: <span className="font-bold">{wpm}</span>
                                    </p>
                                    <p className="text-lg">
                                        Accuracy: <span className="font-bold">{accuracy}%</span>
                                    </p>
                                </div>
                                <button
                                    onClick={resetTest}
                                    className="w-full px-6 py-3 bg-primary text-primary-foreground 
                                             rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
