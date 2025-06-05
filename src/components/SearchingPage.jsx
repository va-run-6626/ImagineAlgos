import React, { useState, useEffect } from "react";
import { Terminal, Code, Zap, Target, Play, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sortingAlgorithms = [
    {
      id: 1,
      name: "LINEAR_SEARCH",
      description:
        "// Compares each element with the target value and looks up if it is same or not",
      algorithm: "for(i=0; i<n; i++) { if(arr[i] == target) return i }",
      timeComplexity: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
      },
      spaceComplexity: "O(1)",
      codeSymbol: "linearSearch()",
    },
    {
      id: 2,
      name: "BINARY_SEARCH",
      description:
        "// Divides the array into two parts and looks up the target value",
      algorithm:
        "while(left <= right) { mid = (left + right) / 2; if(arr[mid] == target) return mid; else if(arr[mid] < target) left = mid + 1; else right = mid - 1; }",
      timeComplexity: {
        best: "O(log(n))",
        average: "O(log(n))",
        worst: "O(log(n))",
      },
      spaceComplexity: "O(1)",
      codeSymbol: "binarySearch()",
    },
  ];

  const handleAlgorithmSelect = (algoName) => {
    // Convert algorithm name to the format expected by the visualizer
    const algoMap = {
      LINEAR_SEARCH: "linear",
      BINARY_SEARCH: "binary",
    };

    const selectedAlgo = algoMap[algoName];
    navigate(`/searchVisual?algorithm=${selectedAlgo}`);
  };

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
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500/20 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {
              [
                "sort()",
                "O(n²)",
                "swap()",
                "merge()",
                "partition()",
                "heapify()",
                "arr[i]",
                "pivot",
                "left++",
                "right--",
                "compare()",
                "divide()",
                "conquer()",
                "while()",
                "for(i++)",
              ][i]
            }
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 border-b border-green-500/20 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <Terminal size={18} className="text-black" />
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
          <a href="/sorting" className="text-cyan-400 font-mono relative">
            ./sorting
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400"></span>
          </a>
          <a
            href="/searching"
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

      {/* Terminal Introduction */}
      <section className="relative z-10 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-6 font-mono text-sm backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400">
                searching@imaginealgo:~$
              </span>
            </div>
            <div className="text-green-400">
              <span className="text-gray-500">$</span> ls algorithms/searching/
              <br />
              <span className="text-cyan-400">→</span> Found 2 searching
              algorithms ready for visualization...
              <br />
              <span className="text-gray-500">$</span> ./run --interactive
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 font-mono">
            <span className="text-white">&lt;</span>
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Searching.Algorithms
            </span>
            <span className="text-white">/&gt;</span>
          </h1>

          <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 max-w-4xl mx-auto backdrop-blur-sm mb-12">
            <p className="text-xl text-gray-300 font-mono leading-relaxed">
              <span className="text-cyan-400">//</span> Interactive
              visualizations of fundamental searching algorithms
              <br />
              <span className="text-cyan-400">//</span> Click on any algorithm
              below to see it in action
              <br />
              <span className="text-cyan-400">//</span> Learn time & space
              complexities through code
            </p>
          </div>
        </div>
      </section>

      {/* Algorithm Cards */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortingAlgorithms.map((algorithm) => (
              <div
                key={algorithm.id}
                className={`relative group cursor-pointer transition-all duration-500 hover:scale-105 ${
                  hoveredCard === algorithm.id ? "z-10" : ""
                }`}
                onMouseEnter={() => setHoveredCard(algorithm.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="bg-gray-900/50 border border-green-500/20 hover:border-cyan-500/50 rounded-lg p-6 backdrop-blur-sm transition-all duration-300 h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500/10 border border-green-500/30 rounded px-2 py-1">
                        <span className="text-green-400 text-xs font-mono">
                          {algorithm.codeSymbol}
                        </span>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>

                  {/* Algorithm Name */}
                  <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-cyan-400 transition-colors duration-300">
                    {algorithm.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 font-mono leading-relaxed">
                    {algorithm.description}
                  </p>

                  {/* Algorithm Code Preview */}
                  <div className="bg-black/50 border border-green-500/20 rounded p-3 mb-6 overflow-hidden">
                    <div className="text-green-400 text-xs font-mono leading-tight">
                      <span className="text-gray-500">01:</span>{" "}
                      <span className="text-cyan-400">function</span>{" "}
                      {algorithm.name.toLowerCase()}() &#123;
                      <br />
                      <span className="text-gray-500">02:</span> &nbsp;&nbsp;
                      <span className="text-yellow-400 truncate block">
                        {algorithm.algorithm}
                      </span>
                      <br />
                      <span className="text-gray-500">03:</span> &#125;
                    </div>
                  </div>

                  {/* Complexities */}
                  <div className="space-y-4 mb-6">
                    {/* Time Complexity */}
                    <div className="bg-black/30 border border-green-500/10 rounded p-3">
                      <h4 className="text-green-400 font-mono text-sm mb-2">
                        // Time Complexity:
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                        <div className="text-center">
                          <div className="text-green-300">Best</div>
                          <div className="text-white bg-green-500/10 rounded px-1 py-0.5">
                            {algorithm.timeComplexity.best}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-yellow-300">Avg</div>
                          <div className="text-white bg-yellow-500/10 rounded px-1 py-0.5">
                            {algorithm.timeComplexity.average}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-300">Worst</div>
                          <div className="text-white bg-red-500/10 rounded px-1 py-0.5">
                            {algorithm.timeComplexity.worst}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Space Complexity */}
                    <div className="bg-black/30 border border-green-500/10 rounded p-3">
                      <h4 className="text-green-400 font-mono text-sm mb-2">
                        // Space Complexity:
                      </h4>
                      <div className="text-center">
                        <div className="text-white bg-cyan-500/10 border border-cyan-500/30 rounded px-3 py-1 font-mono inline-block">
                          {algorithm.spaceComplexity}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleAlgorithmSelect(algorithm.name)}
                    className="w-full bg-gradient-to-r from-green-600/20 to-cyan-600/20 hover:from-green-500/30 hover:to-cyan-500/30 border border-green-500/30 hover:border-cyan-400/50 text-green-400 hover:text-white font-mono py-3 px-4 rounded transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <Play size={16} className="group-hover:text-cyan-400" />
                    <span>run_visualization()</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-center mt-3 space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-500 text-xs font-mono">
                      ready_to_execute
                    </span>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/20 bg-black/80 backdrop-blur-sm p-6">
        <div className="max-w-6xl mx-auto">
          {/* Social Links */}
          {/* <div className="flex justify-center space-x-6 mb-6">
            {["facebook", "instagram", "twitter", "linkedin", "youtube"].map(
              (social) => (
                <a
                  key={social}
                  href="#"
                  className="bg-gray-900/50 border border-green-500/20 hover:border-cyan-400/50 p-3 rounded transition-all duration-300 hover:scale-110 group"
                >
                  <div className="w-5 h-5 border border-green-400 group-hover:border-cyan-400 transition-colors duration-300"></div>
                </a>
              )
            )}
          </div> */}

          {/* Navigation */}
          <div className="flex justify-center space-x-8 mb-6 font-mono">
            {[
              { label: "./home", path: "/" },
              { label: "./sorting", path: "/sorting" },
              { label: "./searching", path: "/searching" },
              { label: "./about", path: "/about" },
            ].map(({ label, path }) => (
              <a
                key={label}
                href={path}
                className="text-green-400 hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-green-500/20 pt-6">
            <p className="text-gray-400 font-mono text-sm">
              <span className="text-green-400">©️</span> 2025 | Crafted with{" "}
              <span className="text-red-400">♥️</span> by
              <span className="text-cyan-400 ml-2">
                Varun Bhutada - Abhishek Soni
              </span>
            </p>
            <div className="flex items-center justify-center mt-2 space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 font-mono text-xs">
                algorithms.online
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchingPage;
