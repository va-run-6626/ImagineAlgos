import React from "react";
import { Terminal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
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
        <Link
          to="/"
          className={`${
            isActive("/")
              ? "text-cyan-400"
              : "text-green-400 hover:text-cyan-400"
          } transition-colors duration-300 font-mono relative group`}
        >
          ./home
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isActive("/") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>

        <Link
          to="/sorting"
          className={`${
            isActive("/sorting")
              ? "text-cyan-400"
              : "text-green-400 hover:text-cyan-400"
          } transition-colors duration-300 font-mono relative group`}
        >
          ./sorting
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isActive("/sorting") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>

        <Link
          to="/searching"
          className={`${
            isActive("/searching")
              ? "text-cyan-400"
              : "text-green-400 hover:text-cyan-400"
          } transition-colors duration-300 font-mono relative group`}
        >
          ./searching
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isActive("/searching") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>

        <Link
          to="/treeVisual"
          className={`${
            isActive("/treeVisual")
              ? "text-cyan-400"
              : "text-green-400 hover:text-cyan-400"
          } transition-colors duration-300 font-mono relative group`}
        >
          ./tree-traversal
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isActive("/treeVisual") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          to="/about"
          className={`${
            isActive("/treeVisual")
              ? "text-cyan-400"
              : "text-green-400 hover:text-cyan-400"
          } transition-colors duration-300 font-mono relative group`}
        >
          ./about
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isActive("/treeVisual") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
