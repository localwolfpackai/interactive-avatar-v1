import React, { useRef, useState } from 'react';
import InteractiveAvatar from '../components/InteractiveAvatar';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Maximize2, Move, Droplets, Layers, Sparkles } from 'lucide-react';

// Draggable Magnetic Button Component
const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const resetPosition = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetPosition}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-wide text-white transition-colors duration-300 rounded-full group ${className}`}
    >
      <span className="relative z-10 flex items-center space-x-2">
        {children}
      </span>
      {/* Glow Effect */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-300 rounded-full blur-xl opacity-0 group-hover:opacity-50 ${className?.includes('bg-blue-600') ? 'bg-blue-500' : 'bg-white/20'}`} />
    </motion.button>
  );
};

// Draggable Shape Component
const DraggableShape = ({ color, size, Icon, initialX, initialY }: any) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileHover={{ scale: 1.1, cursor: "grab" }}
      whileDrag={{ scale: 1.2, cursor: "grabbing" }}
      initial={{ x: initialX, y: initialY }}
      className={`absolute flex items-center justify-center rounded-3xl shadow-2xl backdrop-blur-md border border-white/10 ${color} ${size}`}
    >
      <Icon className="w-8 h-8 text-white/50" />
    </motion.div>
  );
};

const InteractiveDesign: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a mesh gradient background that reacts to mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    // Map client coordinates to a percentage (0 to 100)
    mouseX.set((clientX / window.innerWidth) * 100);
    mouseY.set((clientY / window.innerHeight) * 100);
  };

  // Create smooth gradients from mouse position
  const bgX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const bgY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const backgroundStyle = useTransform(
    [bgX, bgY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(29, 78, 216, 0.15) 0%, rgba(0,0,0,1) 40%)`
  );

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex-1 flex flex-col items-center justify-center min-h-[80vh] w-full overflow-hidden rounded-[40px] border border-white/5 my-8"
      style={{ background: backgroundStyle as any }}
    >

      {/* Background Decor Shapes (Draggable) */}
      <DraggableShape
        color="bg-pink-500/10 hover:bg-pink-500/20"
        size="w-32 h-32 rotate-12"
        Icon={Layers}
        initialX={-250}
        initialY={-100}
      />
      <DraggableShape
        color="bg-purple-500/10 hover:bg-purple-500/20"
        size="w-40 h-40 -rotate-12 rounded-full"
        Icon={Droplets}
        initialX={250}
        initialY={150}
      />
      <DraggableShape
        color="bg-blue-500/10 hover:bg-blue-500/20"
        size="w-24 h-24 rotate-45 rounded-xl"
        Icon={Move}
        initialX={-200}
        initialY={180}
      />

      <div className="z-10 flex flex-col items-center space-y-12 w-full max-w-4xl px-6 pointer-events-none">

        {/* Header Text */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/5 text-slate-300 px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 tracking-widest uppercase mb-4 backdrop-blur-sm">
             <Maximize2 className="w-3 h-3" />
             <span>Interactive Playground</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-editorial font-medium tracking-tight text-white leading-tight">
            Design that <span className="italic text-blue-400">Responds</span>
          </h2>
          <p className="text-slate-400 text-lg font-light max-w-lg mx-auto">
            Drag the shapes, hover the buttons, move your cursor. The avatar watches everything you do.
          </p>
        </div>

        {/* Central Avatar */}
        <div className="relative pointer-events-auto">
          {/* subtle glow behind avatar */}
          <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
          <InteractiveAvatar />
        </div>

        {/* Magnetic Buttons (Interactive elements for the eyes to track) */}
        <div className="flex flex-wrap justify-center gap-6 pt-8 pointer-events-auto">
          <MagneticButton className="bg-white/5 border border-white/10 hover:bg-white/10">
            <span>Drag Shapes</span>
          </MagneticButton>

          <MagneticButton className="bg-blue-600 border border-blue-500/50 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.3)]">
            <span>Play with Physics</span>
            <Sparkles className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton className="bg-white/5 border border-white/10 hover:bg-white/10">
            <span>Move Cursor</span>
          </MagneticButton>
        </div>

      </div>

      {/* Instructional Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-slate-500 text-sm font-mono tracking-wider flex items-center space-x-2"
      >
        <span>↑ Grab & throw the background shapes around</span>
      </motion.div>

    </motion.div>
  );
};

export default InteractiveDesign;