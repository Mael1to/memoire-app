import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import "./ThemeDetail.css";

const ThemeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    themes,
    flashcards,
    addFlashcard,
    deleteFlashcard,
    deleteTheme,
  } = useStore();

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

  const handleDeleteTheme = () => {
    const confirmed = window.confirm("Supprimer ce thème et toutes ses cartes ?");
    if (confirmed) {
      deleteTheme(theme.id);
      navigate("/");
    }
  };

  return (
    <div className="theme-container">
         <h1>Thème : {theme.name}</h1>
    <div className="theme-actions">
      <Link to="/" className="back-link">← Retour à l'accueil</Link>
      <button onClick={handleDeleteTheme} className="danger-button">
       🗑️ Supprimer ce thème
      </button>
    </div>


      <h2>Cartes de révision</h2>
      <div className="card-list">
        {flashcards
          .filter((card) => card.themeId === theme.id)
          .map((card) => (
            <div key={card.id} className="card-item">
              <div>
                <p><strong>Question :</strong> {card.front}</p>
                <p><strong>Réponse :</strong> {card.back}</p>
              </div>
              <button onClick={() => deleteFlashcard(card.id)}>❌ Supprimer</button>
            </div>
          ))}
      </div>

      <h3>Ajouter une carte</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleAddFlashcard(); }}>
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
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default ThemeDetail;
