import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import Home from './pages/Home';
import AIGuides from './pages/AIGuides';
import FlowScrollytelling from './pages/FlowScrollytelling';
import InteractiveDesign from './pages/InteractiveDesign';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-slate-100 selection:bg-white/20 font-sans">
        {/* Background Decor */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -right-[20%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-[20%] -left-[20%] w-[50vw] h-[50vw] bg-pink-900/10 rounded-full blur-3xl opacity-50" />
        </div>

        <main className="relative z-10 container mx-auto px-6 py-8 flex flex-col min-h-screen">
          {/* Header */}
          <header className="flex justify-between items-center py-8">
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
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
            </Link>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-slate-400">
              <Link to="/ai-guides" className="hover:text-white transition-colors duration-300">AI Guides</Link>
              <Link to="/flow-scrollytelling" className="hover:text-white transition-colors duration-300">Flow Stories</Link>
              <Link to="/interactive-design" className="hover:text-white transition-colors duration-300">Playground</Link>
              <a href="#" className="flex items-center hover:text-white transition-colors duration-300 ml-4 border-l border-white/10 pl-4">
                <Github className="w-4 h-4 mr-2" />
                Source
              </a>
            </nav>
          </header>

          {/* Content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-guides" element={<AIGuides />} />
            <Route path="/flow-scrollytelling" element={<FlowScrollytelling />} />
            <Route path="/interactive-design" element={<InteractiveDesign />} />
          </Routes>

          <footer className="py-8 text-center text-slate-700 text-xs tracking-widest uppercase mt-auto">
            <p>© {new Date().getFullYear()} Lupo Studios. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </Router>
  );
};

export default App;