import React from 'react';
import InteractiveAvatar from '../components/InteractiveAvatar';
import { Sparkles, Info, Github, Box } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-16 py-12">
      <div className="text-center space-y-6 max-w-3xl">
        <h2 className="text-5xl md:text-7xl font-editorial font-medium tracking-tight text-white leading-[1.1]">
          The Art of <br/>
          <span className="italic text-slate-200">Digital Presence</span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto">
          Exploring the intersection of organic motion and structured design.
        </p>
      </div>

      <div className="w-full max-w-lg flex justify-center py-4">
        <InteractiveAvatar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-sm text-slate-400 pt-12 border-t border-white/5">
         <div className="space-y-3">
            <h3 className="text-white font-editorial text-lg">Fluid Mesh</h3>
            <p className="leading-relaxed font-light">Simulated mesh gradients using pure CSS and Framer Motion for high performance without WebGL overhead.</p>
         </div>
         <div className="space-y-3">
            <h3 className="text-white font-editorial text-lg">Interactive Eyes</h3>
            <p className="leading-relaxed font-light">Calculated vector physics allow the eyes to track your cursor organically within defined constraints.</p>
         </div>
         <div className="space-y-3">
            <h3 className="text-white font-editorial text-lg">Structured Form</h3>
            <p className="leading-relaxed font-light">Custom SVG clip-paths create the signature squircle aesthetic, balancing softness with precision.</p>
         </div>
      </div>
    </div>
  );
};

export default Home;