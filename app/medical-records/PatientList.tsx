// MedicalRecordPage.tsx
import React from "react";
import PatientCards from "./PatientCards";
import { MedicalRecord } from "../../types";

const dummyData: MedicalRecord = {
  PatientDemographics: {
    MedicalRecordNumber: "ET123456789",
    DateOfRegistration: "2024-01-15",
    Name: "Mulugeta Tesfaye",
    FatherName: "Tesfaye Bekele",
    GrandFatherName: "Bekele Kebede",
    Gender: "Male",
    Age: 45,
    Address: {
      Region: "Addis Ababa",
      Wereda: "Bole",
      HouseNumber: "143",
      Kebele: "05",
      PhoneNumber: "+251911123456",
    },
  },
  HistorySheet: [
    {
      Date: "2024-05-02",
      NameOfPatient: "Mulugeta Tesfaye",
      Age: 45,
      Sex: "Male",
      MedicalRecordNumber: "ET123456789",
      MedicalHistory:
        "Patient reported headaches and dizziness. Diagnosed with hypertension and prescribed medication for blood pressure control.",
    },
    {
      Date: "2024-06-10",
      NameOfPatient: "Mulugeta Tesfaye",
      Age: 45,
      Sex: "Male",
      MedicalRecordNumber: "ET123456789",
      MedicalHistory:
        "Follow-up visit; blood pressure levels improving. Recommended dietary changes and continued medication.",
    },
  ],
};

const MedicalRecordPage = () => (
  <div className="container  px-4 py-8">
    <div className="flex justify-center">
      <h1 className="text-2xl font-semibold text-gray-600 mb-4">
        Patient Medical Record
      </h1>
    </div>
    <PatientCards />
  </div>
);

export default MedicalRecordPage;
