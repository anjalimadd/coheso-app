import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { RequestType } from "../types";

const Home: React.FC = () => {
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRequestType, setCurrentRequestType] =
    useState<RequestType | null>(null);

  useEffect(() => {
    const storedRequestTypes = JSON.parse(
      localStorage.getItem("requestTypes") || "[]"
    );
    setRequestTypes(storedRequestTypes);
  }, []);

  const deleteRequestType = (id: string) => {
    const updatedRequestTypes = requestTypes.filter((type) => type.id !== id);
    localStorage.setItem("requestTypes", JSON.stringify(updatedRequestTypes));
    setRequestTypes(updatedRequestTypes);
  };

  const handleDelete = () => {
    if (currentRequestType) {
      deleteRequestType(currentRequestType.id);
      setCurrentRequestType(null);
      setIsModalOpen(false);
    }
  };

  const openModal = (type: RequestType) => {
    setCurrentRequestType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-medium text-center pb-8 text-gray-900">
        Request Types List
      </h2>

      {requestTypes.length === 0 ? (
        <p className="text-center text-lg text-gray-600 mt-4">
          No request types found.
        </p>
      ) : (
        <ul className="space-y-6">
          {requestTypes.map((type) => (
            <li
              key={type.id}
              className="p-4 border border-gray-300 rounded-lg bg-white flex justify-between items-center transition-transform transform hover:scale-105"
            >
              <Link
                to={`/detail/${type.id}`}
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                {type.requestType}
              </Link>
              <div>
                <Link
                  to={`/edit/${type.id}`}
                  className="mr-2 py-1 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => openModal(type)}
                  className="py-1 px-4 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {currentRequestType && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          name={currentRequestType.requestType}
          purpose={currentRequestType.purpose}
        />
      )}
    </div>
  );
};

export default Home;
