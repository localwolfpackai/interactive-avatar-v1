
import React from 'react';
import { motion } from 'framer-motion';

interface MeshGradientProps {
  colors: string[];
  className?: string;
}

const MeshGradient: React.FC<MeshGradientProps> = ({ colors, className }) => {
  // We create moving blobs to simulate the mesh shader effect
  // This is more performant and reliable than WebGL shaders in some constrained environments
  return (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
      {/* Base background */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{ backgroundColor: colors[4] }} // Deepest blue base
      />

      {/* Animated Blobs */}
      <motion.div
        className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full mix-blend-screen filter blur-[60px] opacity-70"
        style={{ backgroundColor: colors[2] }} // Medium blue
        animate={{
          x: [0, 50, -30, 0],
          y: [0, 30, -50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-[10%] right-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[50px] opacity-60"
        style={{ backgroundColor: colors[0] }} // Pink
        animate={{
          x: [0, -40, 20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="absolute bottom-[0%] left-[20%] w-[70%] h-[70%] rounded-full mix-blend-screen filter blur-[55px] opacity-60"
        style={{ backgroundColor: colors[1] }} // Sky blue
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -50, 20, 0],
          scale: [0.9, 1.1, 1, 0.9],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

       <motion.div
        className="absolute bottom-[10%] right-[20%] w-[50%] h-[50%] rounded-full mix-blend-overlay filter blur-[40px] opacity-80"
        style={{ backgroundColor: colors[3] }} // Dark blue-gray
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle White Highlight - Adds depth/sheen */}
      {colors[5] && (
        <motion.div
          className="absolute top-[30%] left-[40%] w-[40%] h-[40%] rounded-full mix-blend-overlay filter blur-[45px] opacity-10"
          style={{ backgroundColor: colors[5] }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
};

export default MeshGradient;
