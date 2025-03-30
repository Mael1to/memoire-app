import React, { useState } from "react";
import { useStore } from "../store/useStore";
import Card from "../components/Card";
import "../components/Card.css";

const Review: React.FC = () => {
  const { flashcards, reviewFlashcard, deleteFlashcard } = useStore();
  const now = new Date();

  const dueFlashcards = flashcards.filter((card) => new Date(card.nextReview) <= now);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (dueFlashcards.length === 0) {
    return <h1 style={{ textAlign: "center" }}>Aucune carte à réviser pour l’instant !</h1>;
  }

  const currentCard = dueFlashcards[currentIndex] || null;

  if (!currentCard) {
    return <h1 style={{ textAlign: "center" }}>Erreur : Aucune carte disponible.</h1>;
  }

  const handleReview = (success: boolean) => {
    reviewFlashcard(currentCard.id, success);
    setShowAnswer(false);

    const updatedFlashcards = dueFlashcards.filter((card) => card.id !== currentCard.id);

    if (updatedFlashcards.length > 0) {
      setCurrentIndex((prevIndex) => Math.min(prevIndex, updatedFlashcards.length - 1));
    } else {
      setCurrentIndex(0);
    }
  };

  const handleDelete = () => {
    deleteFlashcard(currentCard.id);
    setShowAnswer(false);

    const updatedFlashcards = dueFlashcards.filter((card) => card.id !== currentCard.id);

    if (updatedFlashcards.length > 0) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>Révision</h1>
      <h2>Carte {currentIndex + 1} / {dueFlashcards.length}</h2>

      {/* Carte retournable */}
      <Card
        question={currentCard.front}
        answer={currentCard.back}
        flipped={showAnswer}
      />

      {/* Boutons d'action */}
      <div style={{ marginTop: "220px" }}>
        {showAnswer ? (
          <>

            <button onClick={() => handleReview(true)} 
              style={{  
                marginRight: "10px",
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                 cursor: "pointer"
              }}>
              ✔ Je me souviens
            </button>
            <button onClick={() => handleReview(false)} 
              style={{ 
                marginRight: "10px",
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer" 
              }}>
              ✖ Oublié
            </button>
            <button onClick={handleDelete} 
              style={{ 
                marginRight: "10px",
                backgroundColor: "var(--button-danger)",
                color: "var(--button-text)",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer" 
              }}>
              ❌ Supprimer
            </button>
          </>
        ) : (
          <button onClick={() => setShowAnswer(true)}>
            Afficher la réponse
          </button>
        )}
      </div>
    </div>
  );
};

export default Review;
