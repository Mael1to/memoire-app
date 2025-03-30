import React from "react";

interface FlashcardImport {
  front: string;
  back: string;
  level: number;
  nextReview: string;
}

interface ThemeImport {
  id: number;
  name: string;
  cartes: FlashcardImport[];
}

interface ImportExportThemeProps {
  onImport: (theme: ThemeImport) => void;
  onExport: () => void;
}

const ImportExportTheme: React.FC<ImportExportThemeProps> = ({
  onImport,
  onExport,
}) => {
  const importerTheme = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const content = reader.result as string;
        const json = JSON.parse(content);

        if (Array.isArray(json)) {
          // Tableau de thèmes
          let validCount = 0;
          json.forEach((theme: any) => {
            if (theme.name && Array.isArray(theme.cartes)) {
              theme.id = Date.now() + Math.floor(Math.random() * 100000);
              onImport(theme);
              validCount++;
            }
          });
          if (validCount > 0) {
            alert(`✅ ${validCount} thème(s) importé(s) avec succès !`);
          } else {
            alert("❌ Aucun thème valide trouvé dans le fichier.");
          }
          return;
        }

        // Un seul thème
        if (!json.name || !Array.isArray(json.cartes)) {
          alert("❌ Fichier invalide.");
          return;
        }

        json.id = Date.now();
        onImport(json);
        alert(`✅ Thème "${json.name}" importé avec succès !`);
      } catch (e) {
        alert("❌ Erreur lors de l'import.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="mt-4 p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Import / Export</h2>

      {/* BOUTON IMPORT */}
      <input
        type="file"
        accept=".json"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) importerTheme(file);
        }}
        className="mb-2"
      />

      {/* BOUTON EXPORT */}
      <button
        onClick={onExport}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Exporter tout
      </button>
    </div>
  );
};

export default ImportExportTheme;
