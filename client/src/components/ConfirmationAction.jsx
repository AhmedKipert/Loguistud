import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ConfirmatonAction = ({ 
  isOpen,          // bool pour afficher ou non le popup
  title = "Confirmation", 
  message = "Êtes-vous sûr de vouloir continuer ?", 
  onConfirm,       // fonction à exécuter si confirmé
  onCancel,        // fonction à exécuter si annulé
  operation = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-full">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 cursor-pointer hover:bg-red-600 text-white"
          >
            Confirmer {operation && <FontAwesomeIcon icon={faSpinner} spin /> }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmatonAction;
