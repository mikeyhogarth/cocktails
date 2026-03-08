import React from "react";
import useRobotConnection from "./hooks/useRobotConnection";
import useRobotBar from "./hooks/useRobotBar";
import Theme from "./theme";
import CocktailBrowser from "./components/CocktailBrowser";
import CocktailPage from "./components/CocktailPage";
import Bar from "./components/Bar";
import Settings from "./components/Settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";

function App() {
  useRobotConnection();
  useRobotBar();
  return (
    <Theme>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<CocktailBrowser />} />
          <Route path="/cocktails" element={<CocktailBrowser />} />
          <Route path="/cocktails/:slug" element={<CocktailPage />} />
          <Route path="/my-bar" element={<Bar />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;
