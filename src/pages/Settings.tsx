import React, { useState } from "react";
import "./Settings.css";

const Settings: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // Tu peux déclencher ici une requête ou une permission navigateur si besoin
  };

  return (
    <div className="settings-container">
      <h1>Paramètres</h1>
      <label>
        Activer les notifications
        <label className="switch">
          <input type="checkbox" checked={notificationsEnabled} onChange={handleToggle} />
          <span className="slider"></span>
        </label>
      </label>
    </div>
  );
};

export default Settings;
