import React, { useState } from "react";
import { useStore } from "../store/useStore";

const Home: React.FC = () => {
  const { themes, addTheme } = useStore();
  const [themeName, setThemeName] = useState("");

  console.log("Thèmes actuels :", themes); // Ajoute ceci pour voir les thèmes dans la console

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
          themes.map((theme) => <li key={theme.id}>{theme.name}</li>)
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
