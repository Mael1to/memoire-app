import React, { useState } from "react";
import { useStore } from "../store/useStore";
import ImportExportTheme from "../components/ImportExportTheme";
import ConfirmModal from "../components/ConfirmModal";
import "./Settings.css";

const Settings: React.FC = () => {
  const {
    notificationsEnabled,
    toggleNotifications,
    addTheme,
    addFlashcard,
    themes,
    flashcards,
    deleteTheme,
  } = useStore();

  const [themeToDelete, setThemeToDelete] = useState<number | null>(null);

  const handleImport = (themeImport: {
    id: number;
    name: string;
    cartes: {
      front: string;
      back: string;
      level: number;
      nextReview: string;
    }[];
  }) => {
    const newId = Date.now();
    addTheme(themeImport.name);
    themeImport.cartes.forEach((card) => {
      addFlashcard(newId, card.front, card.back);
    });
  };

  const handleExport = () => {
    const data = themes.map((theme) => {
      const cartes = flashcards
        .filter((c) => c.themeId === theme.id)
        .map(({ front, back, level, nextReview }) => ({
          front,
          back,
          level,
          nextReview,
        }));

      return { ...theme, cartes };
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "themes-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Paramètres</h1>

      {/* Notifications */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={toggleNotifications}
          />
          <span>Activer les notifications</span>
        </label>
      </div>

      {/* Import/Export */}
      <ImportExportTheme onImport={handleImport} onExport={handleExport} />

      {/* Modale de confirmation */}
      {themeToDelete !== null && (
        <ConfirmModal
          message="Supprimer ce thème et toutes ses cartes ?"
          onCancel={() => setThemeToDelete(null)}
          onConfirm={() => {
            deleteTheme(themeToDelete);
            setThemeToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Settings;
