import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RequestType } from "../types";

const RequestTypeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch data from local storage
  const requestTypes: RequestType[] = JSON.parse(
    localStorage.getItem("requestTypes") || "[]"
  );
  const requestType = requestTypes?.find((type) => type.id === id);

  if (!requestType) {
    return (
      <div className="p-6 max-w-lg mx-auto">
        <p className="text-center text-lg text-gray-600">
          Request type not found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Request Type Details
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Request Type:
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {requestType.requestType}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Purpose:
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {requestType.purpose}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Owner:
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {requestType.requestTypeOwner}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time of Creation:
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {new Date(requestType.timeOfCreation).toLocaleString()}
          </p>
        </div>
        {/* Add more fields if necessary */}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-8 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back
      </button>
    </div>
  );
};

export default RequestTypeDetail;
