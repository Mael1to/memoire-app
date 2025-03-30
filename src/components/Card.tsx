import { useState } from "react";
import "./Card.css";

interface CardProps {
  question: string;
  answer: string;
  flipped: boolean;
  onClick?: () => void;
}

const Card = ({ question, answer, flipped, onClick }: CardProps) => {
  return (
    <div className="card-container" onClick={onClick}>
      <div className={`card ${flipped ? "flipped" : ""}`}>
        <div className="card-face front">{question}</div>
        <div className="card-face back">{answer}</div>
      </div>
    </div>
  );
};

export default Card;
