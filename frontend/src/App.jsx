import React from "react";
import { Routes, Route } from "react-router-dom";
import ActorPage from "./components/ActorPage/ActorPage";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/actors/:id" element={<ActorPage />} />
    </Routes>
  );
}

export default App;
