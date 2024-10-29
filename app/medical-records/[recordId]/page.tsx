// pages/MedicalRecordPage.tsx
"use client";
import React from "react";
import MedicalRecordCard from "./MedicalRecordCard";
import { MedicalRecord } from "../../../types";
import { useGetMedicalRecordsQuery } from "@/redux/features/records";

interface MedicalRecordPageProps {
  params: {
    recordId: string;
  };
}

const MedicalRecordPage: React.FC<MedicalRecordPageProps> = ({ params }) => {
  const { data, isLoading } = useGetMedicalRecordsQuery("");

  const record: MedicalRecord = data?.data?.find(
    (record: MedicalRecord) =>
      record.PatientDemographics.MedicalRecordNumber === params.recordId
  );

  return (
    <div className='container mx-auto p-4'>
      {record ? <MedicalRecordCard record={record} /> : <p>Record not found</p>}
    </div>
  );
};

export default MedicalRecordPage;
