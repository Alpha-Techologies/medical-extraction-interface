// app/dashboard/page.tsx
import React from "react";
import Sidebar from "@/app/medical-records/Sidebar";
import PatientList from "./PatientList";
import AuthGuard from "../AuthGuard";

const PatientsDashboard = () => {
  return (
    <>
      <AuthGuard>
        <PatientList></PatientList>
      </AuthGuard>
    </>
  );
};

export default PatientsDashboard;
