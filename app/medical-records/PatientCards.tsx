// PatientCards.tsx
"use client";
import React from "react";
import { MedicalRecord as PatientRecord } from "../../types";
import { useRouter } from "next/navigation";
import { MedicalRecords } from "../sam";
import { Button } from "antd";

const records: PatientRecord[] = MedicalRecords;

const PatientCards: React.FC = () => {
  const router = useRouter();

  const handleCardClick = (medicalRecordNumber: string) => {
    router.push(`/patient/${medicalRecordNumber}`);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {records.map((record, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow"
        >
          <h2 className="text-lg font-semibold text-[#0388e5]">
            {record.PatientDemographics.Name}
          </h2>
          {/* <h2 className="text-base font-semibold text-[#0388e5]">
            ({record.PatientDemographics.Age} years)
          </h2> */}

          <p className="text-gray-600">
            <strong>Age:</strong> {record.PatientDemographics.Age} years
          </p>
          <p className="text-gray-600">
            <strong>MRN:</strong>{" "}
            {record.PatientDemographics.MedicalRecordNumber}
          </p>
          <p className="text-gray-600">
            <strong>Gender:</strong> {record.PatientDemographics.Gender}
          </p>
          <p className="text-gray-600">
            <strong>Region:</strong> {record.PatientDemographics.Address.Region}
            , {record.PatientDemographics.Address.Wereda}, House No.{" "}
            {record.PatientDemographics.Address.HouseNumber}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong>{" "}
            {record.PatientDemographics.Address.PhoneNumber}
          </p>

          <div className="flex justify-center mt-3">
            <Button
              color="primary"
              variant="text"
              href={`/medical-records/${record.PatientDemographics.MedicalRecordNumber}`}
            >
              View Medical Record
            </Button>
          </div>

          {/* <h3 className="mt-4 font-medium text-gray-800">Recent History</h3>
          <ul className="list-disc ml-5 text-gray-700">
            {record.HistorySheet.slice(0, 1).map((history, historyIndex) => (
              <li key={historyIndex}>
                {history.Date}: {history.MedicalHistory}
              </li>
            ))}
          </ul> */}
        </div>
      ))}
    </div>
  );
};

export default PatientCards;
