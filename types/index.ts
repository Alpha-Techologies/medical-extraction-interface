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

// types.ts
export interface Address {
  region: string;
  wereda: string;
  house_number: string;
  kebele: string;
  phone_number: string;
}

export interface PatientDemographics {
  medical_record_number: string;
  date_of_registration: string;
  name: string;
  f_name: string;
  gf_name: string;
  gender: string;
  age: number;
  address: Address;
}

export interface HistoryEntry {
  date: string;
  name_of_patient: string;
  age: number;
  sex: string;
  medical_record_number: string;
  medical_history: string;
}

export interface MedicalRecord {
  patient_demographics: PatientDemographics;
  history_sheet: HistoryEntry[];
}
