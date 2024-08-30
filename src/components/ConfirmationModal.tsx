import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  purpose: string;
}

const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  name,
  purpose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-4">
          Are you sure you want to delete the request type:
        </p>
        <p className="font-semibold mb-2">Name: {name}</p>
        <p className="font-semibold mb-4">Purpose: {purpose}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
