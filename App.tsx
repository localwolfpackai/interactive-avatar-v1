import React from 'react';
import InteractiveAvatar from './components/InteractiveAvatar';
import { Sparkles, Info, Github, Box } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-slate-100 selection:bg-white/20">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[20%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-[20%] -left-[20%] w-[50vw] h-[50vw] bg-pink-900/10 rounded-full blur-3xl opacity-50" />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-8 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center py-8">
          <div className="flex items-center space-x-3 group cursor-pointer">
            {/* 4 Rounded Squares Logo */}
            <div className="grid grid-cols-2 gap-1 w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity">
               <div className="bg-white rounded-md w-full h-full"></div>
               <div className="bg-white/70 rounded-md w-full h-full"></div>
               <div className="bg-white/70 rounded-md w-full h-full"></div>
               <div className="bg-white rounded-md w-full h-full"></div>
            </div>
            <h1 className="text-2xl font-editorial font-semibold tracking-wide text-white pl-2">
              Lupo Studios
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-slate-400">
            <a href="#" className="hover:text-white transition-colors duration-300">Work</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Studio</a>
            <a href="#" className="flex items-center hover:text-white transition-colors duration-300">
              <Github className="w-4 h-4 mr-2" />
              Source
            </a>
          </nav>
        </header>

        {/* Content */}
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

        <footer className="py-8 text-center text-slate-700 text-xs tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Lupo Studios. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;