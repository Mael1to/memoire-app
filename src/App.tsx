import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Settings from "./pages/Settings";
import ThemeDetail from "./pages/ThemeDetail";
import "./App.css";



function App() {
  return (
    <Router>
      <nav style={{ padding: "10px" }}>
        <ul style={{ display: "flex", gap: "15px", listStyle: "none" }}>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/review">Révision</Link></li>
          <li><Link to="/settings">Paramètres</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/theme/:id" element={<ThemeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

