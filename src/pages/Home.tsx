import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";

const Home: React.FC = () => {
  const { themes, addTheme, deleteTheme } = useStore();
  const [themeName, setThemeName] = useState("");

  const handleAddTheme = () => {
    if (themeName.trim()) {
      addTheme(themeName);
      setThemeName("");
    }
  };

  return (
    <div>
      <h1>Bienvenue sur l’application de mémorisation</h1>

      <h2>Thèmes</h2>
      <ul>
        {themes.length > 0 ? (
          themes.map((theme) => (
            <li key={theme.id}>
              <Link to={`/theme/${theme.id}`}>{theme.name}</Link>
              <button
                onClick={() => deleteTheme(theme.id)}
                style={{
                  marginLeft: "10px",
                  color: "red",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ❌
              </button>
            </li>
          ))
        ) : (
          <p>Aucun thème pour l’instant.</p>
        )}
      </ul>

      <input
        type="text"
        value={themeName}
        onChange={(e) => setThemeName(e.target.value)}
        placeholder="Ajouter un thème"
      />
      <button onClick={handleAddTheme}>Ajouter</button>
    </div>
  );
};

export default Home;
