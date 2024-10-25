// app/dashboard/layout.tsx
import { ReactNode } from "react";
import Sidebar from "@/app/patients/Sidebar";

interface PatientLayoutProps {
  children: ReactNode;
}

const PatientDashboardLayout = ({ children }: PatientLayoutProps) => {
  return (
    <div className="latient-dashboard-layout">
      <main className="content mt-3">{children}</main>
    </div>
  );
};

export default PatientDashboardLayout;
