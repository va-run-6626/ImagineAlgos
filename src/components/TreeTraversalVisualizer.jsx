import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Terminal,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Zap,
  TreePine,
  Info,
} from "lucide-react";
import NavBar from "./NavBar";

const TreeTraversalVisualizer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [algorithm, setAlgorithm] = useState("BFS");
  const [dfsType, setDfsType] = useState("preorder");
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [currentNode, setCurrentNode] = useState(null);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [step, setStep] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildingNode, setBuildingNode] = useState(null);
  const [buildingSide, setBuildingSide] = useState(null);
  const stopRef = useRef(false);

  // Default binary tree
  const [tree, setTree] = useState({
    value: "A",
    left: {
      value: "B",
      left: { value: "D", left: null, right: null },
      right: { value: "E", left: null, right: null },
    },
    right: {
      value: "C",
      left: { value: "F", left: null, right: null },
      right: {
        value: "G",
        left: { value: "H", left: null, right: null },
        right: null,
      },
    },
  });

  const [nodeCounter, setNodeCounter] = useState(8);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const bfsTraversal = (root) => {
    if (!root) return [];
    const result = [];
    const queue = [root];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  };

  const preorderTraversal = (root, result = []) => {
    if (!root) return result;
    result.push(root);
    preorderTraversal(root.left, result);
    preorderTraversal(root.right, result);
    return result;
  };

  const inorderTraversal = (root, result = []) => {
    if (!root) return result;
    inorderTraversal(root.left, result);
    result.push(root);
    inorderTraversal(root.right, result);
    return result;
  };

  const postorderTraversal = (root, result = []) => {
    if (!root) return result;
    postorderTraversal(root.left, result);
    postorderTraversal(root.right, result);
    result.push(root);
    return result;
  };

  const getTraversalOrder = () => {
    if (algorithm === "BFS") {
      return bfsTraversal(tree);
    } else {
      switch (dfsType) {
        case "preorder":
          return preorderTraversal(tree);
        case "inorder":
          return inorderTraversal(tree);
        case "postorder":
          return postorderTraversal(tree);
        default:
          return preorderTraversal(tree);
      }
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const startTraversal = async () => {
    if (isRunning) return;

    setIsRunning(true);
    stopRef.current = false;
    setVisitedNodes(new Set());
    setCurrentNode(null);
    setStep(0);

    const order = getTraversalOrder();
    setTraversalOrder(order);

    // Animate through the traversal
    for (let i = 0; i < order.length; i++) {
      if (stopRef.current) break;

      const node = order[i];
      setCurrentNode(node);
      setStep(i + 1);

      await sleep(speed);

      setVisitedNodes((prev) => new Set([...prev, node.value]));
    }

    setIsRunning(false);
    setCurrentNode(null);
  };

  const stopTraversal = () => {
    stopRef.current = true;
    setIsRunning(false);
    setCurrentNode(null);
  };

  const resetVisualization = () => {
    stopRef.current = true;
    setIsRunning(false);
    setVisitedNodes(new Set());
    setCurrentNode(null);
    setTraversalOrder([]);
    setStep(0);
  };

  const clearTree = () => {
    setTree({ value: "A", left: null, right: null });
    setNodeCounter(1);
    resetVisualization();
  };

  const generateRandomTree = () => {
    const generateNode = (depth, maxDepth, counter) => {
      if (depth >= maxDepth || Math.random() < 0.3) return null;

      const node = {
        value: String.fromCharCode(65 + counter.count),
        left: null,
        right: null,
      };
      counter.count++;

      if (Math.random() > 0.4) {
        node.left = generateNode(depth + 1, maxDepth, counter);
      }
      if (Math.random() > 0.4) {
        node.right = generateNode(depth + 1, maxDepth, counter);
      }

      return node;
    };

    const counter = { count: 0 };
    const newTree = generateNode(0, 4, counter);
    setTree(newTree || { value: "A", left: null, right: null });
    setNodeCounter(counter.count);
    resetVisualization();
  };

  const startBuilding = () => {
    setIsBuilding(!isBuilding);
    setBuildingNode(null);
    setBuildingSide(null);
  };

  const handleNodeClick = (node, side) => {
    if (!isBuilding) return;

    if (buildingNode === node && buildingSide === side) {
      // Add new node
      const newNodeValue = String.fromCharCode(65 + nodeCounter);
      const newNode = { value: newNodeValue, left: null, right: null };

      const updateTree = (current) => {
        if (current === node) {
          return { ...current, [side]: newNode };
        }
        const updated = { ...current };
        if (updated.left) updated.left = updateTree(updated.left);
        if (updated.right) updated.right = updateTree(updated.right);
        return updated;
      };

      setTree(updateTree(tree));
      setNodeCounter((prev) => prev + 1);
      setBuildingNode(null);
      setBuildingSide(null);
    } else {
      setBuildingNode(node);
      setBuildingSide(side);
    }
  };

  const deleteNode = (nodeToDelete) => {
    if (!isBuilding) return;

    const deleteFromTree = (current, parent, isLeft) => {
      if (current === nodeToDelete) {
        if (parent) {
          if (isLeft) parent.left = null;
          else parent.right = null;
        } else {
          // Deleting root
          setTree({ value: "A", left: null, right: null });
          setNodeCounter(1);
          return;
        }
      }

      if (current.left) deleteFromTree(current.left, current, true);
      if (current.right) deleteFromTree(current.right, current, false);
    };

    if (nodeToDelete === tree) {
      setTree({ value: "A", left: null, right: null });
      setNodeCounter(1);
    } else {
      const newTree = { ...tree };
      deleteFromTree(newTree, null, false);
      setTree(newTree);
    }

    resetVisualization();
  };

  // Calculate node positions with proper spacing to avoid overlaps
  const calculateNodePositions = (node, x, y, level, positions = new Map()) => {
    if (!node) return positions;

    // Calculate horizontal spacing based on tree depth and level
    const baseSpacing = 80; // Base spacing between nodes
    const levelMultiplier = 2; // Increase spacing at each level
    const levelSpacing = baseSpacing * Math.pow(levelMultiplier, level);

    positions.set(node, { x, y });

    const childY = y + 100; // Vertical spacing between levels

    // Calculate positions for left and right children
    if (node.left) {
      calculateNodePositions(
        node.left,
        x - levelSpacing,
        childY,
        level + 1,
        positions
      );
    }

    if (node.right) {
      calculateNodePositions(
        node.right,
        x + levelSpacing,
        childY,
        level + 1,
        positions
      );
    }

    return positions;
  };

  const BinaryTreeNode = ({ node, x, y, level = 0 }) => {
    if (!node) return null;

    const isVisited = visitedNodes.has(node.value);
    const isCurrent = currentNode?.value === node.value;
    const isSelectedForBuilding = buildingNode === node;

    // Calculate proper spacing for children
    const baseSpacing = 80;
    const levelMultiplier = 2;
    const levelSpacing = baseSpacing * Math.pow(levelMultiplier, level);
    const leftChildX = x - levelSpacing;
    const rightChildX = x + levelSpacing;
    const childY = y + 100;

    return (
      <g>
        {/* Connection lines */}
        {node.left && (
          <line
            x1={x}
            y1={y + 25}
            x2={leftChildX}
            y2={childY - 25}
            className="stroke-green-500/50 stroke-2"
          />
        )}
        {node.right && (
          <line
            x1={x}
            y1={y + 25}
            x2={rightChildX}
            y2={childY - 25}
            className="stroke-green-500/50 stroke-2"
          />
        )}

        {/* Node circle */}
        <circle
          cx={x}
          cy={y}
          r="25"
          className={`transition-all duration-300 cursor-pointer ${
            isCurrent
              ? "fill-red-500 stroke-red-400"
              : isVisited
              ? "fill-green-500 stroke-green-400"
              : isSelectedForBuilding
              ? "fill-yellow-500 stroke-yellow-400"
              : "fill-gray-800 stroke-cyan-400/50 hover:fill-gray-700 hover:stroke-cyan-400"
          }`}
          strokeWidth="2"
          onClick={() => isBuilding && deleteNode(node)}
        />

        {/* Node label */}
        <text
          x={x}
          y={y + 6}
          textAnchor="middle"
          className="text-white text-lg font-bold pointer-events-none font-mono"
        >
          {node.value}
        </text>

        {/* Add node buttons for building mode */}
        {isBuilding && (
          <>
            {!node.left && (
              <g>
                <circle
                  cx={leftChildX}
                  cy={childY}
                  r="20"
                  className={`cursor-pointer transition-all duration-200 ${
                    buildingNode === node && buildingSide === "left"
                      ? "fill-green-600 stroke-green-400"
                      : "fill-gray-800/50 stroke-green-500/50 hover:fill-gray-700 hover:stroke-green-400"
                  }`}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  onClick={() => handleNodeClick(node, "left")}
                />
                <text
                  x={leftChildX}
                  y={childY + 5}
                  textAnchor="middle"
                  className="text-green-400 text-sm font-bold pointer-events-none"
                >
                  +
                </text>
                <text
                  x={leftChildX}
                  y={childY + 40}
                  textAnchor="middle"
                  className="text-green-400/70 text-xs pointer-events-none font-mono"
                >
                  L
                </text>
              </g>
            )}

            {!node.right && (
              <g>
                <circle
                  cx={rightChildX}
                  cy={childY}
                  r="20"
                  className={`cursor-pointer transition-all duration-200 ${
                    buildingNode === node && buildingSide === "right"
                      ? "fill-green-600 stroke-green-400"
                      : "fill-gray-800/50 stroke-green-500/50 hover:fill-gray-700 hover:stroke-green-400"
                  }`}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  onClick={() => handleNodeClick(node, "right")}
                />
                <text
                  x={rightChildX}
                  y={childY + 5}
                  textAnchor="middle"
                  className="text-green-400 text-sm font-bold pointer-events-none"
                >
                  +
                </text>
                <text
                  x={rightChildX}
                  y={childY + 40}
                  textAnchor="middle"
                  className="text-green-400/70 text-xs pointer-events-none font-mono"
                >
                  R
                </text>
              </g>
            )}
          </>
        )}

        {/* Recursive child nodes */}
        <BinaryTreeNode
          node={node.left}
          x={leftChildX}
          y={childY}
          level={level + 1}
        />
        <BinaryTreeNode
          node={node.right}
          x={rightChildX}
          y={childY}
          level={level + 1}
        />
      </g>
    );
  };

  const getAlgorithmInfo = () => {
    if (algorithm === "BFS") {
      return {
        name: "Breadth-First Search",
        description: "Visits nodes level by level",
        order: "Level order traversal",
        complexity: "O(n)",
      };
    } else {
      switch (dfsType) {
        case "preorder":
          return {
            name: "DFS - Preorder",
            description: "Root → Left → Right",
            order: "Visit root, then left subtree, then right subtree",
            complexity: "O(n)",
          };
        case "inorder":
          return {
            name: "DFS - Inorder",
            description: "Left → Root → Right",
            order: "Visit left subtree, then root, then right subtree",
            complexity: "O(n)",
          };
        case "postorder":
          return {
            name: "DFS - Postorder",
            description: "Left → Right → Root",
            order: "Visit left subtree, then right subtree, then root",
            complexity: "O(n)",
          };
        default:
          return {
            name: "DFS",
            description: "",
            order: "",
            complexity: "O(n)",
          };
      }
    }
  };

  const algorithmInfo = getAlgorithmInfo();

  const algorithms = [
    { value: "BFS", label: "Breadth-First Search", complexity: "O(n)" },
    { value: "DFS", label: "Depth-First Search", complexity: "O(n)" },
  ];

  const dfsTypes = [
    { value: "preorder", label: "Preorder (Root → Left → Right)" },
    { value: "inorder", label: "Inorder (Left → Root → Right)" },
    { value: "postorder", label: "Postorder (Left → Right → Root)" },
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

      {/* NavBar */}
      <NavBar />

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
                visualizer@treetraversal:~$
              </span>
            </div>
            <div className="text-green-400">
              <span className="text-gray-500">$</span>{" "}
              {isRunning
                ? `running ${algorithm.toLowerCase()}_traversal()...`
                : isBuilding
                ? "building_mode_active"
                : "ready for traversal"}
              <br />
              <span className="text-cyan-400">→</span> Nodes: {nodeCounter} |
              Speed: {speed}ms | Algorithm: {algorithm}
              {algorithm === "DFS" && ` (${dfsType})`} | Step: {step}/
              {traversalOrder.length}
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Traversal Controls */}
            <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center">
                <Zap className="mr-2" size={20} />
                Traversal Controls
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    Speed: {speed}ms
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
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
                    disabled={isRunning}
                    className="w-full bg-gray-800 border border-green-500/30 text-green-400 font-mono p-2 rounded focus:border-cyan-400 focus:outline-none"
                  >
                    {algorithms.map((algo) => (
                      <option key={algo.value} value={algo.value}>
                        {algo.label} - {algo.complexity}
                      </option>
                    ))}
                  </select>
                </div>

                {algorithm === "DFS" && (
                  <div>
                    <label className="block text-green-400 font-mono text-sm mb-2">
                      DFS Type
                    </label>
                    <select
                      value={dfsType}
                      onChange={(e) => setDfsType(e.target.value)}
                      disabled={isRunning}
                      className="w-full bg-gray-800 border border-green-500/30 text-green-400 font-mono p-2 rounded focus:border-cyan-400 focus:outline-none"
                    >
                      {dfsTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={isRunning ? stopTraversal : startTraversal}
                    disabled={!tree}
                    className="flex-1 bg-gradient-to-r from-green-600/20 to-cyan-600/20 hover:from-green-500/30 hover:to-cyan-500/30 border border-green-500/30 hover:border-cyan-400/50 text-green-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRunning ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isRunning ? "stop()" : "start()"}</span>
                  </button>

                  <button
                    onClick={resetVisualization}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-red-600/20 to-orange-600/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/30 hover:border-orange-400/50 text-red-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw size={16} />
                    <span>reset()</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tree Builder */}
            <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center">
                <Settings className="mr-2" size={20} />
                Tree Builder
              </h3>

              <div className="space-y-4">
                <button
                  onClick={startBuilding}
                  disabled={isRunning}
                  className={`w-full px-4 py-2 rounded font-mono transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isBuilding
                      ? "bg-gradient-to-r from-yellow-600/20 to-orange-600/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-500/30 hover:border-orange-400/50 text-yellow-400 hover:text-white"
                      : "bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-purple-400/50 text-blue-400 hover:text-white"
                  }`}
                >
                  <TreePine size={16} />
                  <span>
                    {isBuilding
                      ? "exit_building_mode()"
                      : "enable_building_mode()"}
                  </span>
                </button>

                <button
                  onClick={generateRandomTree}
                  disabled={isRunning}
                  className="w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 hover:border-blue-400/50 text-purple-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  generate_random_tree()
                </button>

                <button
                  onClick={clearTree}
                  disabled={isRunning}
                  className="w-full bg-gradient-to-r from-red-600/20 to-pink-600/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-500/30 hover:border-pink-400/50 text-red-400 hover:text-white font-mono py-2 px-4 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  clear_tree()
                </button>

                {isBuilding && (
                  <div className="bg-black/30 border border-green-500/10 rounded p-3">
                    <h4 className="text-green-400 font-mono text-sm mb-2">
                      // Building Mode Instructions:
                    </h4>
                    <div className="text-xs font-mono text-gray-300 space-y-1">
                      <div>• Click dashed circles to add nodes</div>
                      <div>• Click existing nodes to delete them</div>
                      <div>• L = Left child, R = Right child</div>
                      <div>• Nodes are properly spaced to avoid overlaps</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Algorithm Info */}
          <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm mb-6">
            <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center">
              <Info className="mr-2" size={20} />
              Algorithm Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-black/30 border border-green-500/10 rounded p-4">
                  <h4 className="text-green-400 font-mono text-sm mb-2">
                    // Current Algorithm:
                  </h4>
                  <div className="text-xs font-mono text-gray-300 space-y-1">
                    <div>
                      <span className="text-cyan-400">Name:</span>{" "}
                      {algorithmInfo.name}
                    </div>
                    <div>
                      <span className="text-cyan-400">Pattern:</span>{" "}
                      {algorithmInfo.description}
                    </div>
                    <div>
                      <span className="text-cyan-400">Complexity:</span>{" "}
                      {algorithmInfo.complexity}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-black/30 border border-green-500/10 rounded p-4">
                  <h4 className="text-green-400 font-mono text-sm mb-2">
                    // Traversal Order:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {traversalOrder.slice(0, step).map((node, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs font-mono transition-all duration-200 ${
                          index === step - 1
                            ? "bg-red-500/20 text-red-400 border border-red-400/50"
                            : "bg-green-500/20 text-green-400 border border-green-400/50"
                        }`}
                      >
                        {node.value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tree Visualization */}
          <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-mono">
                // Binary Tree Visualization
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
                  <span className="text-gray-400">visited</span>
                </div>
                {isBuilding && (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-gray-400">selected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black/50 border border-green-500/10 rounded-lg p-4 min-h-[500px] flex items-center justify-center">
              <svg width="100%" height="500" className="overflow-hidden">
                <g transform={`translate(${window.innerWidth / 3.2}, 50)`}>
                  <BinaryTreeNode node={tree} x={0} y={0} level={0} />
                </g>
              </svg>
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

export default TreeTraversalVisualizer;
