import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Import the Footer component
import "./index.css";
import RequestTypeDetail from "./components/RequestTypeDetailPage";
import RequestTypeForm from "./components/RequestTypeForm";
import { RequestType } from "./types";

const App: React.FC = () => {
  useEffect(() => {
    const sampleData: RequestType[] = [
      {
        id: "1",
        requestType: "Leave Request",
        purpose: "To apply for leave",
        informationToCollect: [
          { fieldName: "Leave Type", fieldType: "text", required: true },
        ],
        requestTypeOwner: "hr@example.com",
        timeOfCreation: new Date().toISOString(),
      },
      {
        id: "2",
        requestType: "Expense Report",
        purpose: "To submit an expense report",
        informationToCollect: [
          { fieldName: "Expense Amount", fieldType: "number", required: true },
        ],
        requestTypeOwner: "finance@example.com",
        timeOfCreation: new Date().toISOString(),
      },
      {
        id: "3",
        requestType: "IT Support",
        purpose: "To request IT support",
        informationToCollect: [
          { fieldName: "Issue Description", fieldType: "text", required: true },
        ],
        requestTypeOwner: "it@example.com",
        timeOfCreation: new Date().toISOString(),
      },
      {
        id: "4",
        requestType: "Meeting Room Booking",
        purpose: "To book a meeting room",
        informationToCollect: [
          { fieldName: "Room Name", fieldType: "text", required: true },
        ],
        requestTypeOwner: "admin@example.com",
        timeOfCreation: new Date().toISOString(),
      },
      {
        id: "5",
        requestType: "Travel Request",
        purpose: "To request travel arrangements",
        informationToCollect: [
          {
            fieldName: "Travel Destination",
            fieldType: "text",
            required: true,
          },
        ],
        requestTypeOwner: "travel@example.com",
        timeOfCreation: new Date().toISOString(),
      },
    ];

    // Set sample data only if local storage is empty
    if (localStorage.getItem("requestTypes")?.length === 0) {
      localStorage.setItem("requestTypes", JSON.stringify(sampleData));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<RequestTypeDetail />} />
            <Route path="/edit/:id" element={<RequestTypeForm mode="edit" />} />
            <Route path="/create" element={<RequestTypeForm mode="create" />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
