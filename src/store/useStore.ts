import { create } from "zustand";

// Fonction pour charger les données du localStorage
const loadState = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Fonction pour sauvegarder dans le localStorage
const saveState = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

interface Theme {
  id: number;
  name: string;
}

interface Flashcard {
  id: number;
  themeId: number;
  front: string;
  back: string;
  level: number;
  nextReview: Date;
}

interface AppState {
  themes: Theme[];
  flashcards: Flashcard[];
  addTheme: (name: string) => void;
  addFlashcard: (themeId: number, front: string, back: string) => void;
  reviewFlashcard: (id: number, success: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  themes: loadState("themes"),
  flashcards: loadState("flashcards"),

  addTheme: (name) =>
    set((state) => {
      const newThemes = [...state.themes, { id: Date.now(), name }];
      saveState("themes", newThemes);
      return { themes: newThemes };
    }),

  addFlashcard: (themeId, front, back) =>
    set((state) => {
      const newFlashcards = [
        ...state.flashcards,
        {
          id: Date.now(),
          themeId,
          front,
          back,
          level: 1,
          nextReview: new Date(),
        },
      ];
      saveState("flashcards", newFlashcards);
      return { flashcards: newFlashcards };
    }),

  reviewFlashcard: (id, success) =>
    set((state) => {
      const newFlashcards = state.flashcards.map((card) =>
        card.id === id
          ? {
              ...card,
              level: success ? card.level + 1 : 1,
              nextReview: new Date(
                Date.now() + (success ? card.level * 24 : 1) * 60 * 60 * 1000
              ),
            }
          : card
      );
      saveState("flashcards", newFlashcards);
      return { flashcards: newFlashcards };
    }),
}));
