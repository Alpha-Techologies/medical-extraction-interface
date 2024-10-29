// app/dashboard/page.tsx
import React from "react";
import Sidebar from "@/app/medical-records/Sidebar";
import PatientList from "./PatientList";

const PatientsDashboard = () => {
  return (
    <>
      <PatientList></PatientList>
    </>
  );
};

export default PatientsDashboard;
