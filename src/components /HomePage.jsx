import React, { useState, useEffect } from "react";
import {
  Play,
  Code,
  Search,
  BarChart3,
  Eye,
  BookOpen,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 0, 0.1) 0%, transparent 50%)`,
            transition: "background-image 0.1s ease-out",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-900/5 to-cyan-900/5"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating Code Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500/20 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {["func()", "O(n)", "{}", "[]", "//", "0x1A", "null", "true"][i]}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 border-b border-green-500/20 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <Eye size={18} className="text-black" />
          </div>
          <h2 className="text-2xl font-bold text-green-400 font-mono tracking-wider">
            &gt; ImagineAlgo_
          </h2>
        </div>
        <nav className="flex items-center space-x-8">
          <a
            href="/"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/sorting"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./sorting
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#searching"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./searching
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/about"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./about
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 flex items-center justify-center min-h-[calc(100vh-88px)] p-6"
      >
        <div className="text-center max-w-5xl">
          {/* Terminal-style intro */}
          <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-6 mb-8 text-left font-mono text-sm backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400">
                algorithm-visualizer@terminal:~$
              </span>
            </div>
            <div className="text-green-400">
              <span className="text-gray-500">$</span> start
              algorithm-visualizer
              <br />
              <span className="text-cyan-400">→</span> Loading sorting
              algorithms: Bubble, Quick, Merge...
              <br />
              <span className="text-cyan-400">→</span> Loading search
              algorithms: Linear, Binary...
              <br />
              <span className="text-green-400">✓</span> Ready to visualize
              step-by-step execution!
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono">
            <span className="text-white">&lt;</span>
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Algorithm
            </span>
            <span className="text-white">/&gt;</span>
            <br />
            <span className="text-green-400 text-4xl md:text-6xl">
              Visualizer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-mono">
            <span className="text-cyan-400">//</span> Learn sorting & searching
            algorithms through
            <br />
            <span className="text-cyan-400">//</span> step-by-step visual
            demonstrations
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 text-black px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 flex items-center gap-2 font-mono">
              <Play size={20} />
              Start_Visualizing()
            </button>
            <button className="border-2 border-green-500 text-green-400 hover:bg-green-500/10 hover:border-cyan-400 hover:text-cyan-400 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-mono">
              <Code size={20} />
              View_Algorithms()
            </button>
          </div>

          {/* Status indicator */}
          <div className="mt-8 flex items-center justify-center space-x-4 text-sm font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">System Online</span>
            </div>
            <div className="text-gray-500">|</div>
            <div className="flex items-center space-x-2">
              <BarChart3 size={16} className="text-cyan-400" />
              <span className="text-gray-400">Algorithm Visualization</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 border-t border-green-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-mono">
              <span className="text-green-400">&gt;</span> System.Features()
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ArrowUpDown,
                title: "Sorting_Algorithms",
                description:
                  "Visualize Bubble Sort, Quick Sort, Merge Sort, and more with step-by-step animations.",
                accent: "from-green-500 to-emerald-500",
                algos: [
                  "Bubble Sort",
                  "Quick Sort",
                  "Merge Sort",
                  "Insertion Sort",
                ],
              },
              {
                icon: Search,
                title: "Search_Algorithms",
                description:
                  "Watch Linear Search and Binary Search algorithms find elements in real-time.",
                accent: "from-cyan-500 to-blue-500",
                algos: ["Linear Search", "Binary Search"],
              },
              {
                icon: BarChart3,
                title: "Performance_Metrics",
                description:
                  "Compare algorithm performance with time complexity analysis and execution counters.",
                accent: "from-purple-500 to-pink-500",
                algos: ["Time Complexity", "Space Analysis", "Step Counter"],
              },
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-8 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.accent} rounded-lg flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-mono">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="space-y-1">
                    {feature.algos.map((algo, i) => (
                      <div key={i} className="text-sm text-green-400 font-mono">
                        → {algo}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-cyan-400 font-mono text-sm group-hover:text-green-400 transition-colors duration-300">
                    Explore <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-6 border-t border-green-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4 font-mono">
              Ready to <span className="text-green-400">visualize</span>{" "}
              algorithms?
            </h3>
            <p className="text-gray-400 mb-6 font-mono">
              // Watch sorting and searching algorithms come to life
            </p>
            <button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 text-black px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 font-mono">
              Start_Visualizing()
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/20 bg-black/80 backdrop-blur-sm p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-gray-400 font-mono text-sm">
            © 2025 ImagineAlgo | Algorithm Visualization Learning Tool
          </div>
          <div className="text-green-400 font-mono text-sm">
            <span className="animate-pulse">●</span> Status: Online
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
