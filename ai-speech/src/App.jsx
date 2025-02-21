import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TypingEffect from "."; // Your typing animation component
import AiSpeech from "./ai"; // The next page you navigate to

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TypingEffect />} />
        <Route path="/ai" element={<AiSpeech />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
