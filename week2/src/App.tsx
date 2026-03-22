import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { DogGallery } from './pages/DogGallery.tsx';
import CatGallery from './pages/CatGallery.tsx';
// Home component (can be in the same file for this small example)
function Home() {
  return <div className="p-8 text-xl">Welcome to the Dog App!</div>;
}

export default function App() {
  return (
    // BrowserRouter wraps the entire application
    <BrowserRouter>
      {/* Navigation - The Link component replaces the traditional <a> tag */}
      <nav className="p-4 bg-zinc-800 text-white flex gap-4">
        <Link to="/" className="hover:text-blue-300">Home</Link>
        <Link to="/dogs" className="hover:text-blue-300">Dog Gallery</Link>
        <Link to="/cats" className="hover:text-blue-300">Cat Gallery</Link>
      </nav>

      {/* Routes - Defining which component is shown at which URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<DogGallery />} />
        <Route path="/cats" element={<CatGallery />} />
      </Routes>
    </BrowserRouter>
  );
}