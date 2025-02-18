import React, { useState } from "react";
import { useStore } from "../store/useStore";

const Review: React.FC = () => {
  const { flashcards, reviewFlashcard } = useStore();
  const now = new Date();

  // Filtrer les cartes à réviser maintenant
  const dueFlashcards = flashcards.filter((card) => new Date(card.nextReview) <= now);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (dueFlashcards.length === 0) {
    return <h1>Aucune carte à réviser pour l’instant !</h1>;
  }

  const currentCard = dueFlashcards[currentIndex];

  const handleReview = (success: boolean) => {
    reviewFlashcard(currentCard.id, success);
    setShowAnswer(false);

    // Passer à la carte suivante ou finir la session
    if (currentIndex < dueFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
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
        </>
      ) : (
        <button onClick={() => setShowAnswer(true)}>Afficher la réponse</button>
      )}
    </div>
  );
};

export default Review;
