'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import styles from './BackgroundMorph.module.css';

export const BackgroundMorph = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const totalImages = 100;

    // Memoize the image paths array
    const images = useMemo(() => 
        Array.from({ length: totalImages }, (_, i) => `/images/bg-${i}.webp`),
        [totalImages]
    );

    // Preload images and track loading progress
    useEffect(() => {
        let loadedCount = 0;
        const imageElements: HTMLImageElement[] = [];

        const handleImageLoad = () => {
            loadedCount++;
            setLoadedImages(loadedCount);
            if (loadedCount === totalImages) {
                setIsLoading(false);
            }
        };

        images.forEach((src) => {
            const img = new Image();
            img.onload = handleImageLoad;
            img.src = src;
            imageElements.push(img);
        });

        return () => {
            imageElements.forEach(img => {
                img.onload = null;
            });
        };
    }, [images, totalImages]);

    // Handle mouse movement with smooth interpolation
    useEffect(() => {
        let animationFrame: number;
        let currentX = 0;
        let currentY = 0;
        const interpolationFactor = 0.08; // Adjust for smoother/faster movement

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const updatePosition = () => {
                // Smooth interpolation
                currentX += (x - currentX) * interpolationFactor;
                currentY += (y - currentY) * interpolationFactor;

                setMousePosition({ x: currentX, y: currentY });

                // Calculate image index with smooth transition
                const newIndex = Math.min(
                    Math.floor(currentX * totalImages),
                    totalImages - 1
                );
                
                setCurrentIndex(newIndex);

                animationFrame = requestAnimationFrame(updatePosition);
            };

            animationFrame = requestAnimationFrame(updatePosition);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, [totalImages]);

    // Calculate loading progress
    const loadingProgress = Math.floor((loadedImages / totalImages) * 100);

    // Get the indices of images to display (current and neighbors)
    const visibleIndices = useMemo(() => {
        const indices = [currentIndex];
        if (currentIndex > 0) indices.push(currentIndex - 1);
        if (currentIndex < totalImages - 1) indices.push(currentIndex + 1);
        return indices;
    }, [currentIndex, totalImages]);

    return (
        <div 
            ref={containerRef} 
            className={styles.backgroundContainer}
            style={{
                '--mouse-x': mousePosition.x,
                '--mouse-y': mousePosition.y
            } as any}
        >
            {/* Loading overlay */}
            {isLoading && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.loadingProgress}>
                        <div className={styles.loadingBar} style={{ width: `${loadingProgress}%` }} />
                        <div className={styles.loadingText}>
                            Loading experience... {loadingProgress}%
                        </div>
                    </div>
                </div>
            )}
            
            {/* Background images */}
            <div className={styles.imageContainer}>
                {!isLoading && visibleIndices.map((index) => (
                    <div
                        key={index}
                        className={`${styles.imageLayer} ${index === currentIndex ? styles.active : ''}`}
                        style={{
                            backgroundImage: `url(${images[index]})`,
                            opacity: index === currentIndex ? 1 : 
                                    index === currentIndex - 1 ? 1 - (mousePosition.x % 1) :
                                    index === currentIndex + 1 ? mousePosition.x % 1 : 0,
                            transform: `translate3d(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px, 0) scale(1.1)`,
                            filter: `brightness(${0.8 + mousePosition.y * 0.4})`,
                        }}
                    />
                ))}
            </div>

            {/* Overlay effects */}
            <div 
                className={styles.overlayEffect}
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, transparent 0%, rgba(0,0,0,0.2) 100%)`
                }}
            />
        </div>
    );
};
