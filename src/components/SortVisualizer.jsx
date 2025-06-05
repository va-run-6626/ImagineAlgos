import React, { useState, useEffect, useRef } from "react";
import { Terminal, Play, Pause, RotateCcw, Settings, Zap } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const SortVisualizer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState("");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [customArray, setCustomArray] = useState("");
  const [useCustomArray, setUseCustomArray] = useState(false);
  const [currentComparisons, setCurrentComparisons] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const stopRef = useRef(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  useEffect(() => {
    const algoFromUrl = searchParams.get("algorithm");
    if (algoFromUrl) {
      setAlgorithm(algoFromUrl);
      if (!isVisualizing) {
        setTimeout(() => {
          startSorting();
        }, 500);
      }
    }
  }, [searchParams]);

  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 300) + 10);
    }
    setArray(newArray);
    setCurrentComparisons([]);
    setSortedIndices([]);
  };

  const createCustomArray = () => {
    if (customArray.trim()) {
      const newArray = customArray
        .split(",")
        .map((num) => parseInt(num.trim()))
        .filter((num) => !isNaN(num))
        .slice(0, 15);

      if (newArray.length > 0) {
        setArray(newArray);
        setArraySize(newArray.length);
        setCurrentComparisons([]);
        setSortedIndices([]);
      }
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const bubbleSort = async (arr) => {
    const n = arr.length;
    const newArray = [...arr];

    for (let i = 0; i < n; i++) {
      if (stopRef.current) return;

      for (let j = 0; j < n - i - 1; j++) {
        if (stopRef.current) return;

        setCurrentComparisons([j, j + 1]);
        await sleep(101 - speed);

        if (newArray[j] > newArray[j + 1]) {
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
          setArray([...newArray]);
          await sleep(101 - speed);
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }

    setCurrentComparisons([]);
    setSortedIndices([...Array(n).keys()]);
  };

  const insertionSort = async (arr) => {
    const newArray = [...arr];

    for (let i = 1; i < newArray.length; i++) {
      if (stopRef.current) return;

      let key = newArray[i];
      let j = i - 1;

      while (j >= 0 && newArray[j] > key) {
        if (stopRef.current) return;

        setCurrentComparisons([j, j + 1]);
        newArray[j + 1] = newArray[j];
        setArray([...newArray]);
        await sleep(101 - speed);
        j--;
      }

      newArray[j + 1] = key;
      setArray([...newArray]);
      setSortedIndices((prev) => [...prev, i]);
      await sleep(101 - speed);
    }

    setCurrentComparisons([]);
    setSortedIndices([...Array(newArray.length).keys()]);
  };

  const selectionSort = async (arr) => {
    const newArray = [...arr];

    for (let i = 0; i < newArray.length; i++) {
      if (stopRef.current) return;

      let minIndex = i;
      for (let j = i + 1; j < newArray.length; j++) {
        if (stopRef.current) return;

        setCurrentComparisons([minIndex, j]);
        await sleep(101 - speed);

        if (newArray[j] < newArray[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
        setArray([...newArray]);
      }

      setSortedIndices((prev) => [...prev, i]);
      await sleep(101 - speed);
    }

    setCurrentComparisons([]);
  };

  const quickSort = async (arr, low = 0, high = arr.length - 1) => {
    if (low < high && !stopRef.current) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (stopRef.current) return;

      setCurrentComparisons([j, high]);
      await sleep(101 - speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(101 - speed);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    return i + 1;
  };

  const mergeSort = async (arr, start = 0, end = arr.length - 1) => {
    if (start < end && !stopRef.current) {
      const mid = Math.floor((start + end) / 2);
      await mergeSort(arr, start, mid);
      await mergeSort(arr, mid + 1, end);
      await merge(arr, start, mid, end);
    }
  };

  const merge = async (arr, start, mid, end) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length && !stopRef.current) {
      setCurrentComparisons([start + i, mid + 1 + j]);
      await sleep(101 - speed);

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      setArray([...arr]);
      k++;
    }

    while (i < left.length && !stopRef.current) {
      arr[k] = left[i];
      setArray([...arr]);
      i++;
      k++;
      await sleep(101 - speed);
    }

    while (j < right.length && !stopRef.current) {
      arr[k] = right[j];
      setArray([...arr]);
      j++;
      k++;
      await sleep(101 - speed);
    }
  };

  const heapSort = async (arr) => {
    const newArray = [...arr];
    const n = newArray.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(newArray, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      if (stopRef.current) return;

      [newArray[0], newArray[i]] = [newArray[i], newArray[0]];
      setArray([...newArray]);
      setSortedIndices((prev) => [...prev, i]);
      await sleep(101 - speed);

      await heapify(newArray, i, 0);
    }

    setCurrentComparisons([]);
    setSortedIndices([...Array(n).keys()]);
  };

  const heapify = async (arr, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i && !stopRef.current) {
      setCurrentComparisons([i, largest]);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await sleep(101 - speed);
      await heapify(arr, n, largest);
    }
  };

  const startSorting = async () => {
    if (!algorithm || isVisualizing) return;

    setIsVisualizing(true);
    stopRef.current = false;
    setCurrentComparisons([]);
    setSortedIndices([]);

    const arrayToSort = [...array];

    try {
      switch (algorithm) {
        case "bubble":
          await bubbleSort(arrayToSort);
          break;
        case "insertion":
          await insertionSort(arrayToSort);
          break;
        case "selection":
          await selectionSort(arrayToSort);
          break;
        case "quick":
          await quickSort(arrayToSort);
          setSortedIndices([...Array(arrayToSort.length).keys()]);
          break;
        case "merge":
          await mergeSort(arrayToSort);
          setSortedIndices([...Array(arrayToSort.length).keys()]);
          break;
        case "heap":
          await heapSort(arrayToSort);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Sorting error:", error);
    }

    setIsVisualizing(false);
    setCurrentComparisons([]);
  };

  const stopSorting = () => {
    stopRef.current = true;
    setIsVisualizing(false);
    setCurrentComparisons([]);
  };

  const resetArray = () => {
    stopRef.current = true;
    setIsVisualizing(false);
    setCurrentComparisons([]);
    setSortedIndices([]);
    if (useCustomArray) {
      createCustomArray();
    } else {
      generateRandomArray();
    }
  };

  const getBarColor = (index) => {
    if (sortedIndices.includes(index)) return "bg-green-500";
    if (currentComparisons.includes(index)) return "bg-red-500";
    return "bg-cyan-400";
  };

  const algorithms = [
    { value: "bubble", label: "Bubble Sort", complexity: "O(n²)" },
    { value: "insertion", label: "Insertion Sort", complexity: "O(n²)" },
    { value: "selection", label: "Selection Sort", complexity: "O(n²)" },
    { value: "quick", label: "Quick Sort", complexity: "O(n log n)" },
    { value: "merge", label: "Merge Sort", complexity: "O(n log n)" },
    { value: "heap", label: "Heap Sort", complexity: "O(n log n)" },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden relative">
      {/* Animated Background */}
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
          <a
            href="/searching"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./searching
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/visualizer" className="text-cyan-400 font-mono relative">
            ./visualizer
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400"></span>
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Terminal Status */}
          <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 mb-6 font-mono text-sm backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400">
                visualizer@sortingalgo:~$
              </span>
            </div>
            <div className="text-green-400">
              <span className="text-gray-500">$</span>{" "}
              {isVisualizing
                ? `running ${algorithm}_sort()...`
                : "ready for visualization"}
              <br />
              <span className="text-cyan-400">→</span> Array size:{" "}
              {array.length} | Speed: {speed}ms | Algorithm:{" "}
              {algorithm || "none"}
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bar Visualization Controls */}
            <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center">
                <Zap className="mr-2" size={20} />
                Bar Visualization
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
                    step="5"
                    value={arraySize}
                    onChange={(e) => setArraySize(parseInt(e.target.value))}
                    disabled={isVisualizing}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    Speed: {speed}ms
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
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
                    disabled={isVisualizing}
                    className="w-full bg-gray-800 border border-green-500/30 text-green-400 font-mono p-2 rounded focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="">Select Algorithm</option>
                    {algorithms.map((algo) => (
                      <option key={algo.value} value={algo.value}>
                        {algo.label} - {algo.complexity}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={isVisualizing ? stopSorting : startSorting}
                    disabled={!algorithm}
                    className="flex-1 bg-gradient-to-r from-green-600/20 to-cyan-600/20 hover:from-green-500/30 hover:to-cyan-500/30 border border-green-500/30 hover:border-cyan-400/50 text-green-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVisualizing ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isVisualizing ? "stop()" : "start()"}</span>
                  </button>

                  <button
                    onClick={resetArray}
                    disabled={isVisualizing}
                    className="bg-gradient-to-r from-red-600/20 to-orange-600/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/30 hover:border-orange-400/50 text-red-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw size={16} />
                    <span>reset()</span>
                  </button>
                </div>

                <button
                  onClick={generateRandomArray}
                  disabled={isVisualizing}
                  className="w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 hover:border-blue-400/50 text-purple-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  generate_random_array()
                </button>
              </div>
            </div>

            {/* Custom Array Input */}
            <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center">
                <Settings className="mr-2" size={20} />
                Custom Array Input
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    Custom Array (comma separated, max 15 elements)
                  </label>
                  <input
                    type="text"
                    value={customArray}
                    onChange={(e) => setCustomArray(e.target.value)}
                    placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
                    disabled={isVisualizing}
                    className="w-full bg-gray-800 border border-green-500/30 text-green-400 font-mono p-2 rounded focus:border-cyan-400 focus:outline-none placeholder-gray-500"
                  />
                </div>

                <button
                  onClick={createCustomArray}
                  disabled={isVisualizing || !customArray.trim()}
                  className="w-full bg-gradient-to-r from-green-600/20 to-cyan-600/20 hover:from-green-500/30 hover:to-cyan-500/30 border border-green-500/30 hover:border-cyan-400/50 text-green-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  create_custom_array()
                </button>

                {algorithm && (
                  <div className="bg-black/30 border border-green-500/10 rounded p-3">
                    <h4 className="text-green-400 font-mono text-sm mb-2">
                      // Current Algorithm Info:
                    </h4>
                    <div className="text-xs font-mono text-gray-300">
                      <div>
                        Name:{" "}
                        {algorithms.find((a) => a.value === algorithm)?.label}
                      </div>
                      <div>
                        Complexity:{" "}
                        {
                          algorithms.find((a) => a.value === algorithm)
                            ?.complexity
                        }
                      </div>
                      <div>Status: {isVisualizing ? "running" : "ready"}</div>
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
                  <span className="text-gray-400">comparing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-400">sorted</span>
                </div>
              </div>
            </div>

            <div className="bg-black/50 border border-green-500/10 rounded-lg p-4 min-h-[400px] flex items-end justify-center">
              <div className="flex items-end gap-1 w-full max-w-6xl">
                {array.map((value, index) => (
                  <div
                    key={index}
                    className={`${getBarColor(
                      index
                    )} flex-1 transition-all duration-200 flex items-end justify-center text-xs font-mono text-black font-bold rounded-t`}
                    style={{
                      height: `${(value / Math.max(...array)) * 350}px`,
                      minWidth: "4px",
                    }}
                  >
                    {array.length <= 20 && (
                      <span className="transform rotate-0 text-xs">
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

export default SortVisualizer;
