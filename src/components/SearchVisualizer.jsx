import React, { useState, useEffect } from "react";
import {
  Terminal,
  Search,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Zap,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

const SearchVisualizer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [searchResult, setSearchResult] = useState("");
  const [algorithm, setAlgorithm] = useState("linear");
  const [speed, setSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(50);
  const [searchRange, setSearchRange] = useState({
    start: -1,
    end: -1,
    mid: -1,
  });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const algoFromUrl = searchParams.get("algorithm");
    if (algoFromUrl) {
      setAlgorithm(algoFromUrl);
      generateArray();
      setTimeout(() => {
        if (!isSearching) {
          setSearchValue(Math.floor(Math.random() * 100));
        }
      }, 500);
    }
  }, [searchParams]);

  useEffect(() => {
    generateArray();
  }, [algorithm, arraySize]);

  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100));
    }

    if (algorithm === "binary") {
      newArray.sort((a, b) => a - b);
    }

    setArray(newArray);
    resetSearch();
  };

  const resetSearch = () => {
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setSearchResult("");
    setSearchRange({ start: -1, end: -1, mid: -1 });
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const linearSearch = async () => {
    const target = parseInt(searchValue);
    if (isNaN(target)) return;

    setIsSearching(true);
    setSearchResult("");

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await delay(speed);

      if (array[i] === target) {
        setFoundIndex(i);
        setSearchResult("Element Found!");
        setIsSearching(false);
        return;
      }
    }

    setSearchResult("Element Not Found");
    setCurrentIndex(-1);
    setIsSearching(false);
  };

  const binarySearch = async () => {
    const target = parseInt(searchValue);
    if (isNaN(target)) return;

    setIsSearching(true);
    setSearchResult("");

    let start = 0;
    let end = array.length - 1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      setSearchRange({ start, end, mid });
      setCurrentIndex(mid);

      await delay(speed);

      if (array[mid] === target) {
        setFoundIndex(mid);
        setSearchResult("Element Found!");
        setIsSearching(false);
        return;
      }

      if (array[mid] > target) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    setSearchResult("Element Not Found");
    setCurrentIndex(-1);
    setSearchRange({ start: -1, end: -1, mid: -1 });
    setIsSearching(false);
  };

  const handleSearch = () => {
    if (isSearching) return;
    resetSearch();

    if (algorithm === "linear") {
      linearSearch();
    } else {
      binarySearch();
    }
  };

  const handleReset = () => {
    if (!isSearching) {
      generateArray();
    }
  };

  const getBarColor = (index) => {
    if (foundIndex === index) return "#00ff41"; // Matrix green for found
    if (currentIndex === index) return "#ff0040"; // Red for current
    if (algorithm === "binary") {
      if (index === searchRange.mid) return "#ffff00"; // Yellow for mid
      if (
        index >= searchRange.start &&
        index <= searchRange.end &&
        searchRange.start !== -1
      ) {
        return "#00bfff"; // Cyan for search range
      }
    }
    return "#00ffff"; // Default cyan
  };

  const getAlgorithmInfo = () => {
    switch (algorithm) {
      case "linear":
        return {
          name: "Linear Search",
          complexity: "O(n)",
          description: "Sequential search through array",
        };
      case "binary":
        return {
          name: "Binary Search",
          complexity: "O(log n)",
          description: "Divide and conquer on sorted array",
        };
      default:
        return { name: "", complexity: "", description: "" };
    }
  };

  const info = getAlgorithmInfo();

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
          <a
            href="/sorting"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./sorting
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/searching" className="text-cyan-400 font-mono relative">
            ./searching
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400"></span>
          </a>

          <a
            href="/searchVisual"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./visualizer
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
              <span className="ml-4 text-gray-400">search@imaginealgo:~$</span>
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

      {/* Main Content */}
      <div className="relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Search Controls */}
            <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center">
                <Zap className="mr-2" size={20} />
                Search Controls
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    Array Size: {arraySize}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={arraySize}
                    onChange={(e) => setArraySize(parseInt(e.target.value))}
                    disabled={isSearching}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    Speed: {speed}ms
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    Algorithm
                  </label>
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    disabled={isSearching}
                    className="w-full bg-gray-800 border border-green-500/30 text-green-400 font-mono p-2 rounded focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="linear">Linear Search - O(n)</option>
                    <option value="binary">Binary Search - O(log n)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    Target Value
                  </label>
                  <input
                    type="number"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    disabled={isSearching}
                    className="w-full bg-gray-800 border border-green-500/30 text-green-400 font-mono p-2 rounded focus:border-cyan-400 focus:outline-none"
                    placeholder="Enter number to search..."
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleSearch}
                    disabled={isSearching || !searchValue}
                    className="flex-1 bg-gradient-to-r from-green-600/20 to-cyan-600/20 hover:from-green-500/30 hover:to-cyan-500/30 border border-green-500/30 hover:border-cyan-400/50 text-green-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {isSearching ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isSearching ? "stop()" : "start()"}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    disabled={isSearching}
                    className="bg-gradient-to-r from-red-600/20 to-orange-600/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/30 hover:border-orange-400/50 text-red-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>

                <button
                  onClick={generateArray}
                  disabled={isSearching}
                  className="w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 hover:border-blue-400/50 text-purple-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300"
                >
                  generate_random_array()
                </button>
              </div>
            </div>

            {/* Algorithm Info */}
            <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center">
                <Settings className="mr-2" size={20} />
                Algorithm Information
              </h3>

              <div className="space-y-4">
                <div className="bg-black/30 border border-green-500/10 rounded p-4">
                  <h4 className="text-green-400 font-mono text-sm mb-2">
                    // Current Algorithm:
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                    <div>
                      <div className="text-cyan-400">Name:</div>
                      <div className="text-white bg-cyan-500/10 rounded px-2 py-1">
                        {algorithm === "linear"
                          ? "Linear Search"
                          : "Binary Search"}
                      </div>
                    </div>
                    <div>
                      <div className="text-cyan-400">Complexity:</div>
                      <div className="text-white bg-cyan-500/10 rounded px-2 py-1">
                        {algorithm === "linear" ? "O(n)" : "O(log n)"}
                      </div>
                    </div>
                  </div>
                </div>

                {algorithm === "binary" && (
                  <div className="bg-black/30 border border-green-500/10 rounded p-4">
                    <h4 className="text-green-400 font-mono text-sm mb-2">
                      // Binary Search Range:
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-sm font-mono">
                      <div>
                        <div className="text-cyan-400">Start</div>
                        <div className="text-white bg-cyan-500/10 rounded px-2 py-1">
                          {searchRange.start}
                        </div>
                      </div>
                      <div>
                        <div className="text-yellow-400">Mid</div>
                        <div className="text-white bg-yellow-500/10 rounded px-2 py-1">
                          {searchRange.mid}
                        </div>
                      </div>
                      <div>
                        <div className="text-cyan-400">End</div>
                        <div className="text-white bg-cyan-500/10 rounded px-2 py-1">
                          {searchRange.end}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {searchResult && (
                  <div
                    className={`bg-black/30 border rounded p-4 ${
                      searchResult.includes("Found")
                        ? "border-green-500/30 text-green-400"
                        : "border-red-500/30 text-red-400"
                    }`}
                  >
                    <h4 className="font-mono text-sm mb-2">
                      // Search Result:
                    </h4>
                    <div className="font-mono">
                      {searchResult}
                      {foundIndex !== -1 && (
                        <div className="text-gray-400 text-sm mt-1">
                          Index: {foundIndex}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-mono">
                // Array Visualization
              </h3>
              <div className="flex items-center space-x-4 text-sm font-mono">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                  <span className="text-gray-400">default</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-400">current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-400">found</span>
                </div>
                {algorithm === "binary" && (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                    <span className="text-gray-400">mid</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black/50 border border-green-500/10 rounded-lg p-4 min-h-[400px] flex items-end justify-center">
              <div className="flex items-end gap-1 w-full max-w-6xl">
                {array.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 transition-all duration-200 flex items-end justify-center text-xs font-mono text-black font-bold rounded-t relative group"
                    style={{
                      height: `${(value / 100) * 350}px`,
                      backgroundColor: getBarColor(index),
                      minWidth: "4px",
                    }}
                  >
                    {array.length <= 20 && (
                      <span className="absolute -top-6 text-green-400">
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #00ff88;
          cursor: pointer;
          border: 2px solid #000;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #00ff88;
          cursor: pointer;
          border: 2px solid #000;
        }
      `}</style>
    </div>
  );
};

export default SearchVisualizer;
