import React, { useState } from 'react';
import InteractiveAvatar from '../components/InteractiveAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Code2, Play, CheckCircle2, Copy } from 'lucide-react';

const steps = [
  {
    title: "1. Describe your idea",
    prompt: "I want a button that glows when I hover over it and makes a soft clicking sound.",
    aiResponse: "I can help with that! We'll use HTML for the structure, CSS for the glowing effect, and a tiny bit of JavaScript for the sound.",
    code: null
  },
  {
    title: "2. Let AI generate the code",
    prompt: "Generate the code for the glowing button.",
    aiResponse: "Here's the code. I've added comments so you can see exactly what each part does.",
    code: `<button class="glow-btn">
  Click Me
</button>

<style>
.glow-btn {
  padding: 12px 24px;
  background: #1a1a2e;
  color: white;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}
.glow-btn:hover {
  box-shadow: 0 0 20px rgba(100, 200, 255, 0.5);
  transform: translateY(-2px);
}
</style>`
  },
  {
    title: "3. Copy, paste, and run!",
    prompt: "Where do I put this code?",
    aiResponse: "You can paste this directly into any HTML file or website builder that supports custom code snippets, like WordPress or Webflow. Let's see it in action!",
    code: null,
    preview: true
  }
];

const AIGuides: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 py-12 max-w-6xl mx-auto w-full">
      {/* Left side - Avatar & Guide Context */}
      <div className="flex-1 space-y-8 w-full">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20">
            <Sparkles className="w-4 h-4" />
            <span>AI for Everyone</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-editorial font-medium tracking-tight text-white leading-tight">
            Code your ideas, <br />
            <span className="italic text-slate-400">no experience needed.</span>
          </h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            Think of AI as your personal, endlessly patient developer. You describe what you want in plain English, and it writes the code for you.
          </p>
        </div>

        {/* Interactive Avatar acting as AI Assistant */}
        <div className="relative bg-slate-900/50 rounded-3xl p-6 border border-white/5 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="transform scale-75 -my-16">
              <InteractiveAvatar />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-sm text-slate-200 shadow-xl max-w-sm w-full"
              >
                <p className="font-light italic text-center">"{steps[currentStep].aiResponse}"</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right side - Interactive Terminal/Editor */}
      <div className="flex-1 w-full max-w-lg">
        <div className="bg-[#0D0D12] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[600px]">
          {/* Editor Header */}
          <div className="flex items-center px-4 py-3 bg-[#1A1A24] border-b border-white/5">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto flex items-center text-slate-400 text-xs font-mono space-x-2">
              <Terminal className="w-3 h-3" />
              <span>ai-assistant.sh</span>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 p-6 flex flex-col space-y-6 overflow-y-auto">
             <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Step Title */}
                  <div className="flex items-center space-x-2 text-white font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <h3>{steps[currentStep].title}</h3>
                  </div>

                  {/* User Input Bubble */}
                  <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl rounded-tr-sm p-4 text-blue-100 text-sm self-end ml-12">
                     {steps[currentStep].prompt}
                  </div>

                  {/* Code Snippet (if any) */}
                  {steps[currentStep].code && (
                    <div className="bg-black/50 rounded-xl border border-white/10 overflow-hidden group/code">
                      <div className="flex justify-between items-center px-3 py-2 bg-white/5 border-b border-white/10">
                        <span className="text-xs font-mono text-slate-400">index.html</span>
                        <button className="text-slate-500 hover:text-white transition-colors">
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto">
                        <code>{steps[currentStep].code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Preview (if any) */}
                  {steps[currentStep].preview && (
                    <div className="mt-8 p-8 border border-white/10 rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-black flex items-center justify-center">
                       <button className="px-6 py-3 bg-[#1a1a2e] text-white border border-white/10 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(100,200,255,0.5)] hover:-translate-y-0.5 font-medium tracking-wide">
                          Hover Me!
                       </button>
                    </div>
                  )}
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="p-4 bg-[#1A1A24] border-t border-white/5 flex justify-between items-center">
            <div className="flex space-x-2">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === currentStep ? 'bg-blue-500' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
              className="flex items-center space-x-2 text-sm text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              <span>{currentStep === steps.length - 1 ? 'Start Over' : 'Next Step'}</span>
              <Play className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGuides;