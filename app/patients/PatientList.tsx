// PatientCards.tsx
import React from "react";
import { MedicalRecord as PatientRecord } from "../../types";
import { MedicalRecords } from "../MedicalRecords";

const PatientCards: React.FC = () => {
  const records: PatientRecord[] = MedicalRecords;
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {records.map((record, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow"
        >
          <h2 className="text-base font-semibold text-blue-600">
            {record.patient_demographics.name} (
            {record.patient_demographics.age} years)
          </h2>
          <p className="text-gray-600">
            <strong>MRN:</strong>{" "}
            {record.patient_demographics.medical_record_number}
          </p>
          <p className="text-gray-600">
            <strong>Gender:</strong> {record.patient_demographics.gender}
          </p>
          <p className="text-gray-600">
            <strong>Address:</strong>{" "}
            {record.patient_demographics.address.region},{" "}
            {record.patient_demographics.address.wereda}, House No.{" "}
            {record.patient_demographics.address.house_number}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong>{" "}
            {record.patient_demographics.address.phone_number}
          </p>

          <h3 className="mt-4 font-medium text-gray-800">Medical History</h3>
          <ul className="list-disc ml-5 text-gray-700">
            {record.history_sheet.map((history, historyIndex) => (
              <li key={historyIndex}>
                {history.date}: {history.medical_history}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientCards;
