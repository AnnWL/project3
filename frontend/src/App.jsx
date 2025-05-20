import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ActorPage from "./components/ActorPage/ActorPage";
import LandingPage from "./components/LandingPage/LandingPage";

import MovieDetailsPage from "./components/MoviePage/MovieDetailsPage";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
      <Route path="/actors/:id" element={<ActorPage />} />
      <Route path="/movies/:id" element={<MovieDetailsPage />} />
    </Routes>
  );
};

export default App;
