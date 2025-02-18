import { create } from "zustand";

interface Theme {
  id: number;
  name: string;
}

interface Flashcard {
  id: number;
  themeId: number;
  front: string;
  back: string;
}

interface AppState {
  themes: Theme[];
  flashcards: Flashcard[];
  addTheme: (name: string) => void;
  addFlashcard: (themeId: number, front: string, back: string) => void;
}

export const useStore = create<AppState>((set) => ({
  themes: [],
  flashcards: [],
  addTheme: (name) =>
    set((state) => ({
      themes: [...state.themes, { id: Date.now(), name }],
    })),
  addFlashcard: (themeId, front, back) =>
    set((state) => ({
      flashcards: [
        ...state.flashcards,
        { id: Date.now(), themeId, front, back },
      ],
    })),
}));

export {};
