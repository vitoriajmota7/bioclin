import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Lipidograma from "./Lipidograma";
import Hematologia from "./Hematologia";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/lipidograma" element={<Lipidograma />} />

        <Route path="/hematologia" element={<Hematologia />} />

      </Routes>
    </BrowserRouter>
  );
}