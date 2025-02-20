import React from "react";
import { useStore } from "../store/useStore";

const Settings: React.FC = () => {
  const { notificationsEnabled, toggleNotifications } = useStore();

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Paramètres</h1>
      
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
    </div>
  );
};

export default Settings;
