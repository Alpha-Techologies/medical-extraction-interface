// PatientCards.tsx
"use client";
import React, { useState } from "react";
import { MedicalRecord } from "../../types";
import { useRouter } from "next/navigation";
import { MedicalRecords } from "../sam";
import { Button } from "antd";
import { useGetMedicalRecordsQuery } from "@/redux/features/records";

const PatientCards: React.FC = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([]);
  const { data, isLoading } = useGetMedicalRecordsQuery("");

  const records: MedicalRecord[] = filteredRecords;

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter medical records based on the query
    if (query) {
      const filtered = data?.data?.filter(
        (record: MedicalRecord) =>
          record.PatientDemographics.Name.toLowerCase().includes(query) ||
          record.PatientDemographics.MedicalRecordNumber.toLowerCase().includes(
            query
          )
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords([]);
    }
  };
  return (
    <>
      <div className='container mx-auto p-4'>
        {/* Centered Search Bar */}
        <div className='flex justify-center mb-8'>
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Search by Name or Medical Record Number'
            className='w-1/2 p-3 text-md border border-gray-300 rounded-3xl shadow focus:outline-none focus:border-blue-500'
          />
        </div>

        {searchQuery && filteredRecords.length > 0 ? (
          <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4'>
            {records.map((record, index) => (
              <div
                key={index}
                className='bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow'>
                <h2 className='text-lg font-semibold text-[#0388e5]'>
                  {record.PatientDemographics.Name || "-"}
                </h2>
                {/* <h2 className="text-base font-semibold text-[#0388e5]">
            ({record.PatientDemographics.Age} years)
          </h2> */}

                <p className='text-gray-600'>
                  <strong>Age:</strong> {record.PatientDemographics.Age || "-"}{" "}
                  years
                </p>
                <p className='text-gray-600'>
                  <strong>MRN:</strong>{" "}
                  {record.PatientDemographics.MedicalRecordNumber || "-"}
                </p>
                <p className='text-gray-600'>
                  <strong>Gender:</strong>{" "}
                  {record.PatientDemographics.Gender || "-"}
                </p>
                <p className='text-gray-600'>
                  <strong>Region:</strong>{" "}
                  {record.PatientDemographics.Address.Region || "-"},{" "}
                  {record.PatientDemographics.Address.Wereda || "-"}, House No.{" "}
                  {record.PatientDemographics.Address.HouseNumber || "-"}
                </p>
                <p className='text-gray-600'>
                  <strong>Phone:</strong>{" "}
                  {record.PatientDemographics.PhoneNumber || "-"}
                </p>

                <div className='flex justify-center mt-3'>
                  <Button
                    color='primary'
                    variant='text'
                    href={`/medical-records/${record.PatientDemographics.MedicalRecordNumber}`}>
                    View Medical History
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
        ) : searchQuery && filteredRecords.length === 0 ? (
          <p className='text-gray-500 text-center'>
            No records found for "{searchQuery}"
          </p>
        ) : (
          <p className='text-gray-500 text-center'>
            Enter a search term to view medical records.
          </p>
        )}
      </div>
    </>
  );
};

export default PatientCards;
