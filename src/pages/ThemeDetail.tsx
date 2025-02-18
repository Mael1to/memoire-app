import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../store/useStore";

const ThemeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID du thème depuis l'URL
  const { themes, flashcards, addFlashcard } = useStore();
  const theme = themes.find((t) => t.id === Number(id));

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  if (!theme) return <h1>Thème introuvable</h1>;

  const handleAddFlashcard = () => {
    if (front.trim() && back.trim()) {
      addFlashcard(theme.id, front, back);
      setFront("");
      setBack("");
    }
  };

  return (
    <div>
      <h1>Thème : {theme.name}</h1>
      <Link to="/">⬅ Retour à l'accueil</Link>

      <h2>Cartes de révision</h2>
      <ul>
        {flashcards
          .filter((card) => card.themeId === theme.id)
          .map((card) => (
            <li key={card.id}>
              <strong>Question :</strong> {card.front} <br />
              <strong>Réponse :</strong> {card.back}
            </li>
          ))}
      </ul>

      <h3>Ajouter une carte</h3>
      <input
        type="text"
        value={front}
        onChange={(e) => setFront(e.target.value)}
        placeholder="Question (Recto)"
      />
      <input
        type="text"
        value={back}
        onChange={(e) => setBack(e.target.value)}
        placeholder="Réponse (Verso)"
      />
      <button onClick={handleAddFlashcard}>Ajouter</button>
    </div>
  );
};

export default ThemeDetail;
