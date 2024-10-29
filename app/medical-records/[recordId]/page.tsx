// pages/MedicalRecordPage.tsx
import React from "react";
import MedicalRecordCard from "./MedicalRecordCard";
import { MedicalRecord } from "../../../types";
import { MedicalRecords } from "../../../app/sam";

interface MedicalRecordPageProps {
  params: {
    recordId: string;
  };
}

const MedicalRecordPage: React.FC<MedicalRecordPageProps> = ({ params }) => {
  const record: MedicalRecord | undefined = MedicalRecords.find(
    (record) =>
      record.PatientDemographics.MedicalRecordNumber === params.recordId
  );

  return (
    <div className="container mx-auto p-4">
      {record ? <MedicalRecordCard record={record} /> : <p>Record not found</p>}
    </div>
  );
};

export default MedicalRecordPage;
