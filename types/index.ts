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
  statusCode: number;
}
export interface LoginApiResponse {
  success: boolean;
  message: string;
  id: string;
  email: string;
  isVerified: boolean;
  accessToken: string;
  refresh_Token: string;
  refresh_Token_Expiry_Date: string;
  access_Token_Expiry_Date: string;
}

// Address Type
interface Address {
  Region: string;
  Wereda: string;
  HouseNumber: string;
  Kebele: string;
  PhoneNumber: string;
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
  PatientDemographics: PatientDemographics;
  HistorySheet: HistoryRecord[];
}
