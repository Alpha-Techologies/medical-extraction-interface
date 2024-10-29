// MedicalRecordPage.tsx
import React from "react";
import PatientCards from "./PatientCards";
import { MedicalRecord } from "../../types";

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
