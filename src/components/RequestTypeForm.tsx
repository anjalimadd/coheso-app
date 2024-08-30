import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RequestType } from "../types";

const RequestTypeForm: React.FC<{ mode: "create" | "edit" }> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<RequestType>({
    id: "",
    requestType: "",
    purpose: "",
    informationToCollect: [
      { fieldName: "", fieldType: "text", required: true },
    ],
    requestTypeOwner: "",
    timeOfCreation: new Date().toISOString(),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (mode === "edit" && id) {
      const storedRequestTypes = JSON.parse(
        localStorage.getItem("requestTypes") || "[]"
      ) as RequestType[];
      const requestType = storedRequestTypes.find((type) => type.id === id);
      if (requestType) {
        setForm(requestType);
      }
    }
  }, [mode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!form.requestType) newErrors.requestType = "Request Type is required.";
    if (!form.purpose) newErrors.purpose = "Purpose is required.";
    if (!form.requestTypeOwner)
      newErrors.requestTypeOwner = "Request Type Owner is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const requestTypes = JSON.parse(
      localStorage.getItem("requestTypes") || "[]"
    ) as RequestType[];

    if (mode === "create") {
      const newRequestType = { ...form, id: Math.random().toString() };
      localStorage.setItem(
        "requestTypes",
        JSON.stringify([...requestTypes, newRequestType])
      );
    } else {
      const updatedRequestTypes = requestTypes.map((type) =>
        type.id === form.id ? form : type
      );
      localStorage.setItem("requestTypes", JSON.stringify(updatedRequestTypes));
    }

    navigate("/");
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {mode === "create" ? "Create Request Type" : "Edit Request Type"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div className="w-full flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Request Type <span className="text-red-500">*</span>
          </label>
          <input
            name="requestType"
            value={form.requestType}
            onChange={handleChange}
            placeholder="Enter request type"
            className={`w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
              errors.requestType
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
          {errors.requestType && (
            <p className="text-red-500 text-sm mt-1">{errors.requestType}</p>
          )}
        </div>
        <div className="w-full flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose <span className="text-red-500">*</span>
          </label>
          <input
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            placeholder="Enter purpose"
            className={`w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
              errors.purpose
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
          {errors.purpose && (
            <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>
          )}
        </div>
        <div className="w-full flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Request Type Owner <span className="text-red-500">*</span>
          </label>
          <input
            name="requestTypeOwner"
            value={form.requestTypeOwner}
            onChange={handleChange}
            placeholder="Enter owner email"
            className={`w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
              errors.requestTypeOwner
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
          {errors.requestTypeOwner && (
            <p className="text-red-500 text-sm mt-1">
              {errors.requestTypeOwner}
            </p>
          )}
        </div>
        {/* Add fields for informationToCollect if needed */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestTypeForm;
