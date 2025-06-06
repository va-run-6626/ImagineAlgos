// import React from "react";
// import { Terminal } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// const NavBar = () => {
//   const location = useLocation();

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <header className="relative z-10 flex justify-between items-center p-6 border-b border-green-500/20 bg-black/80 backdrop-blur-sm">
//       <Link to="/" className="flex items-center space-x-3">
//         <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
//           <Terminal size={18} className="text-black" />
//         </div>
//         <h2 className="text-2xl font-bold text-green-400 font-mono tracking-wider">
//           &gt; ImagineAlgo_
//         </h2>
//       </Link>

//       <nav className="flex items-center space-x-8">
//         <Link
//           to="/"
//           className={`${
//             isActive("/")
//               ? "text-cyan-400"
//               : "text-green-400 hover:text-cyan-400"
//           } transition-colors duration-300 font-mono relative group`}
//         >
//           ./home
//           <span
//             className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
//               isActive("/") ? "w-full" : "w-0 group-hover:w-full"
//             }`}
//           ></span>
//         </Link>

//         <Link
//           to="/sorting"
//           className={`${
//             isActive("/sorting")
//               ? "text-cyan-400"
//               : "text-green-400 hover:text-cyan-400"
//           } transition-colors duration-300 font-mono relative group`}
//         >
//           ./sorting
//           <span
//             className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
//               isActive("/sorting") ? "w-full" : "w-0 group-hover:w-full"
//             }`}
//           ></span>
//         </Link>

//         <Link
//           to="/searching"
//           className={`${
//             isActive("/searching")
//               ? "text-cyan-400"
//               : "text-green-400 hover:text-cyan-400"
//           } transition-colors duration-300 font-mono relative group`}
//         >
//           ./searching
//           <span
//             className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
//               isActive("/searching") ? "w-full" : "w-0 group-hover:w-full"
//             }`}
//           ></span>
//         </Link>

//         <Link
//           to="/treeVisual"
//           className={`${
//             isActive("/treeVisual")
//               ? "text-cyan-400"
//               : "text-green-400 hover:text-cyan-400"
//           } transition-colors duration-300 font-mono relative group`}
//         >
//           ./tree-traversal
//           <span
//             className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
//               isActive("/treeVisual") ? "w-full" : "w-0 group-hover:w-full"
//             }`}
//           ></span>
//         </Link>
//         <Link
//           to="/about"
//           className={`${
//             isActive("/treeVisual")
//               ? "text-cyan-400"
//               : "text-green-400 hover:text-cyan-400"
//           } transition-colors duration-300 font-mono relative group`}
//         >
//           ./about
//           <span
//             className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
//               isActive("/treeVisual") ? "w-full" : "w-0 group-hover:w-full"
//             }`}
//           ></span>
//         </Link>
//       </nav>
//     </header>
//   );
// };

// export default NavBar;

import React, { useState } from "react";
import { Terminal, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/", label: "./home" },
    { path: "/sorting", label: "./sorting" },
    { path: "/searching", label: "./searching" },
    { path: "/treeVisual", label: "./tree-traversal" },
    { path: "/about", label: "./about" },
  ];

  return (
    <header className="relative z-20 flex justify-between items-center p-4 sm:p-6 border-b border-green-500/20 bg-black/80 backdrop-blur-sm">
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center space-x-2 sm:space-x-3"
        onClick={closeMobileMenu}
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
          <Terminal size={14} className="sm:hidden text-black" />
          <Terminal size={18} className="hidden sm:block text-black" />
        </div>
        <h2 className="text-lg sm:text-2xl font-bold text-green-400 font-mono tracking-wider">
          <span className="hidden sm:inline">&gt; ImagineAlgo_</span>
          <span className="sm:hidden">&gt; IA_</span>
        </h2>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`${
              isActive(link.path)
                ? "text-cyan-400"
                : "text-green-400 hover:text-cyan-400"
            } transition-colors duration-300 font-mono relative group text-sm xl:text-base`}
          >
            {link.label}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden p-2 text-green-400 hover:text-cyan-400 transition-colors duration-300"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-green-500/20 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMobileMenu}
              className={`${
                isActive(link.path)
                  ? "text-cyan-400 bg-green-500/10"
                  : "text-green-400 hover:text-cyan-400 hover:bg-green-500/5"
              } transition-all duration-300 font-mono p-3 rounded-lg border border-transparent hover:border-green-500/20`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
          onClick={closeMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default NavBar;
