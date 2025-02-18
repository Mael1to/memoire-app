import React, { useState } from "react";
import { useStore } from "../store/useStore";

const Review: React.FC = () => {
  const { flashcards, reviewFlashcard, deleteFlashcard } = useStore();
  const now = new Date();

  const dueFlashcards = flashcards.filter((card) => new Date(card.nextReview) <= now);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (dueFlashcards.length === 0) {
    return <h1>Aucune carte à réviser pour l’instant !</h1>;
  }

  const currentCard = dueFlashcards[currentIndex] || null;

  if (!currentCard) {
    return <h1>Erreur : Aucune carte disponible.</h1>;
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
    <div>
      <h1>Révision</h1>
      <h2>Carte {currentIndex + 1} / {dueFlashcards.length}</h2>
      <p><strong>Question :</strong> {currentCard.front}</p>

      {showAnswer ? (
        <>
          <p><strong>Réponse :</strong> {currentCard.back}</p>
          <button onClick={() => handleReview(true)}>✔ Je me souviens</button>
          <button onClick={() => handleReview(false)}>✖ Oublié</button>
          <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
            ❌ Supprimer
          </button>
        </>
      ) : (
        <button onClick={() => setShowAnswer(true)}>Afficher la réponse</button>
      )}
    </div>
  );
};

export default Review;
