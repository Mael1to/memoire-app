import { create } from "zustand";

const loadState = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

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
  nextReview: string;
}

interface AppState {
  themes: Theme[];
  flashcards: Flashcard[];
  notificationsEnabled: boolean;
  addTheme: (name: string) => void;
  addFlashcard: (themeId: number, front: string, back: string) => void;
  reviewFlashcard: (id: number, success: boolean) => void;
  deleteFlashcard: (id: number) => void;
  deleteTheme: (id: number) => void;
  toggleNotifications: () => void;
  triggerNotification: () => void;
}

const scheduleNotification = (hour: number, minute: number) => {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(hour, minute, 0, 0);

  if (targetTime < now) {
    targetTime.setDate(targetTime.getDate() + 1); // Planifier pour le lendemain si l'heure est passée
  }

  const delay = targetTime.getTime() - now.getTime();
  setTimeout(() => {
    const flashcards = loadState("flashcards");
    const hasDueCards = flashcards.some((card: Flashcard) => new Date(card.nextReview) <= new Date());
    if (hasDueCards && Notification.permission === "granted") {
      new Notification("📚 Révision en attente !", {
        body: "Tu as des cartes à réviser aujourd'hui !",
      });
    }
    scheduleNotification(hour, minute);
  }, delay);
};

export const useStore = create<AppState>((set) => ({
  themes: loadState("themes"),
  flashcards: loadState("flashcards"),
  notificationsEnabled: loadState("notificationsEnabled") ?? false,
  
  deleteTheme: (themeId) =>
    set((state) => {
      const newThemes = state.themes.filter((t) => t.id !== themeId);
      const newFlashcards = state.flashcards.filter((c) => c.themeId !== themeId);
      saveState("themes", newThemes);
      saveState("flashcards", newFlashcards);
      return { themes: newThemes, flashcards: newFlashcards };
    }),
  
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
          nextReview: new Date().toISOString(),
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
              ).toISOString(),
            }
          : card
      );
      saveState("flashcards", newFlashcards);
      return { flashcards: newFlashcards };
    }),

  deleteFlashcard: (id) =>
    set((state) => {
      const newFlashcards = state.flashcards.filter((card) => card.id !== id);
      saveState("flashcards", newFlashcards);
      return { flashcards: newFlashcards };
    }),

  toggleNotifications: () =>
    set((state) => {
      const newStatus = !state.notificationsEnabled;
      saveState("notificationsEnabled", newStatus);
      if (newStatus) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            scheduleNotification(8, 0); // Planifier à 8h du matin
            scheduleNotification(18, 0); // Planifier à 18h du soir
          }
        });
      }
      return { notificationsEnabled: newStatus };
    }),

  triggerNotification: () => {
    const flashcards = loadState("flashcards");
    const hasDueCards = flashcards.some((card: Flashcard) => new Date(card.nextReview) <= new Date());
    if (hasDueCards && Notification.permission === "granted") {
      new Notification("📚 Révision en attente !", {
        body: "Tu as des cartes à réviser aujourd'hui !",
      });
    }
  },
}));

if (loadState("notificationsEnabled")) {
  scheduleNotification(8, 0); // Démarrer la planification à 8h
  scheduleNotification(18, 0); // Démarrer la planification à 18h
}
