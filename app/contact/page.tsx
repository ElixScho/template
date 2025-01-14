'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const contactInfo = {
    email: "your.email@example.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername"
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl font-bold mb-8">Kontakt</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <h2 className="text-2xl font-semibold mb-6">
                                Lass uns in Kontakt treten
                            </h2>
                            
                            <p className="text-lg text-muted-foreground">
                                Ich freue mich über Nachrichten zu spannenden Projekten, 
                                Kollaborationen oder einfach zum fachlichen Austausch.
                            </p>

                            <div className="space-y-4">
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-center space-x-3 text-lg hover:text-primary transition-colors"
                                >
                                    <Mail className="w-6 h-6" />
                                    <span>{contactInfo.email}</span>
                                </a>
                                
                                <a
                                    href={contactInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 text-lg hover:text-primary transition-colors"
                                >
                                    <Linkedin className="w-6 h-6" />
                                    <span>LinkedIn</span>
                                </a>
                                
                                <a
                                    href={contactInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 text-lg hover:text-primary transition-colors"
                                >
                                    <Github className="w-6 h-6" />
                                    <span>GitHub</span>
                                </a>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                // Add form submission logic here
                            }}
                        >
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 rounded-md border bg-background"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded-md border bg-background"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Nachricht
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-4 py-2 rounded-md border bg-background"
                                    required
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Nachricht senden
                            </button>
                        </motion.form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
