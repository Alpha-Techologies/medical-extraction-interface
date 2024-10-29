// components/MedicalRecordCard.tsx
import React from "react";
import { MedicalRecord } from "../../../types";

interface MedicalRecordCardProps {
  record: MedicalRecord;
}

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({ record }) => {
  return (
    <div className="bg-white p-6 lg:p-10 md:p-8 sm:p-4 rounded-lg shadow-md space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center">
        Patient Medical Record
      </h2>

      {/* Patient Demographics Section */}
      <section className="border-b pb-4">
        <h3 className="font-semibold text-lg">Patient Demographics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {record.PatientDemographics.Name}
          </p>
          <p>
            <span className="font-medium">Father's Name:</span>{" "}
            {record.PatientDemographics.FatherName}
          </p>
          <p>
            <span className="font-medium">Grandfather's Name:</span>{" "}
            {record.PatientDemographics.GrandFatherName}
          </p>
          <p>
            <span className="font-medium">Gender:</span>{" "}
            {record.PatientDemographics.Gender}
          </p>
          <p>
            <span className="font-medium">Age:</span>{" "}
            {record.PatientDemographics.Age}
          </p>
          <p>
            <span className="font-medium">Medical Record #:</span>{" "}
            {record.PatientDemographics.MedicalRecordNumber}
          </p>
          <p>
            <span className="font-medium">Date of Registration:</span>{" "}
            {record.PatientDemographics.DateOfRegistration}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {record.PatientDemographics.Address.Region},{" "}
            {record.PatientDemographics.Address.Wereda}, Kebele{" "}
            {record.PatientDemographics.Address.Kebele}, House No.{" "}
            {record.PatientDemographics.Address.HouseNumber}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {record.PatientDemographics.Address.PhoneNumber}
          </p>
        </div>
      </section>

      {/* History Sheet Section */}
      <section>
        <h3 className="font-semibold text-lg">Medical History</h3>
        {record.HistorySheet.map((history, index) => (
          <div key={index} className="border rounded-md p-4 my-4 bg-gray-50">
            <p>
              <span className="font-medium">Date:</span> {history.Date}
            </p>
            <p>
              <span className="font-medium">Age:</span> {history.Age}
            </p>
            <p>
              <span className="font-medium">Sex:</span> {history.Sex}
            </p>
            <p>
              <span className="font-medium">Medical History:</span>{" "}
              {history.MedicalHistory}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MedicalRecordCard;
