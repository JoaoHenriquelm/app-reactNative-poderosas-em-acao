export interface EmergencyContact {
  name: string;
  phoneNumber: string;
  kinship: string;
}

export interface ResponsibleData {
  fullName: string;
  kinship: string;
  dateOfBirth: string;
  rg: string;
  cpf: string;
  address: string;
  homePhone: string;
  cellPhone: string;
  email: string;
}

export interface AttendProps {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  ageSigned: string;
  natiolity: string;
  maritalStatus: string;
  cpf: string;
  rg: string;
  address: string;
  street: string;
  city: string;
  cep: string;
  state: string;
  homePhone: string;
  cellPhone: string;
  email: string;

  currentSchool: string;
  dependents: string;
  numberOfDependents: string;
  relationOfDependents: string;
  diagnosisYear: string;
  amountOfQuimi: string;
  amountOfRad: string;
  mastologis: string;
  oncologist: string;
  hadSurgery: string;
  typeSurgery: string;
  vaccines: string;
  allergies: string;
  specialsConditions: string;
  continuousUseMedications: string;
  observations: string;
  medicalInsurance: string;
  working: string;
  functionWork: string;
  activityOfInterest: string;
  preferredParticipationShift: string;
  authorizationUseImage: string;

  emergencyContact: EmergencyContact;
  dataOfResponsible?: ResponsibleData;
  monthBirthday: string;
  dayBirthday: number;
}

export interface AttendResponse {
  props: AttendProps;
}
