import { MedicalRecords } from "./../app/MedicalRecords";
export interface SignupCredentials {
  email: string;
  password: string;
  user_Type?: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupApiResponse {
  id: string;
  message: string;
  success: boolean;
  error?: string[];
  refresh_token: string;
  access_token: string;
}
export interface LoginApiResponse {
  success: boolean;
  message: string;
  id: string;
  email: string;
  error?: string;
  refresh_token: string;
  access_token: string;
}

// Address Type
interface Address {
  Region: string;
  Wereda: string;
  HouseNumber: string;
  Kebele: string;
}

// Patient Demographics Type
interface PatientDemographics {
  MedicalRecordNumber: string;
  DateOfRegistration: string;
  Name: string;
  FatherName: string;
  GrandFatherName: string;
  Gender: string;
  Age: number;
  PhoneNumber: string;
  Address: Address;
}

// History Sheet Type
interface HistoryRecord {
  Date: string;
  NameOfPatient: string;
  Age: number;
  Sex: string;
  MedicalRecordNumber: string;
  MedicalHistory: string;
}

// Medical Record Type
export interface MedicalRecord {
  user_id: string;
  organization: string;
  PatientDemographics: PatientDemographics;
  HistorySheet: HistoryRecord[];
}
