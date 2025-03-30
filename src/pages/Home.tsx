import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const { themes, addTheme } = useStore();
  const [themeName, setThemeName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (themeName.trim()) {
      addTheme(themeName);
      setThemeName("");
    }
  };

  return (
    <div className="home-container">
      <h1>Bienvenue sur l’application de mémorisation</h1>
      <h2>Thèmes</h2>
      <ul className="theme-list">
        {themes.map((theme) => (
          <li key={theme.id}>
            <Link to={`/theme/${theme.id}`} className="theme-link">
              {theme.name}
            </Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ajouter un thème"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Home;
