import React, { useRef } from 'react';
import './Pointer.css';

const Pointer = ({ children }) => {
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const container = containerRef.current;

        if (!container) return;

        // Create sparkle
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Get container bounds
        const rect = container.getBoundingClientRect();

        // Position sparkle relative to container
        sparkle.style.left = `${e.clientX - rect.left}px`;
        sparkle.style.top = `${e.clientY - rect.top}px`;

        // Append sparkle to container
        container.appendChild(sparkle);

        // Remove sparkle after animation ends
        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    };

    return (
        <div ref={containerRef} className="sparkle-container" onMouseMove={handleMouseMove}>
            {children}
        </div>
    );
};

export default Pointer;