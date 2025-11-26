import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AVATAR_COLORS, Coordinate } from '../types';
import MeshGradient from './MeshGradient';
import { useMousePosition } from '../hooks/useMousePosition';

const InteractiveAvatar: React.FC = () => {
  const mousePosition = useMousePosition();
  const [eyeOffset, setEyeOffset] = useState<Coordinate>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural Blink Logic
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        // Schedule next blink randomly between 2s and 6s
        timeoutId = setTimeout(triggerBlink, Math.random() * 4000 + 2000);
      }, 150); // Blink duration
    };

    // Initial start
    timeoutId = setTimeout(triggerBlink, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Calculate eye movement limited to a radius
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center
      const deltaX = (mousePosition.x - centerX);
      const deltaY = (mousePosition.y - centerY);

      // Dampening factor - how much the eyes move relative to mouse distance
      const dampener = 0.06;
      
      // Limit the movement to keep eyes inside the "sockets"
      const maxOffset = 12;

      const moveX = Math.max(-maxOffset, Math.min(maxOffset, deltaX * dampener));
      const moveY = Math.max(-maxOffset, Math.min(maxOffset, deltaY * dampener));

      setEyeOffset({ x: moveX, y: moveY });
    }
  }, [mousePosition]);

  // Animation States
  const eyesClosed = isBlinking || isHovered; // Hover acts as a "squint" or happy close
  
  // Pupil dimensions
  const eyeRy = eyesClosed ? 2 : 28;
  
  // Shine dimensions & position
  // When closed, shine moves to center Y (to align with the slit) and flattens
  const shineY = eyesClosed ? eyeOffset.y : eyeOffset.y - 8;
  const shineRy = eyesClosed ? 0 : 6; 
  const shineOpacity = eyesClosed ? 0 : 0.6;

  const eyeTransition = {
    cx: { type: "spring", stiffness: 150, damping: 15 },
    cy: { type: "spring", stiffness: 150, damping: 15 },
    ry: { type: "tween", duration: 0.15, ease: "easeInOut" }, // Snappy blink
    fillOpacity: { duration: 0.15 }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px]">
      <motion.div
        ref={containerRef}
        className="relative w-72 h-72 cursor-pointer"
        animate={{
          y: [0, -12, 0],
          rotate: isHovered ? [0, -2, 2, 0] : 0,
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 0.5,
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* SVG Container defining the Shape */}
        <svg
          viewBox="0 0 280 280"
          className="w-full h-full drop-shadow-2xl"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* The Rounded Square Clip Path - Adjusted "rx" for the shape */}
            <clipPath id="avatar-clip">
              <rect x="0" y="0" width="280" height="280" rx="60" ry="60" />
            </clipPath>
            
            {/* Filter for inner shadow/depth effect */}
            <filter id="inner-glow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
              <feOffset dx="0" dy="0" result="offsetblur" />
              <feFlood floodColor="rgba(255,255,255,0.3)" />
              <feComposite in2="offsetblur" operator="in" />
              <feComposite in2="SourceAlpha" operator="in" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode />
              </feMerge>
            </filter>
          </defs>

          {/* The Body with Mesh Gradient */}
          <foreignObject width="280" height="280" clipPath="url(#avatar-clip)">
            <div className="w-full h-full">
              <MeshGradient colors={AVATAR_COLORS} />
            </div>
          </foreignObject>
          
          {/* Glass/Gloss overlay for 3D feel */}
          <rect 
            x="0" 
            y="0" 
            width="280" 
            height="280" 
            rx="60" 
            ry="60"
            fill="url(#gloss-gradient)" 
            className="opacity-30 pointer-events-none mix-blend-soft-light"
          />
          <linearGradient id="gloss-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="white" stopOpacity="0.8" />
             <stop offset="50%" stopColor="white" stopOpacity="0" />
             <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </linearGradient>

          {/* Eye Group Left */}
          <g transform="translate(85, 110)">
            <motion.ellipse
              cx={0}
              cy={0}
              rx={18}
              fill="#1A1A2E"
              animate={{
                cx: eyeOffset.x,
                cy: eyeOffset.y,
                ry: eyeRy,
              }}
              transition={eyeTransition}
            />
            {/* Eye Shine */}
            <motion.ellipse
                cx={-6}
                rx={4}
                fill="white"
                animate={{
                    cx: eyeOffset.x - 6,
                    cy: shineY,
                    ry: shineRy,
                    fillOpacity: shineOpacity
                }}
                transition={eyeTransition}
            />
          </g>

          {/* Eye Group Right */}
          <g transform="translate(195, 110)">
            <motion.ellipse
              cx={0}
              cy={0}
              rx={18}
              fill="#1A1A2E"
              animate={{
                cx: eyeOffset.x,
                cy: eyeOffset.y,
                ry: eyeRy,
              }}
              transition={eyeTransition}
            />
             {/* Eye Shine */}
             <motion.ellipse
                cx={-6}
                rx={4}
                fill="white"
                animate={{
                    cx: eyeOffset.x - 6,
                    cy: shineY,
                    ry: shineRy,
                    fillOpacity: shineOpacity
                }}
                transition={eyeTransition}
            />
          </g>
        </svg>
      </motion.div>
      
      {/* Shadow */}
      <motion.div
        className="w-40 h-4 bg-black rounded-[100%] filter blur-xl opacity-40 mt-12"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.4, 0.2, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default InteractiveAvatar;