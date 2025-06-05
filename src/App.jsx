import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import SortingPage from "./components/SortingPage";
import SearchingPage from "./components/SearchingPage";
import SortVisualizer from "./components/SortVisualizer";
import SearchVisualizer from "./components/SearchVisualizer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sorting" element={<SortingPage />} />
        <Route path="/searching" element={<SearchingPage />} />
        <Route path="/sortVisual" element={<SortVisualizer />} />
        <Route path="/searchVisual" element={<SearchVisualizer />} />
      </Routes>
    </Router>
  );
};

export default App;
