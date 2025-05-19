import React from "react";
import { Routes, Route } from "react-router-dom";
import ActorPage from "./components/ActorPage/ActorPage";
import LandingPage from "./components/LandingPage/LandingPage";
import MoviePage from "./components/MoviePage/MovieDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/actors/:id" element={<ActorPage />} />
      <Route path="/movies/:id" element={<MoviePage />} />
    </Routes>
  );
}

export default App;
