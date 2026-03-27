import React, { useRef } from 'react';
import InteractiveAvatar from '../components/InteractiveAvatar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Video, Image as ImageIcon, Sparkles, Layers } from 'lucide-react';

const FlowScrollytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animations based on scroll
  const avatarScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 1]);
  const avatarY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 50, 50, 0]);

  const step1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 1, 0]);
  const step1Y = useTransform(scrollYProgress, [0, 0.1, 0.3], [50, 0, -50]);

  const step2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6], [0, 1, 0]);
  const step2Y = useTransform(scrollYProgress, [0.3, 0.4, 0.6], [50, 0, -50]);

  const step3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.9], [0, 1, 0]);
  const step3Y = useTransform(scrollYProgress, [0.6, 0.7, 0.9], [50, 0, -50]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      {/* Sticky Container for Avatar */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Background Gradients */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]) }}
        >
          <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-purple-900/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[20%] w-[40vw] h-[40vw] bg-indigo-900/20 rounded-full blur-[120px]" />
        </motion.div>

        {/* Central Avatar */}
        <motion.div
          className="relative z-10 w-full max-w-sm"
          style={{
            scale: avatarScale,
            y: avatarY
          }}
        >
          <div className="transform scale-[0.6] sm:scale-75 md:scale-100">
            <InteractiveAvatar />
          </div>
        </motion.div>

        {/* Overlay Content / Steps */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center max-w-5xl mx-auto px-6">

          {/* Step 1: Input */}
          <motion.div
            className="absolute left-0 right-0 max-w-lg mx-auto md:ml-0 text-center md:text-left"
            style={{ opacity: step1Opacity, y: step1Y }}
          >
            <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <ImageIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-3xl font-editorial text-white mb-4">1. Start with an Image</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Google's Flow begins by analyzing a static image. It understands depth, lighting, and semantic structure to prepare for motion.
              </p>
              <div className="mt-6 p-4 bg-black/50 rounded-xl border border-white/5 flex items-center justify-center border-dashed">
                <span className="text-xs text-slate-500 uppercase tracking-widest">Upload Keyframe</span>
              </div>
            </div>
          </motion.div>

          {/* Step 2: Generation */}
          <motion.div
            className="absolute left-0 right-0 max-w-lg mx-auto md:mr-0 md:ml-auto text-center md:text-left"
            style={{ opacity: step2Opacity, y: step2Y }}
          >
             <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-3xl font-editorial text-white mb-4">2. Define the Motion</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Using natural language prompts, guide the AI on how the elements should move. Pan the camera, add wind, or change the lighting dynamically.
              </p>
              <div className="mt-6 p-4 bg-black/50 rounded-xl border border-white/5">
                <p className="text-sm font-mono text-purple-300">"Slow pan left while the trees sway gently in the breeze."</p>
              </div>
            </div>
          </motion.div>

          {/* Step 3: Output */}
          <motion.div
            className="absolute left-0 right-0 max-w-lg mx-auto md:ml-0 text-center md:text-left"
            style={{ opacity: step3Opacity, y: step3Y }}
          >
             <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Video className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-3xl font-editorial text-white mb-4">3. Cinematic Video</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Flow synthesizes the image and text prompt into a high-fidelity video sequence, maintaining temporal consistency and realistic physics.
              </p>
              <div className="mt-6 flex space-x-2">
                 <div className="h-2 flex-1 bg-green-500/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    />
                 </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 0, 0, 1]) }}
        >
          <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default FlowScrollytelling;